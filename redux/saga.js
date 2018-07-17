import { all } from 'redux-saga/effects';
import { saga as authSaga } from '../ducks/auth';

export default function* rootSaga() {
  yield all([
    authSaga(),
  ]);
}