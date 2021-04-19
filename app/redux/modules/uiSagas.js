import {
  call, fork, put, takeEvery, all
} from 'redux-saga/effects';

import { _getMenu } from '../api/uiAPI';
import { GET_MENU } from '../constants/uiConstants';
import { getMenuSuccess, getMenuFailure } from '../actions/uiActions';

function* getUISaga() {
  try {
    const data = yield call(_getMenu);
    yield put(getMenuSuccess(data));
  } catch (error) {
    yield put(getMenuFailure(error));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* activityRootSaga() {
  yield all([
    takeEvery(GET_MENU, getUISaga),
  ]);
}

const uiSagas = [
  fork(activityRootSaga),
];

export default uiSagas;
