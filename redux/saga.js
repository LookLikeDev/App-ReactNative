import { all } from 'redux-saga/effects';
import { saga as userSaga } from '../ducks/user';
import { saga as looksSaga } from '../ducks/looks';

export default function* rootSaga() {
  yield all([
    userSaga(),
    looksSaga(),
  ]);
}
