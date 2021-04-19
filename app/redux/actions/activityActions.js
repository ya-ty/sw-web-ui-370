import * as types from '../constants/activityConstants';

export const getActivities = () => ({
  type: types.GET_ACTIVITIES
});

export const getActivitiesSuccess = activities => ({
  type: types.GET_ACTIVITIES_SUCCESS,
  activities
});

export const getActivitiesFailure = error => ({
  type: types.GET_ACTIVITIES_FAILURE,
  error
});
