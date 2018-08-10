import firebase from 'firebase';
import { Record, OrderedMap } from 'immutable';
import {
  all, put, call, takeEvery, select,
} from 'redux-saga/effects';
import { appName, firestore } from '../config';
import { arrToMap } from '../core/utils';

export const ReducerRecord = Record({
  entities: new OrderedMap({}), // OrderedMap of LookRecord
  error: null,
  loading: false,
  loaded: false,
  lastElement: null,
  voting: false,
});

const LookRecord = Record({
  id: null,
  user: null,
  shop: null,
  discount: null,
  items: new OrderedMap({}), // OrderedMap of ThingRecord
  reference: null,
  picture_uri: null,
  date_published: null,
});

const ThingRecord = Record({
  id: null,
  name: null,
  brand: null,
  position: {},
  price: null,
  counter_likes: 0,
  counter_dislikes: 0,
  is_discount_reached: false,
});

/**
 * Consts
 */
export const moduleName = 'favorites';
export const FETCH_LIST_REQUEST = `${appName}/${moduleName}/FETCH_LIST_REQUEST`;
export const FETCH_LIST_SUCCESS = `${appName}/${moduleName}/FETCH_LIST_SUCCESS`;
export const FETCH_LIST_LOADED_ALL = `${appName}/${moduleName}/FETCH_LIST_LOADED_ALL`;
export const FETCH_LIST_ERROR = `${appName}/${moduleName}/FETCH_LIST_ERROR`;

export const ADD_VOTE_REQUEST = `${appName}/${moduleName}/ADD_VOTE_REQUEST`;
export const ADD_VOTE_SUCCESS = `${appName}/${moduleName}/ADD_VOTE_SUCCESS`;

/**
 * Reducer
 */
export default function reducer(looksState = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case FETCH_LIST_REQUEST:
      return looksState.set('loading', true);

    case FETCH_LIST_SUCCESS:
      return looksState
        .set('loading', false)
        .update('entities', entities => entities.merge(arrToMap(payload.entities, LookRecord)));

    case FETCH_LIST_LOADED_ALL:
      return looksState
        .set('loading', false)
        .set('loaded', true);

    case ADD_VOTE_REQUEST:
      return looksState.set('voting', true);

    case ADD_VOTE_SUCCESS:
      return looksState.set('voting', false);

    default:
      return looksState;
  }
}

/**
 * Action creators
 */
export function fetchList(likedItems) {
  return {
    type: FETCH_LIST_REQUEST,
    payload: { likedItems },
  };
}

export function addVote(thingId, lookId, isLike) {
  return {
    type: ADD_VOTE_REQUEST,
    payload: { thingId, lookId, isLike },
  };
}

/**
 * Sagas
 */
const getData = function* (item) {
  // TODO delete this junk and add static picture link
  const storageRef = firebase.storage().ref();
  const data = yield item.data();

  try {
    const imageRef = yield call([storageRef, storageRef.child], item.data().picture_file);
    const url = yield call([imageRef, imageRef.getDownloadURL]);

    return {
      id: item.id,
      picture_uri: url,
      ...data,
      items: new OrderedMap(arrToMap(data.items, ThingRecord)),
    };
  } catch (error) {
    return {
      id: item.id,
      picture_uri: null,
      ...data,
      items: new OrderedMap(arrToMap(data.items, ThingRecord)),
    };
  }
};

const getSnapshot = function* (item) {
  return yield item.reference.get();
};

const createDiscount = function* (discount, shop, user, item, lookId) {
  if (discount && discount.value > 0) {
    const discountsCollection = firestore.collection('discounts');

    try {
      const dateEnd = yield Math.round(new Date().getTime() + (discount.days * 86400 * 1000));

      yield call(
        [discountsCollection, discountsCollection.add],
        {
          user,
          value: Number(discount.value),
          date_issued: new Date(),
          date_expiration: new Date(dateEnd),
          is_applied: false,
          shop,
          look_id: lookId,
          item,
        },
      );
    } catch (error) {
      console.log('error', error);
    }
  }
};

export const fetchListSaga = function* (action) {
  const { likedItems } = action.payload;
  const state = yield select();
  const data = state[moduleName].entities;
  let count = 0;

  if (likedItems === null) {
    yield put({
      type: FETCH_LIST_LOADED_ALL,
    });
  } else {
    try {
      let items = yield all(Object.values(likedItems));

      items = yield all(items.filter((item) => {
        if (data.get(item.reference.id) || count >= 5) return false;

        count += 1;

        return true;
      }));

      if (items.length > 0) {
        let favorites = yield all(items.map(getSnapshot));

        favorites = yield all(favorites.map(getData));

        yield put({
          type: FETCH_LIST_SUCCESS,
          payload: { entities: favorites },
        });
      } else {
        yield put({ type: FETCH_LIST_LOADED_ALL });
      }
    } catch (error) {
      console.log('error', error);
      yield put({
        type: FETCH_LIST_ERROR,
        error,
      });
    }
  }
};

export const addVoteSaga = function* ({ payload: { thingId, lookId, isLike } }) {
  const lookRef = yield firestore.collection('looks').doc(lookId);
  const store = yield select();
  const lookThingsList = yield store[moduleName].getIn(['entities', lookId, 'items']).toArray();

  const isReached = store[moduleName].getIn(['entities', lookId, 'items', thingId, 'is_discount_reached']);
  const discount = store[moduleName].getIn(['entities', lookId, 'discount']);
  const shop = store[moduleName].getIn(['entities', lookId, 'shop']);
  const user = store[moduleName].getIn(['entities', lookId, 'user']);
  const votedItem = store[moduleName].getIn(['entities', lookId, 'items', thingId]).toJS();

  try {
    const newItemsList = yield lookThingsList.map((recordItem) => {
      const item = recordItem.toJS();

      if (item.id !== thingId) return item;

      if (isLike) {
        return {
          ...item,
          counter_likes: item.counter_likes + 1,
          is_discount_reached: discount
          && discount.target_likes
          && (item.counter_likes + 1) >= discount.target_likes,
        };
      }

      return {
        ...item,
        counter_dislikes: item.counter_dislikes + 1,
      };
    });

    if (discount && !isReached && (votedItem.counter_likes + 1) >= discount.target_likes) {
      yield* createDiscount(discount, shop, user, votedItem, lookId);
    }

    // console.log('NEW ITEMS LIST', newItemsList);

    yield call([lookRef, lookRef.update], { items: newItemsList });

    yield put({
      type: ADD_VOTE_SUCCESS,
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const saga = function* () {
  yield all([
    takeEvery(FETCH_LIST_REQUEST, fetchListSaga),
    takeEvery(ADD_VOTE_REQUEST, addVoteSaga),
  ]);
};
