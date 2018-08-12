import firebase from 'firebase';
import { Record, OrderedMap } from 'immutable';
import {
  all, put, call, takeEvery, select,
} from 'redux-saga/effects';
import { appName, firestore } from '../config';
import { arrToMap } from '../core/utils';

export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  error: null,
  loading: false,
  loaded: false,
  lastElement: null,
});

const LookRecord = Record({
  id: null,
  user: null,
  shop: null,
  items: null,
  reference: null,
  picture_uri: null,
  date_published: null,
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
        .set('loading', false)
        .set('loaded', true);

    case FETCH_LIST_ERROR:
      return looksState
        .set('loading', false)
        .set('error', error);

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

export const saga = function* () {
  yield all([
    takeEvery(FETCH_LIST_REQUEST, fetchListSaga),
  ]);
};
