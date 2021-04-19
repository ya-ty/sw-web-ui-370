/* eslint-disable import/prefer-default-export */
import { get, getUserData } from '../../utils/request'

export const _getActivities = async () => {
  const data = await get(`/activities`, { params: getUserData() })
  return data.data
};
