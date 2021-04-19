import { all } from 'redux-saga/effects';
import taskSagas from 'enl-containers/SampleFullstackApps//Todo/reducers/todoSagas';
import contactSagas from 'enl-containers/SampleFullstackApps/Contact/reducers/contactSagas';
import emailSagas from 'enl-containers/SampleFullstackApps/Email/reducers/emailSagas';
import authSagas from 'enl-redux/modules/authSagas';
import activitySagas from 'enl-redux/modules/activitySagas';
import notifSagas from 'enl-redux/modules/notifSagas';
import uiSagas from 'enl-redux/modules/uiSagas';

export default function* sagas() {
  yield all([
    ...authSagas,
    ...contactSagas,
    ...taskSagas,
    ...emailSagas,
    ...activitySagas,
    ...notifSagas,
    ...uiSagas
  ]);
}
