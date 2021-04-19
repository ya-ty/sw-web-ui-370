import { GET_NOTIFS, GET_NOTIFS_SUCCESS, GET_NOTIFS_FAILURE } from '../constants/notifConstants';

export const getNotifs = () => ({
  type: GET_NOTIFS
});

export const getNotifsSuccess = notifications => ({
  type: GET_NOTIFS_SUCCESS,
  payload: notifications
});

export const getNotifsFailure = error => ({
  type: GET_NOTIFS_FAILURE,
  payload: error
});
