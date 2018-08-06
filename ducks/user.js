import { AsyncStorage } from 'react-native';
import { Record } from 'immutable';
import {
  all, put, call, takeEvery, select,
} from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { appName, firestore } from '../config';

const UserRecord = Record({
  name: null,
  liked_looks: null,
  disliked_looks: null,
  counter_looks_voted: 0,
  counter_items_voted: 0,
});

export const ReducerRecord = Record({
  id: null,
  user: new UserRecord({}),
  error: null,
  loading: false,
  uploading: false,
});

/**
 * Consts
 */
export const moduleName = 'user';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;

export const USER_INFO_UPDATE = `${appName}/${moduleName}/USER_INFO_UPDATE`;


// LIKE LOOK
export const LOOK_LIKE_REQUEST = `${appName}/${moduleName}/LOOK_LIKE_REQUEST`;
export const LOOK_LIKE_SUCCESS = `${appName}/${moduleName}/LOOK_LIKE_SUCCESS`;
export const LOOK_DISLIKE_REQUEST = `${appName}/${moduleName}/LOOK_DISLIKE_REQUEST`;
export const LOOK_DISLIKE_SUCCESS = `${appName}/${moduleName}/LOOK_DISLIKE_SUCCESS`;

// RESET LIKE COUNT
export const USER_VOTED_RESET_REQUEST = `${appName}/${moduleName}/USER_VOTED_RESET_REQUEST`;
export const USER_VOTED_RESET_SUCCESS = `${appName}/${moduleName}/USER_VOTED_RESET_SUCCESS`;

// LIKE THING
export const THING_VOTE_REQUEST = `${appName}/${moduleName}/THING_VOTE_REQUEST`;
export const THING_VOTE_LIKE_SUCCESS = `${appName}/${moduleName}/THING_VOTE_LIKE_SUCCESS`;
export const THING_VOTE_DISLIKE_SUCCESS = `${appName}/${moduleName}/THING_VOTE_DISLIKE_SUCCESS`;

/**
 * Reducer
 */
export default function reducer(userState = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case SIGN_OUT_REQUEST:
      return userState.set('loading', true);

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return userState
        .set('loading', false)
        .set('user', new UserRecord(payload.user))
        .set('id', payload.id)
        .set('error', null);

    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return userState
        .set('loading', false)
        .set('error', error);

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();

      // MOVE TO FAVORITES
    case LOOK_LIKE_REQUEST:
      return userState
        .updateIn(['user', 'counter_looks_voted'], count => count + 1);

    case LOOK_LIKE_SUCCESS:
    case LOOK_DISLIKE_SUCCESS:
      return userState
        .set('user', new UserRecord(payload.user))
        .set('id', payload.id);

    case USER_VOTED_RESET_REQUEST:
    case USER_VOTED_RESET_SUCCESS:
      return userState.setIn(['user', 'counter_looks_voted'], 0);

    case THING_VOTE_LIKE_SUCCESS:
    case THING_VOTE_DISLIKE_SUCCESS:
      return userState.setIn(['user', 'counter_items_voted'], payload.count);

    default:
      return userState;
  }
}

/**
 * Action creators
 */
export function signUp() {
  return {
    type: SIGN_UP_REQUEST,
  };
}

export function signIn() {
  return {
    type: SIGN_IN_REQUEST,
  };
}

export function updateUserInfo(formValues) {
  return {
    type: USER_INFO_UPDATE,
    payload: { formValues },
  };
}


// MOVE TO FAVORITES
export function lookLike(item, userId) {
  return {
    type: LOOK_LIKE_REQUEST,
    payload: { item, userId },
  };
}

export function lookDislike(item, userId) {
  return {
    type: LOOK_DISLIKE_REQUEST,
    payload: { item, userId },
  };
}

export function resetVotedCounter() {
  return {
    type: USER_VOTED_RESET_REQUEST,
  };
}

export function thingVote(thingId, lookId, userId, isLiked) {
  return {
    type: THING_VOTE_REQUEST,
    payload: {
      thingId, lookId, userId, isLiked,
    },
  };
}

/**
 * Sagas
 */
export const signUpSaga = function* () {
  try {
    const usersCollection = yield firestore.collection('users');

    const userSnapshot = yield call([usersCollection, usersCollection.add], { name: 'test' });

    yield call([AsyncStorage, AsyncStorage.setItem], '@User:id', userSnapshot.id);

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { id: userSnapshot.id },
    });

    yield call(Actions.main);
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error,
    });
  }
};

// TODO сделать проверку существует ли id на сервере, а не только локально
export const signInSaga = function* () {
  const storage = AsyncStorage;

  try {
    const id = yield call([storage, storage.getItem], '@User:id');

    if (id === null) {
      yield put({ type: SIGN_UP_REQUEST });
    } else {
      const userRef = yield firestore.collection('users').doc(id);

      const userSnapshot = yield call([userRef, userRef.get]);

      yield put({
        type: SIGN_IN_SUCCESS,
        payload:
          {
            user: userSnapshot.data(),
            id,
          },
      });

      yield call(Actions.main);
      // yield call(Actions.favorites);
    }
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error,
    });
  }
};

// TODO добавить уведомление что данные и правда корректно сохранились
export const updateUserInfoSaga = function* (action) {
  const { formValues } = action.payload;
  const store = yield select();

  try {
    const userSnapshot = yield firestore.collection('users').doc(store[moduleName].id);
    yield userSnapshot.update(formValues);
  } catch (error) {
    console.log('error user update', error);
  }
};


// MOVE TO FAVORITES
export const likeSaga = function* ({ payload: { item, userId } }) {
  const userRef = yield firestore.collection('users').doc(userId);
  const userData = yield select();
  const count = yield userData[moduleName].user.counter_looks_voted;

  try {
    yield call([userRef, userRef.update],
      {
        [`liked_looks.${item.id}`]: {
          reference: item.reference,
        },
        counter_looks_voted: count,
      });

    const userSnapshot = yield call([userRef, userRef.get]);

    yield put({
      type: LOOK_LIKE_SUCCESS,
      payload: {
        id: userSnapshot.id,
        user: userSnapshot.data(),
      },
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const dislikeSaga = function* ({ payload: { item, userId } }) {
  const userRef = yield firestore.collection('users').doc(userId);

  try {
    yield call([userRef, userRef.update], {
      [`disliked_looks.${item.id}`]: {
        reference: item.reference,
      },
    });
    const userSnapshot = yield call([userRef, userRef.get]);

    yield put({
      type: LOOK_DISLIKE_SUCCESS,
      payload: {
        id: userSnapshot.id,
        user: userSnapshot.data(),
      },
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const resetVotedCounterSaga = function* () {
  const store = yield select();
  const userId = yield store[moduleName].id;
  const userRef = yield firestore.collection('users').doc(userId);

  try {
    yield call([userRef, userRef.update], {
      counter_looks_voted: 0,
    });

    yield put({
      type: USER_VOTED_RESET_SUCCESS,
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const thingVoteSaga = function* ({
  payload: {
    thingId, lookId, userId, isLiked,
  },
}) {
  const userRef = yield firestore.collection('users').doc(userId);
  const store = yield select();
  const userData = yield store[moduleName].user;
  const count = userData.counter_items_voted > 0 ? userData.counter_items_voted + 1 : 1;

  try {
    yield call([userRef, userRef.update],
      {
        counter_items_voted: count,
        [`liked_looks.${lookId}.items.${thingId}`]: { isLiked },
      });
    if (isLiked) {
      yield put({
        type: THING_VOTE_LIKE_SUCCESS,
        payload: { count },
      });
    } else {
      yield put({
        type: THING_VOTE_DISLIKE_SUCCESS,
        payload: { count },
      });
    }
  } catch (error) {
    console.log('error');
  }
};

export const saga = function* () {
  yield all([
    takeEvery(SIGN_UP_REQUEST, signUpSaga),
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(USER_INFO_UPDATE, updateUserInfoSaga),
    // MOVE TO FAVORITES
    takeEvery(LOOK_LIKE_REQUEST, likeSaga),
    takeEvery(LOOK_DISLIKE_REQUEST, dislikeSaga),
    takeEvery(USER_VOTED_RESET_REQUEST, resetVotedCounterSaga),
    takeEvery(THING_VOTE_REQUEST, thingVoteSaga),
  ]);
};
