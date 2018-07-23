import { Record, OrderedMap } from 'immutable';
import firebase from 'firebase';
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
  image: null,
});

/**
 * Consts
 */
export const moduleName = 'looks';
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
      return looksState.set('lastElement', payload);

    case FETCH_LIST_SUCCESS:
      return looksState
        .set('loading', false)
        .update('entities', entities => entities.merge(arrToMap(payload, LookRecord)));

    case FETCH_LIST_LOADED_ALL:
      return looksState
        .set('loading', true)
        .set('loaded', true);

    // .mergeIn(['entities'], arrToMap(payload, LookRecord));

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

/**
 * Sagas
 */
function* getData(item) {
  const storageRef = firebase.storage().ref();
  const data = yield item.data();

  const imageRef = yield call([storageRef, storageRef.child], item.data().picture_file);
  const url = yield call([imageRef, imageRef.getDownloadURL]);

  return {
    id: item.id,
    user: data.user,
    image: url,
  };
}

export const fetchListSaga = function* () {
  const db = firestore;
  const state = yield select();

  try {
    let collection = yield db.collection('looks').limit(5);

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
      payload: querySnapshot.docs[querySnapshot.docs.length - 1],
    });

    const items = yield all(querySnapshot.docs.map(getData));

    yield put({
      type: FETCH_LIST_SUCCESS,
      payload: items,
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
