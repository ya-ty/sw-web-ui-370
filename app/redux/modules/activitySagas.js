import {
  call, fork, put, takeEvery, all
} from 'redux-saga/effects';

import { _getActivities } from '../api/activityAPI';
import { GET_ACTIVITIES } from '../constants/activityConstants';
import { getActivitiesSuccess, getActivitiesFailure } from '../actions/activityActions';

function* getActivitiesSaga() {
  try {
    const data = yield call(_getActivities);
    yield put(getActivitiesSuccess(data));
  } catch (error) {
    yield put(getActivitiesFailure(error));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* activityRootSaga() {
  yield all([
    takeEvery(GET_ACTIVITIES, getActivitiesSaga),
  ]);
}

const activitySagas = [
  fork(activityRootSaga),
];

export default activitySagas;
