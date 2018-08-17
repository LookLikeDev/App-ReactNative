import { Record, OrderedMap } from 'immutable';
import {
  all, put, call, select, takeEvery, takeLatest,
} from 'redux-saga/effects';
import { appName, firestore } from '../config';
import { arrToMap } from '../core/utils';

export const ReducerRecord = Record({
  entities: new OrderedMap({}),
  error: null,
  initialed: false,
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

export const UPDATE_LIST_REQUEST = `${appName}/${moduleName}/UPDATE_LIST_REQUEST`;
export const UPDATE_LIST_SUCCESS = `${appName}/${moduleName}/UPDATE_LIST_SUCCESS`;
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
        .set('initialed', true)
        .update('entities', entities => entities.merge(arrToMap(payload.entities, DiscountRecord)));

    case FETCH_LIST_LOADED_ALL:
      return discountsState
        .set('loading', false)
        .set('loaded', true)
        .set('initialed', true);

    case FETCH_LIST_ERROR:
      return discountsState
        .set('loading', false)
        .set('error', error);

    case UPDATE_LIST_SUCCESS:
      return discountsState
        .set('entities', new OrderedMap(arrToMap(payload.entities, DiscountRecord)).merge(discountsState.get('entities')));

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

export function updateList(userId) {
  return {
    type: UPDATE_LIST_REQUEST,
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

export const updateListSaga = function* ({ payload }) {
  const { userId } = payload;
  const store = yield select();
  const initialed = yield store[moduleName].get('initialed');
  const first = yield store[moduleName].get('entities').first();

  try {
    if (initialed) {

      let collection = yield firestore.collection('discounts')
        .where('user.id', '==', userId);

      if (first) {

        collection = yield collection.where('date_issued', '>', first.date_issued.toDate());
      }

      collection = yield collection.orderBy('date_issued', 'desc');

      const querySnapshot = yield call([collection, collection.get]);

      if (querySnapshot.docs.length === 0) {
        yield put({
          type: FETCH_LIST_LOADED_ALL,
        });
      } else {
        const items = yield all(querySnapshot.docs.map(item => ({ id: item.id, ...item.data() })));

        yield put({
          type: UPDATE_LIST_SUCCESS,
          payload: { entities: items },
        });
      }
    }
  } catch (error) {
    console.log('ERROR:', error);
  }
};

export const saga = function* () {
  yield all([
    takeEvery(FETCH_LIST_REQUEST, fetchListSaga),
    takeLatest(UPDATE_LIST_REQUEST, updateListSaga),
  ]);
};
