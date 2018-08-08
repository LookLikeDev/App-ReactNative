import { all } from 'redux-saga/effects';
import { saga as userSaga } from '../ducks/user';
import { saga as looksGeneralSaga } from '../ducks/looksGeneral';
import { saga as looksUserSaga } from '../ducks/looksUser';
import { saga as favoritesSaga } from '../ducks/favorites';
import { saga as publishSaga } from '../ducks/publish';
import { saga as discountsSaga } from '../ducks/discounts';

export default function* rootSaga() {
  yield all([
    userSaga(),
    looksGeneralSaga(),
    looksUserSaga(),
    favoritesSaga(),
    publishSaga(),
    discountsSaga(),
  ]);
}
