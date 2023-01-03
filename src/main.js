import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import setupPlugins from './plugins';

Vue.config.productionTip = false;

setupPlugins(); // 加载插件

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
