// import { Record } from 'immutable';
import { GET_NOTIFS, GET_NOTIFS_SUCCESS, GET_NOTIFS_FAILURE } from '../constants/notifConstants';

export const AuthState = {
  notifications: [],
  isLoading: false,
  error: ''
};

export default function notifReducer(state = AuthState, action = {}) {
  switch (action.type) {
    case GET_NOTIFS:
      return {
        ...state,
        loading: true,
        notifications: {}
      };

    case GET_NOTIFS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        notifications: action.payload
      };

    case GET_NOTIFS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
}
