import firebase from 'firebase';
import { Record, OrderedMap } from 'immutable';
import {
  all, put, call, takeEvery, takeLatest, select,
} from 'redux-saga/effects';
import { appName, firestore } from '../config';
import { arrToMap } from '../core/utils';

export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  error: null,
  initialed: false,
  loading: false,
  loaded: false,
  lastElement: null,
});

const LookRecord = Record({
  id: null,
  user: null,
  discount: null,
  shop: null,
  items: null,
  reference: null,
  picture_uri: null,
  date_published: null,
  is_reported: false,
});

/**
 * Consts
 */
export const moduleName = 'looksUser';
export const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST_REQUEST`;
export const FETCH_LIST_LAST_ELEMENT = `${appName}/${moduleName}/FETCH_LIST_LAST_ELEMENT`;
export const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST_SUCCESS`;
export const FETCH_LIST_LOADED_ALL = `${appName}/${moduleName}/FETCH_LIST_LOADED_ALL`;
export const FETCH_LIST_ERROR = `${appName}/${moduleName}/FETCH_LIST_ERROR`;

export const UPDATE_LIST_REQUEST = `${appName}/${moduleName}/UPDATE_LIST_REQUEST`;
export const UPDATE_LIST_SUCCESS = `${appName}/${moduleName}/UPDATE_LIST_SUCCESS`;
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
        .set('initialed', true)
        .update('entities', entities => entities.merge(arrToMap(payload.entities, LookRecord)));

    case FETCH_LIST_LOADED_ALL:
      return looksState
        .set('loading', false)
        .set('initialed', true)
        .set('loaded', true);

    case FETCH_LIST_ERROR:
      return looksState
        .set('loading', false)
        .set('error', error);

    case UPDATE_LIST_SUCCESS:
      return looksState
        .set('entities', new OrderedMap(arrToMap(payload.entities, LookRecord)).merge(looksState.get('entities')));

    default:
      return looksState;
  }
}

/**
 * Action creators
 */
export function fetchList(userId) {
  return {
    type: FETCH_LIST_REQUEST,
    payload: { userId },
  };
}

export function updateList(userId) {
  return {
    type: UPDATE_LIST_REQUEST,
    payload: { userId },
  };
}

/**
 * Sagas
 */
export const getData = function* (item) {
  const storageRef = firebase.storage().ref();
  const data = yield item.data();

  try {
    const imageRef = yield call([storageRef, storageRef.child], item.data().picture_file);
    const url = yield call([imageRef, imageRef.getDownloadURL]);

    return {
      id: item.id,
      picture_uri: url,
      ...data,
    };
  } catch (error) {
    return {
      id: item.id,
      picture_uri: null,
      ...data,
    };
  }
};

export const fetchListSaga = function* (action) {
  const db = firestore;
  const state = yield select();
  const { userId } = action.payload;

  try {
    let collection = yield db.collection('looks').where('user.id', '==', userId).orderBy('date_published', 'desc').limit(5);

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

export const updateListSaga = function* (action) {
  const db = firestore;
  const store = yield select();
  const { userId } = action.payload;
  const entities = yield store[moduleName].get('entities');
  const first = yield entities.first();
  const initialed = yield store[moduleName].get('initialed');

  try {
    if (initialed) {
      let collection = yield db.collection('looks').where('user.id', '==', userId);

      if (first) {
        collection = collection
          .where('date_published', '>', first.date_published.toDate())
          .orderBy('date_published', 'desc');
      } else {
        collection = collection
          .orderBy('date_published', 'desc')
          .limit(5);
      }

      const querySnapshot = yield call([collection, collection.get]);

      if (querySnapshot.docs.length > 0) {
        let items = yield all(querySnapshot.docs.filter(
          item => !entities.has(item.id),
        ));

        items = yield all(items.map(getData));

        if (items.length > 0) {
          yield put({
            type: UPDATE_LIST_SUCCESS,
            payload: { entities: items },
          });
        }
      }
    }
  } catch (error) {
    console.log('error', error);
  }
};

export const saga = function* () {
  yield all([
    takeEvery(FETCH_LIST_REQUEST, fetchListSaga),
    takeLatest(UPDATE_LIST_REQUEST, updateListSaga),
  ]);
};
