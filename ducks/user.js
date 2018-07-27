import { AsyncStorage } from 'react-native';
import { Record } from 'immutable';
import {
  all, put, call, takeEvery, select,
} from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { appName, firestore } from '../config';

export const ReducerRecord = Record({
  id: null,
  user: null,
  error: null,
  loading: false,
  uploading: false,
});

/**
 * Consts
 */
export const moduleName = 'auth';
export const SIGN_UP_REQUEST = `${appName}/${moduleName}/SIGN_UP_REQUEST`;
export const SIGN_UP_SUCCESS = `${appName}/${moduleName}/SIGN_UP_SUCCESS`;
export const SIGN_UP_ERROR = `${appName}/${moduleName}/SIGN_UP_ERROR`;
export const SIGN_IN_REQUEST = `${appName}/${moduleName}/SIGN_IN_REQUEST`;
export const SIGN_IN_SUCCESS = `${appName}/${moduleName}/SIGN_IN_SUCCESS`;
export const SIGN_IN_ERROR = `${appName}/${moduleName}/SIGN_IN_ERROR`;
export const SIGN_OUT_REQUEST = `${appName}/${moduleName}/SIGN_OUT_REQUEST`;
export const SIGN_OUT_SUCCESS = `${appName}/${moduleName}/SIGN_OUT_SUCCESS`;
export const USER_INFO_UPDATE = `${appName}/${moduleName}/USER_INFO_UPDATE`;

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
        .set('user', payload.user)
        .set('id', payload.id)
        .set('error', null);

    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return userState
        .set('loading', false)
        .set('error', error);

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();

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


/**
 * Sagas
 */
export const signUpSaga = function* () {
  try {
    const usersCollection = yield firestore.collection('users');

    const userSnapshot = yield call(
      [usersCollection, usersCollection.add],
      { name: 'test' },
    );

    yield call(
      [AsyncStorage, AsyncStorage.setItem],
      '@User:id',
      userSnapshot.id,
    );

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
    const id = yield call(
      [storage, storage.getItem],
      '@User:id',
    );

    if (id === null) {
      yield put({
        type: SIGN_UP_REQUEST,
      });
    } else {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { id },
      });

      yield call(Actions.main);
    }
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error,
    });
  }
};

export const updateUserInfoSaga = function* (action) {
  const { formValues } = action.payload;
  const store = yield select();

  try {
    const userSnapshot = yield firestore.collection('users').doc(store[moduleName].id);
    const result = userSnapshot.update(formValues);
  } catch (error) {
    console.log('error user update', error);
  }
};

/* export const watchStatusChange = function* () {
  const auth = firebase.auth();
  // TODO change this saga effect
  try {
    yield cps([auth, auth.onAuthStateChanged]);
  } catch (user) {
    yield put({
      type: SIGN_IN_SUCCESS,
      payload: { user },
    });
  }
}; */

export const saga = function* () {
  yield all([
    // watchStatusChange(),
    takeEvery(SIGN_UP_REQUEST, signUpSaga),
    takeEvery(SIGN_IN_REQUEST, signInSaga),
    takeEvery(USER_INFO_UPDATE, updateUserInfoSaga),
  ]);
};
