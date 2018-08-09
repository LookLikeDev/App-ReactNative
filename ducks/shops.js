import { Record, OrderedMap } from 'immutable';
import {
  all, put, call, takeEvery,
} from 'redux-saga/effects';
import { appName, firestore } from '../config';
import { arrToMap } from '../core/utils';

export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  error: null,
  loading: false,
  loaded: false,
});

const ShopRecord = Record({
  id: null,
  name: null, // need record
  address: null,
  GPS_location: null,
  city: {
    id: null,
    name: null,
  },
  discount: {
    value: null,
    target_likes: null,
    days: null,
  },
  promocode: {
    type: null,
  },
});

/**
 * Consts
 */
export const moduleName = 'shops';

export const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST_REQUEST`;
export const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST_SUCCESS`;
export const FETCH_LIST_LOADED_ALL = `${appName}/${moduleName}/FETCH_LIST_LOADED_ALL`;
export const FETCH_LIST_ERROR = `${appName}/${moduleName}/FETCH_LIST_ERROR`;

/**
 * Reducer
 */
export default function reducer(discountsState = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_LIST_REQUEST:
      return discountsState.set('loading', true);

    case FETCH_LIST_SUCCESS:
      return discountsState
        .set('loading', false)
        .set('loaded', true)
        .update('entities', entities => entities.merge(arrToMap(payload.entities, ShopRecord)));

    case FETCH_LIST_LOADED_ALL:
      return discountsState
        .set('loading', false)
        .set('loaded', true);

    default:
      return discountsState;
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
export const fetchListSaga = function* () {
  console.log('SAGA');
  try {
    const collection = yield firestore.collection('shops').where('is_available', '==', true).orderBy('name', 'asc');

    const querySnapshot = yield call([collection, collection.get]);

    if (querySnapshot.docs.length === 0) {
      console.log('empty');
      yield put({
        type: FETCH_LIST_LOADED_ALL,
      });
    } else {
      const items = yield all(querySnapshot.docs.map(item => ({ id: item.id, ...item.data() })));

      console.log(items);
      yield put({
        type: FETCH_LIST_SUCCESS,
        payload: { entities: items },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const saga = function* () {
  yield all([
    takeEvery(FETCH_LIST_REQUEST, fetchListSaga),
  ]);
};
