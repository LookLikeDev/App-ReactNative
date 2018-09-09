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

export const UPDATE_LIST_REQUEST = `${appName}/${moduleName}/UPDATE_LIST_REQUEST`;
export const UPDATE_LIST_SUCCESS = `${appName}/${moduleName}/UPDATE_LIST_SUCCESS`;

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

    case ITEM_REMOVE:
      return looksState.deleteIn(['entities', payload.id]);

    default:
      return looksState;
  }
}

/**
 * Action creators
 */
export function fetchList(votedItems, blockedLooks) {
  return {
    type: FETCH_LIST_REQUEST,
    payload: { votedItems, blockedLooks },
  };
}

export function updateList(votedItems, blockedLooks) {
  return {
    type: UPDATE_LIST_REQUEST,
    payload: { votedItems, blockedLooks },
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

export const fetchListSaga = function* ({ payload }) {
  const db = firestore;
  const state = yield select();
  const { votedItems, blockedLooks } = payload;
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

      if (blockedLooks !== null) {
        items = yield all(querySnapshot.docs.filter(
          item => !Object.prototype.hasOwnProperty.call(blockedLooks, item.id),
        ));
      }

      items = yield all(items.map(getData));

      if (items.length === 0) {
        yield put({
          type: FETCH_LIST_REQUEST,
          payload: { votedItems, blockedLooks },
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

export const updateListSaga = function* ({ payload: { votedItems } }) {
  const db = firestore;
  const store = yield select();
  const first = yield store[moduleName].get('entities').first();
  const initialed = yield store[moduleName].get('initialed');

  try {
    if (initialed) {
      let collection = yield db.collection('looks');

      if (first) {
        collection = collection
          .where('date_published', '>', first.date_published.toDate())
          .orderBy('date_published', 'desc');
      } else {
        collection = collection
          .orderBy('date_published', 'desc')
          .limit(10);
      }

      const querySnapshot = yield call([collection, collection.get]);

      if (querySnapshot.docs.length > 0) {
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
