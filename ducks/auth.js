import { AsyncStorage } from 'react-native';
import { Record } from 'immutable';
import {
  all, put, call, takeEvery,
} from 'redux-saga/effects';
import { Actions } from 'react-native-router-flux';
import { appName, firestore } from '../config';

export const ReducerRecord = Record({
  user: null,
  error: null,
  loading: false,
  token: null,
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

/**
 * Reducer
 */
export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload, error } = action;

  switch (type) {
    case SIGN_UP_REQUEST:
    case SIGN_IN_REQUEST:
    case SIGN_OUT_REQUEST:
      return state.set('loading', true);

    case SIGN_UP_SUCCESS:
    case SIGN_IN_SUCCESS:
      return state
        .set('loading', false)
        .set('user', payload.user)
        .set('token', payload.token)
        .set('error', null);

    case SIGN_UP_ERROR:
    case SIGN_IN_ERROR:
      return state
        .set('loading', false)
        .set('error', error);

    case SIGN_OUT_SUCCESS:
      return new ReducerRecord();

    default:
      return state;
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


/**
 * Sagas
 */
export const signUpSaga = function* () {
  const db = firestore;

  try {
    const collectionRef = yield call(
      [db, db.collection],
      'users',
    );

    const userRef = yield call(
      [collectionRef, collectionRef.add],
      { name: 'test' },
    );

    yield call(
      [AsyncStorage, AsyncStorage.setItem],
      '@Auth:token',
      userRef.id,
    );

    yield put({
      type: SIGN_UP_SUCCESS,
      payload: { token: userRef.id },
    });

    yield call(Actions.main);
  } catch (error) {
    yield put({
      type: SIGN_IN_ERROR,
      error,
    });
  }
};


// TODO сделать проверку существует ли токен на сервере, а не только локально
export const signInSaga = function* () {
  const storage = AsyncStorage;

  try {
    const token = yield call(
      [storage, storage.getItem],
      '@Auth:token',
    );

    if (token === null) {
      yield put({
        type: SIGN_UP_REQUEST,
      });
    } else {
      yield put({
        type: SIGN_IN_SUCCESS,
        payload: { token },
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
  ]);
};
