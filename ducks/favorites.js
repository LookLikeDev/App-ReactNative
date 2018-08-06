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
  voting: false,
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
        .set('loading', true)
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
// TODO delete this junk and add static picture link
const getData = function* (item) {
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

const getSnapshot = function* (item) {
  return yield item.reference.get();
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
        console.log(favorites);
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
  const lookThingsList = yield store[moduleName].getIn(['entities', lookId, 'items']);

  try {
    const newItemsList = yield lookThingsList.map((item) => {
      if (item.id !== thingId) return item;

      if (isLike) {
        return {
          ...item,
          counter_likes: item.counter_likes > 0 ? item.counter_likes + 1 : 1,
        };
      }
      return {
        ...item,
        counter_dislikes: item.counter_dislikes > 0 ? item.counter_dislikes + 1 : 1,
      };
    });

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
