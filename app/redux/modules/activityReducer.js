import { GET_ACTIVITIES, GET_ACTIVITIES_SUCCESS, GET_ACTIVITIES_FAILURE } from '../constants/activityConstants';

export const AuthState = {
  loading: false,
  message: null,
  activities: null
};

export default function activityReducer(state = AuthState, action = {}) {
  switch (action.type) {
    case GET_ACTIVITIES:
      return {
        ...state,
        loading: true,
        message: null
      };

    case GET_ACTIVITIES_SUCCESS:
      return {
        ...state,
        loading: false,
        activities: action.activities
      };

    case GET_ACTIVITIES_FAILURE:
      return {
        ...state,
        loading: false,
        message: action.error.message
      };

    default:
      return state;
  }
}
