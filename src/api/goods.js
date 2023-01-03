import { http } from '@/plugins/axios';

/** 查询商品数据 */
export const queryGoods = (params) => {
  // ?type=xxx&page=xxx 前/后端 query参数  axios单独的字段去表示query  params {type:'xxx',page:1}
  return http({ url: '/goods', params: { take: 30, ...params } });
};

/** 查询商品详情 */
export const queryGoodsDetail = (iid) => {
  return http({ url: `/goods/detail/${iid}` });
};

/** 根据商品id查询商品 */
export const queryGoodsById = (id) => {
  return http({ url: `/goods/${id}` });
};
