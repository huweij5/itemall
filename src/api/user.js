import { http } from '@/plugins/axios';

/** 头像上传 */
export const uploadAvatar = (data) => {
  return http({
    data,
    url: '/upload/image',
    method: 'POST',
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

/** 发送短信 */
export const sendSms = (data) => {
  return http({ url: '/send_code', method: 'POST', data });
};

/** 注册 */
export const register = (data) => {
  return http({ url: '/user/resgister', method: 'POST', data });
};

/** 登陆 */
export const login = (data) => {
  return http({ url: '/user/login', method: 'POST', data });
};

/** 获取用户信息 */
export const getUserInfo = () => {
  return http({ url: '/user' });
};
