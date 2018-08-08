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
import { getFileExtensionByString } from '../core/utils';

export const ReducerRecord = Record({
  error: null,
  uploading: false,
  uploaded: false,
  image: null,
  things: new OrderedMap({}),
});

const ThingRecord = Record({
  id: null,
  position: {
    x: 0,
    y: 0,
  },
  name: null,
  brand: null,
  price: null,
});


/**
 * Consts
 */
export const moduleName = 'publish';

export const IMAGE_ADD = `${appName}/${moduleName}/IMAGE_ADD`;

export const LOOK_UPLOAD = `${appName}/${moduleName}/LOOK_UPLOAD`;
export const LOOK_UPLOAD_START = `${appName}/${moduleName}/LOOK_UPLOAD_START`;
export const LOOK_UPLOAD_SUCCESS = `${appName}/${moduleName}/LOOK_UPLOAD_SUCCESS`;

export const THING_ADD = `${appName}/${moduleName}/THING_ADD`;
export const THING_SAVE = `${appName}/${moduleName}/THING_SAVE`;
export const THING_REMOVE = `${appName}/${moduleName}/THING_REMOVE`;

/**
 * Reducer
 */
export default function reducer(looksState = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case IMAGE_ADD:
      return looksState.set('image', payload.imageUri);

    case THING_ADD:
      return looksState.setIn(['things', payload.thing.id], new ThingRecord(payload.thing));

    case THING_SAVE:
      return looksState
        .setIn(['things', payload.data.id, 'name'], payload.data.name)
        .setIn(['things', payload.data.id, 'brand'], payload.data.brand)
        .setIn(['things', payload.data.id, 'price'], payload.data.price);

    case THING_REMOVE:
      return looksState.removeIn(['things', payload.id]);

    case LOOK_UPLOAD_START:
      return looksState.set('uploading', true);

    case LOOK_UPLOAD_SUCCESS:
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
export function addImage(imageUri) {
  return {
    type: IMAGE_ADD,
    payload: { imageUri },
  };
}

export function addThing(thing) {
  return {
    type: THING_ADD,
    payload: { thing },
  };
}

export function saveThing(data) {
  return {
    type: THING_SAVE,
    payload: { data },
  };
}

export function removeThing(id) {
  return {
    type: THING_REMOVE,
    payload: { id },
  };
}

export function saveLook(userId, imageUri, formValues) {
  return {
    type: LOOK_UPLOAD,
    payload: { userId, imageUri, formValues },
  };
}

/**
 * Sagas
 */
function createFileUploadingChannel([imageFullPath, imageBlob]) {
  // TODO check and refactor
  return eventChannel((emitter) => {
    const uploadTask = firebase.storage().ref().child(imageFullPath).put(imageBlob);

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

export const uploadImageSaga = function* ({ payload: { userId, imageUri, formValues } }) {
  // TODO check and refactor, add clear image data after success uploading
  const looksCollection = firestore.collection('looks');
  const uuidImage = uuid();
  const fileExtension = getFileExtensionByString(imageUri);
  const imageFullPath = `looks/${uuidImage}.${fileExtension}`;

  const imageFile = yield fetch(imageUri);
  const imageBlob = yield imageFile.blob();

  const store = yield select();
  const things = yield all(store[moduleName].things.toArray().map(item => item.toJS()));

  const channelFileUpload = yield call(createFileUploadingChannel, [imageFullPath, imageBlob]);

  yield put({
    type: LOOK_UPLOAD_START,
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
        items: things,
        picture_file: imageFullPath,
        date_published: firebase.firestore.FieldValue.serverTimestamp(),
      },
    );

    yield put({
      type: LOOK_UPLOAD_SUCCESS,
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
    takeEvery(LOOK_UPLOAD, uploadImageSaga),
  ]);
};
