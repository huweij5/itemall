import Vue from 'vue';
import Vuex from 'vuex';

// npm i vuex-persist
import VuexPersistence from 'vuex-persist';

import { login, getUserInfo } from '@/api';
import router from '@/router';

Vue.use(Vuex);

const vuexPersistence = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {
    token: '',
    userInfo: {},
    tabBarHeight: 0,
  },
  mutations: {
    /** 保存token */
    saveToken(state, token) {
      state.token = token;
    },
    /** 保存用户信息 */
    saveUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    saveTabBarHeight(state, height) {
      state.tabBarHeight = height;
    },
  },
  actions: {
    /** 登陆 */
    async loginAction(ctx, payload) {
      // 登录
      const { token } = await login(payload);
      ctx.commit('saveToken', token);

      // 获取用户信息
      const userInfo = await getUserInfo();
      ctx.commit('saveUserInfo', userInfo);
      // 跳转到首页
      router.replace({ name: 'home' });
    },
  },
  plugins: [vuexPersistence.plugin],
});
