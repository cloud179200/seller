import { all } from 'redux-saga/effects';
import { customizationSaga } from './customization/saga';
import { utilsSaga } from './utils/saga';
import { userSaga } from './user/saga';

export function* rootSaga() {
  yield all([
    userSaga(),
    customizationSaga(),
    utilsSaga()
  ]);
}