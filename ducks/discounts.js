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

const DiscountRecord = Record({
  id: null,
  user: null, // need record
  value: null,
  date_issued: null,
  date_expiration: null,
  is_applied: null,
  shop: null, // need record
  look_id: null,
  item: null, // need record
});

/**
 * Consts
 */
export const moduleName = 'discounts';

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
        .update('entities', entities => entities.merge(arrToMap(payload.entities, DiscountRecord)));

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
export function fetchList(userId) {
  return {
    type: FETCH_LIST_REQUEST,
    payload: { userId },
  };
}

/**
 * Sagas
 */
export const fetchListSaga = function* ({ payload }) {
  const { userId } = payload;

  try {
    const collection = yield firestore.collection('discounts').where('user.id', '==', userId).orderBy('date_issued', 'desc');

    const querySnapshot = yield call([collection, collection.get]);

    if (querySnapshot.docs.length === 0) {
      yield put({
        type: FETCH_LIST_LOADED_ALL,
      });
    } else {
      const items = yield all(querySnapshot.docs.map(item => ({ id: item.id, ...item.data() })));

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
