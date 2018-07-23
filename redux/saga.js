import { all } from 'redux-saga/effects';
import { saga as authSaga } from '../ducks/auth';
import { saga as looksSaga } from '../ducks/looks';

export default function* rootSaga() {
  yield all([
    authSaga(),
    looksSaga(),
  ]);
}
