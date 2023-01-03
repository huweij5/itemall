/** 昵称 */
export const nickNameRule = [
  {
    required: true,
    message: '请输入昵称',
  },
];

/** 手机号码 */
export const phoneRule = [
  {
    required: true,
    message: '请输入手机号码',
  },
  {
    pattern: /^(?:(?:\+|00)86)?1\d{10}$/,
    message: '请输入正确的手机号码',
  },
];

/** 密码 */
export const passwordRule = [
  {
    required: true,
    message: '请输入密码',
  },
  {
    pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/,
    message: '请输入正确的密码',
  },
];

/** 邮箱 */
export const emailRule = [
  {
    required: true,
    message: '请输入邮箱',
  },
  {
    pattern:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: '请输入正确的邮箱',
  },
];
