/* eslint-disable import/prefer-default-export */
import { get, getUserData } from '../../utils/request'

export const _getNotifs = async () => {
  const data = await get(`/notifs`, { params: getUserData() })
  return data.data.items
};
