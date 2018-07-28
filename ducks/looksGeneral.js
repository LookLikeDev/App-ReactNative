import firebase from 'firebase';
import uuid from 'uuid/v1';
import { Record, OrderedMap } from 'immutable';
import { eventChannel, END } from 'redux-saga';
import {
  all, put, call, take, takeEvery, select,
} from 'redux-saga/effects';
import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { appName, firestore } from '../config';
import { arrToMap, getFileExtensionByString } from '../core/utils';

// TODO slice published methods to new duck
export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  error: null,
  loading: false,
  loaded: false,
  uploading: false,
  uploaded: false,
  lastElement: null,
  image: null,
});

const LookRecord = Record({
  id: null,
  user: null,
  image: null,
});

/**
 * Consts
 */
export const moduleName = 'looksGeneral';
export const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST_REQUEST`;
export const FETCH_LIST_LAST_ELEMENT = `${appName}/${moduleName}/FETCH_LIST_LAST_ELEMENT`;
export const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST_SUCCESS`;
export const FETCH_LIST_LOADED_ALL = `${appName}/${moduleName}/FETCH_LIST_LOADED_ALL`;
export const FETCH_LIST_ERROR = `${appName}/${moduleName}/FETCH_LIST_ERROR`;

export const IMAGE_ADD = `${appName}/${moduleName}/IMAGE_ADD`;
export const IMAGE_UPLOAD = `${appName}/${moduleName}/IMAGE_UPLOAD`;
export const IMAGE_UPLOAD_START = `${appName}/${moduleName}/IMAGE_UPLOAD_START`;
export const IMAGE_UPLOAD_SUCCESS = `${appName}/${moduleName}/IMAGE_UPLOAD_SUCCESS`;

/**
 * Reducer
 */
export default function reducer(looksState = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_LIST_REQUEST:
      return looksState.set('loading', true);

    case FETCH_LIST_LAST_ELEMENT:
      return looksState.set('lastElement', payload.lastElement);

    case FETCH_LIST_SUCCESS:
      return looksState
        .set('loading', false)
        .update('entities', entities => entities.merge(arrToMap(payload.entities, LookRecord)));

    case FETCH_LIST_LOADED_ALL:
      return looksState
        .set('loading', true)
        .set('loaded', true);

    case IMAGE_ADD:
      return looksState.set('image', payload.image);

    case IMAGE_UPLOAD_START:
      return looksState.set('uploading', true);

    case IMAGE_UPLOAD_SUCCESS:
      return looksState
        .set('uploading', false)
        .set('uploaded', true);
    default:
      return looksState;
  }
}

/**
 * Action creators
 */
export function fetchList() {
  return {
    type: FETCH_LIST_REQUEST,
  };
}

export function addImage(image) {
  return {
    type: IMAGE_ADD,
    payload: { image },
  };
}

export function uploadImage(userId, image, formValues) {
  return {
    type: IMAGE_UPLOAD,
    payload: { userId, image, formValues },
  };
}
/**
 * Sagas
 */
const getData = function* (item) {
  const storageRef = firebase.storage().ref();
  const data = yield item.data();

  try {
    const imageRef = yield call([storageRef, storageRef.child], item.data().picture_file);
    const url = yield call([imageRef, imageRef.getDownloadURL]);

    return {
      id: item.id,
      user: data.user,
      image: url,
    };
  } catch (error) {
    return {
      id: item.id,
      user: data.user,
      image: null,
    };
  }
};

export const fetchListSaga = function* () {
  const db = firestore;
  const state = yield select();

  try {
    let collection = yield db.collection('looks').orderBy('date_published', 'desc').limit(5);

    if (state[moduleName].lastElement !== null) {
      collection = yield call(
        [collection, collection.startAfter],
        state[moduleName].lastElement,
      );
    }

    const querySnapshot = yield call([collection, collection.get]);

    if (querySnapshot.docs.length === 0) {
      yield put({
        type: FETCH_LIST_LOADED_ALL,
      });
    }

    yield put({
      type: FETCH_LIST_LAST_ELEMENT,
      payload: { lastElement: querySnapshot.docs[querySnapshot.docs.length - 1] },
    });

    const items = yield all(querySnapshot.docs.map(getData));

    yield put({
      type: FETCH_LIST_SUCCESS,
      payload: { entities: items },
    });
  } catch (error) {
    yield put({
      type: FETCH_LIST_ERROR,
      error,
    });
  }
};

// TODO check and refactor
function createFileUploadingChannel([imageFullPath, image]) {
  return eventChannel((emitter) => {
    const uploadTask = firebase.storage().ref().child(imageFullPath)
      .putString(image.data, 'base64', { contentType: 'image/jpeg' });

    uploadTask.on('state_changed', (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      emitter(progress);
    }, (error) => {
      console.log('--- ERROR --- createFileUploadingChannel ---', error);
      emitter(END);
    }, () => {
      emitter(END);
    });
    return () => { uploadTask.cancel(); };
  });
}

// TODO check and refactor, add clear image data after success uploading
export const uploadImageSaga = function* ({ payload: { userId, image, formValues } }) {
  const looksCollection = firestore.collection('looks');
  const uuidImage = uuid();
  const fileExtension = getFileExtensionByString(image.uri);
  const imageFullPath = `looks/${uuidImage}.${fileExtension}`;

  const channelFileUpload = yield call(createFileUploadingChannel, [imageFullPath, image]);

  yield put({
    type: IMAGE_UPLOAD_START,
  });

  try {
    while (true) {
      // take(END) will cause the saga to terminate by jumping to the finally block
      const task = yield take(channelFileUpload);
      console.log(`progress: ${task}`);
    }
  } catch (error) {
    console.log('--- ERROR --- uploadImageSaga ---', error);
  } finally {
    // TODO fix required fields [birthday, name, shop, ...]
    yield call(
      [looksCollection, looksCollection.add],
      {
        user: {
          id: userId,
          name: formValues.name,
          birthday: formValues.birthday,
        },
        shop: {
          name: formValues.shopName,
        },
        picture_file: imageFullPath,
        date_published: firebase.firestore.FieldValue.serverTimestamp(),
      },
    );

    yield put({
      type: IMAGE_UPLOAD_SUCCESS,
    });

    Alert.alert(
      'Лук опубликован',
      null,
      [
        { text: 'Продолжить', onPress: () => { Actions.reset('tabs'); Actions.main(); } },
      ],
      { cancelable: false },
    );
  }
};

export const saga = function* () {
  yield all([
    takeEvery(FETCH_LIST_REQUEST, fetchListSaga),
    takeEvery(IMAGE_UPLOAD, uploadImageSaga),
  ]);
};
