import { all } from 'redux-saga/effects';
import { saga as userSaga } from '../ducks/user';
import { saga as looksGeneralSaga } from '../ducks/looksGeneral';
import { saga as looksUserSaga } from '../ducks/looksUser';
import { saga as favoritesSaga } from '../ducks/favorites';

export default function* rootSaga() {
  yield all([
    userSaga(),
    looksGeneralSaga(),
    looksUserSaga(),
    favoritesSaga(),
  ]);
}
