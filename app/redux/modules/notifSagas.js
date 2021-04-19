import {
  call, fork, put, takeEvery, all
} from 'redux-saga/effects';

import { Notification, Notifications } from 'enl-api/dummy/notifications';
import { GET_NOTIFS } from '../constants/notifConstants';
import { getNotifsSuccess, getNotifsFailure } from '../actions/notifActions';
import { _getNotifs } from '../api/notifAPI';

function* getNotifsSaga() {
  try {
    let data = yield call(_getNotifs);
    data = new Notifications(data.map(item => {
      const newItem = new Notification(item);
      return newItem;
    }));
    data.notifications = data.notifications.sort((a, b) => {
      if (a.priority === b.priority) {
        return 0;
      }
      if (a.priority === 'high' && b.priority === 'low') {
        return -1;
      }
      return 1;
    });
    yield put(getNotifsSuccess(data));
  } catch (error) {
    yield put(getNotifsFailure(error));
  }
}

//= ====================================
//  WATCHERS
//-------------------------------------

function* notifRootSaga() {
  yield all([
    takeEvery(GET_NOTIFS, getNotifsSaga)
  ]);
}

const notifSagas = [
  fork(notifRootSaga),
];

export default notifSagas;
