import firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { Record } from 'immutable';
import {
  all, put, call, takeEvery, takeLatest, select,
} from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { appName, firestore } from '../config';

const UserRecord = Record({
  name: null,
  birthday: null,
  is_female: null,
  liked_looks: null,
  disliked_looks: null,
  blocked_looks: null,
  blocked_users: null,
  reference: null,
  counter_looks_voted: 0,
  counter_items_voted: 0,
  date_discounts_view: null, // дата последнего просмотра страницы скидок
});

export const ReducerRecord = Record({
  id: null,
  user: new UserRecord({}),
  error: null,
  loading: false,
  uploading: false,
  isNetworkError: false,
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

export const UPDATE_USER_INFO_REQUEST = `${appName}/${moduleName}/UPDATE_USER_INFO_REQUEST`;
export const UPDATE_USER_INFO_SUCCESS = `${appName}/${moduleName}/UPDATE_USER_INFO_SUCCESS`;

export const SET_USER_INFO_REQUEST = `${appName}/${moduleName}/SET_USER_INFO_REQUEST`;
export const SET_USER_INFO_SUCCESS = `${appName}/${moduleName}/SET_USER_INFO_SUCCESS`;

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

// RESET DISCOUNTS VIEW DATE
export const USER_DISCOUNTS_VIEW_DATE_REQUEST = `${appName}/${moduleName}/USER_DISCOUNTS_VIEW_DATE_REQUEST`;
export const USER_DISCOUNTS_VIEW_DATE_SUCCESS = `${appName}/${moduleName}/USER_DISCOUNTS_VIEW_DATE_SUCCESS`;

// BLOCK CONTENT
export const BLOCK_LOOK_REQUEST = `${appName}/${moduleName}/BLOCK_LOOK_REQUEST`;
export const BLOCK_LOOK_SUCCESS = `${appName}/${moduleName}/BLOCK_LOOK_SUCCESS`;
export const BLOCK_USER_REQUEST = `${appName}/${moduleName}/BLOCK_USER_REQUEST`;
export const BLOCK_USER_SUCCESS = `${appName}/${moduleName}/BLOCK_USER_SUCCESS`;

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
        .set('isNetworkError', true)
        .set('error', error);

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();

    case UPDATE_USER_INFO_SUCCESS:
      return userState
        .set('user', new UserRecord(payload.user));

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
      return userState.set('user', new UserRecord(payload.user));

    case USER_DISCOUNTS_VIEW_DATE_SUCCESS:
      return userState.set('user', new UserRecord(payload.user));

    case BLOCK_LOOK_SUCCESS:
      return userState
        .set('user', new UserRecord(payload.user))
        .set('id', payload.id);


    case BLOCK_USER_SUCCESS:
      return userState
        .set('user', new UserRecord(payload.user))
        .set('id', payload.id);

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
    type: UPDATE_USER_INFO_REQUEST,
    payload: { formValues },
  };
}

export function setUserInfo(name, birthday) {
  return {
    type: SET_USER_INFO_REQUEST,
    payload: { name, birthday },
  };
}

export function lookLike(item, userId) {
  console.log(item, userId);
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

export function resetFavoritesCounter() {
  return {
    type: USER_VOTED_RESET_REQUEST,
  };
}

export function setDiscountsViewDate() {
  return {
    type: USER_DISCOUNTS_VIEW_DATE_REQUEST,
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

export function blockLook(item, userId) {
  console.log(item, userId);
  return {
    type: BLOCK_LOOK_REQUEST,
    payload: { item, userId },
  };
}

export function blockUser(item, userId) {
  return {
    type: BLOCK_USER_REQUEST,
    payload: { item, userId },
  };
}

/**
 * Sagas
 */
export const signUpSaga = function* () {
  try {
    const usersCollection = yield firestore.collection('users');

    // const userSnapshot = yield call([usersCollection, usersCollection.add], { name: 'test' });
    const userSnapshot = yield call([usersCollection, usersCollection.add], {});

    yield call([AsyncStorage, AsyncStorage.setItem], '@User:id', userSnapshot.id);

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { id: userSnapshot.id },
    });

    yield call(Actions.main);
  } catch (error) {
    console.log(error);
    yield put({
      type: SIGN_IN_ERROR,
      error,
    });
  }
};

export const signInSaga = function* () {
  // TODO сделать проверку существует ли id на сервере, а не только локально
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

      // yield call(Actions.main);
      // yield call(Actions.favorites);
    }
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error,
    });
  }
};

/**
 * Генератор обновляющией данные пользователя из формы в настройках
 * @param action
 * @returns {IterableIterator<*>}
 */
export const updateUserInfoSaga = function* (action) {
  // TODO добавить уведомление что данные и правда корректно сохранились
  const { formValues } = action.payload;
  const store = yield select();

  try {
    const userRef = yield firestore.collection('users').doc(store[moduleName].id);
    yield userRef.update(formValues);

    const userSnapshot = yield call([userRef, userRef.get]);

    yield put({
      type: UPDATE_USER_INFO_SUCCESS,
      payload: { user: userSnapshot.data() },
    });
  } catch (error) {
    console.log('error user update', error);
  }
};

/**
 * Генератор добавляющий данные пользователя из формы публикации если он их до этого не добавлял
 * @param action
 * @returns {IterableIterator<*>}
 */
export const setUserInfoSaga = function* ({ payload: { name, birthday } }) {
  const store = yield select();
  const currentUserName = yield store[moduleName].getIn(['user', 'name']);
  const currentUserBirthday = yield store[moduleName].getIn(['user', 'birthday']);

  try {
    const userRef = yield firestore.collection('users').doc(store[moduleName].id);

    if ((name && !currentUserName) || (birthday && !currentUserBirthday)) {
      yield userRef.update({
        ...name && !currentUserName && { name },
        ...birthday && !currentUserBirthday && { birthday },
      });

      const userSnapshot = yield call([userRef, userRef.get]);

      yield put({
        type: UPDATE_USER_INFO_SUCCESS,
        payload: { user: userSnapshot.data() },
      });
    }
  } catch (error) {
    console.log('error user update', error);
  }
};

export const blockLookSaga = function* ({ payload: { item, userId } }) {
  const userRef = yield firestore.collection('users').doc(userId);
  const looksRef = yield firestore.collection('users').doc(item.id);

  try {
    yield call([userRef, userRef.update],
      {
        [`blocked_looks.${item.id}`]: {
          reference: looksRef,
          date_blocked: firebase.firestore.FieldValue.serverTimestamp(),
        },
      });

    yield call([looksRef, looksRef.update],
      {
        is_reported: true,
      });

    const userSnapshot = yield call([userRef, userRef.get]);

    yield put({
      type: BLOCK_LOOK_SUCCESS,
      payload: {
        id: userSnapshot.id,
        user: userSnapshot.data(),
      },
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const blockUserSaga = function* ({ payload: { item, userId } }) {
  const userRef = yield firestore.collection('users').doc(userId);
  const blockedRef = yield firestore.collection('users').doc(item.id);

  try {
    yield call([userRef, userRef.update],
      {
        [`blocked_users.${item.id}`]: {
          reference: item.reference,
          date_blocked: firebase.firestore.FieldValue.serverTimestamp(),
        },
      });

    yield call([blockedRef, blockedRef.update],
      {
        is_reported: true,
      });

    const userSnapshot = yield call([userRef, userRef.get]);

    yield put({
      type: BLOCK_LOOK_SUCCESS,
      payload: {
        id: userSnapshot.id,
        user: userSnapshot.data(),
      },
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const likeSaga = function* ({ payload: { item, userId } }) {
  const userRef = yield firestore.collection('users').doc(userId);
  const userData = yield select();
  const count = yield userData[moduleName].user.counter_looks_voted;

  try {
    yield call([userRef, userRef.update],
      {
        [`liked_looks.${item.id}`]: {
          reference: item.reference,
          date_liked: firebase.firestore.FieldValue.serverTimestamp(),
        },
        counter_looks_voted: count + 1,
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
  const userData = yield select();
  const count = yield userData[moduleName].user.counter_looks_voted;

  try {
    yield call([userRef, userRef.update], {
      [`disliked_looks.${item.id}`]: {
        reference: item.reference,
        date_disliked: firebase.firestore.FieldValue.serverTimestamp(),
      },
      counter_looks_voted: count + 1,
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
  // TODO сделать проверку что если count === 0 то не нужно обнулять его.
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

export const setDiscountsViewDateSaga = function* () {
  // TODO сделать проверку что если count === 0 то не нужно обнулять его.
  const store = yield select();
  const userId = yield store[moduleName].id;
  const userRef = yield firestore.collection('users').doc(userId);

  try {
    yield call([userRef, userRef.update], {
      date_discounts_view: firebase.firestore.FieldValue.serverTimestamp(),
    });

    const userSnapshot = yield call([userRef, userRef.get]);

    yield put({
      type: USER_DISCOUNTS_VIEW_DATE_SUCCESS,
      payload: {
        user: userSnapshot.data(),
      },
    });
  } catch (error) {
    console.log('ERROR', error);
  }
};

export const thingVoteSaga = function* ({ payload }) {
  const {
    thingId, lookId, userId, isLiked,
  } = payload;
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

    const userSnapshot = yield call([userRef, userRef.get]);

    if (isLiked) {
      yield put({
        type: THING_VOTE_LIKE_SUCCESS,
        payload: { user: userSnapshot.data() },
      });
    } else {
      yield put({
        type: THING_VOTE_DISLIKE_SUCCESS,
        payload: { user: userSnapshot.data() },
      });
    }
  } catch (error) {
    console.log('error');
  }
};

export const saga = function* () {
  yield all([
    takeLatest(SIGN_UP_REQUEST, signUpSaga),
    takeLatest(SIGN_IN_REQUEST, signInSaga),
    takeLatest(UPDATE_USER_INFO_REQUEST, updateUserInfoSaga),
    takeEvery(SET_USER_INFO_REQUEST, setUserInfoSaga),
    takeEvery(LOOK_LIKE_REQUEST, likeSaga),
    takeEvery(LOOK_DISLIKE_REQUEST, dislikeSaga),
    takeEvery(USER_VOTED_RESET_REQUEST, resetVotedCounterSaga),
    takeEvery(THING_VOTE_REQUEST, thingVoteSaga),
    takeEvery(USER_DISCOUNTS_VIEW_DATE_REQUEST, setDiscountsViewDateSaga),
    takeEvery(BLOCK_LOOK_REQUEST, blockLookSaga),
    takeEvery(BLOCK_USER_REQUEST, blockUserSaga),
  ]);
};
