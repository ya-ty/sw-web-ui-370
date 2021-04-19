import { get, getUserData } from '../../utils/request'

export const _getMenu = async () => {
  const data = await get(`/menu`)
  return data.data.menu
};
