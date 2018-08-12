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
export const moduleName = 'looksGeneral';
export const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST_REQUEST`;
export const FETCH_LIST_LAST_ELEMENT = `${appName}/${moduleName}/FETCH_LIST_LAST_ELEMENT`;
export const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST_SUCCESS`;
export const FETCH_LIST_LOADED_ALL = `${appName}/${moduleName}/FETCH_LIST_LOADED_ALL`;
export const FETCH_LIST_ERROR = `${appName}/${moduleName}/FETCH_LIST_ERROR`;

export const ITEM_REMOVE = `${appName}/${moduleName}/ITEM_REMOVE`;

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

    case ITEM_REMOVE:
      return looksState.deleteIn(['entities', payload.id]);

    default:
      return looksState;
  }
}

/**
 * Action creators
 */
export function fetchList(votedItems) {
  return {
    type: FETCH_LIST_REQUEST,
    payload: { votedItems },
  };
}

export function removeItem(item) {
  return {
    type: ITEM_REMOVE,
    payload: { id: item.id },
  };
}

/**
 * Sagas
 */
const getData = function* (item) {
  // TODO change to static url
  // const storageRef = firebase.storage().ref();
  const data = yield item.data();

  return {
    id: item.id,
    reference: item.ref,
    ...data,
  };
  // try {
  //   const imageRef = yield call([storageRef, storageRef.child], item.data().picture_file);
  //   const url = yield call([imageRef, imageRef.getDownloadURL]);
  //
  //   return {
  //     id: item.id,
  //     reference: item.ref,
  //     picture_uri: url,
  //     ...data,
  //   };
  // } catch (error) {
  //   return {
  //     id: item.id,
  //     reference: item.ref,
  //     picture_uri: null,
  //     ...data,
  //   };
  // }
};

export const fetchListSaga = function* ({ payload: { votedItems } }) {
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
    } else {
      yield put({
        type: FETCH_LIST_LAST_ELEMENT,
        payload: { lastElement: querySnapshot.docs[querySnapshot.docs.length - 1] },
      });

      let items = querySnapshot.docs;

      if (votedItems !== null) {
        items = yield all(querySnapshot.docs.filter(
          item => !Object.prototype.hasOwnProperty.call(votedItems, item.id),
        ));
      }

      items = yield all(items.map(getData));

      if (items.length === 0) {
        yield put({
          type: FETCH_LIST_REQUEST,
          payload: { votedItems },
        });
      } else {
        yield put({
          type: FETCH_LIST_SUCCESS,
          payload: { entities: items },
        });
      }
    }
  } catch (error) {
    console.log('error', error);
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
