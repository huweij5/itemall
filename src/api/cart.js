import { http } from '@/plugins/axios';

/** 查询购物车 */
export const queryCart = () => {
  return http({ url: '/cart' });
};

/** 删除购物车 */
export const delCart = (id) => {
  return http({ url: `/cart/${id}`, method: 'DELETE' });
};

/** 添加购物车 */
export const addCart = (data) => {
  return http({ url: '/cart', data, method: 'POST' });
};

/** 修改购物车 */
export const editCart = (id, data) => {
  return http({ url: `/cart/${id}`, data, method: 'PUT' });
};
