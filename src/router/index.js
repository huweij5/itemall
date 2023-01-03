import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

Vue.use(VueRouter);

const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../views/home'),
    meta: {
      title: '首页',
    },
  },
  {
    name: 'category',
    path: '/category',
    component: () => import('../views/category'),
    meta: {
      title: '分类',
    },
  },
  {
    name: 'cart',
    path: '/cart',
    component: () => import('../views/cart'),
    meta: {
      title: '购物车',
      keepAlive: true, // 不缓存组件
      auth: true, // 授权登录
    },
  },
  {
    name: 'profile',
    path: '/profile',
    component: () => import('../views/profile'),
    meta: {
      title: '我的',
      auth: true, // 授权登录
    },
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('../views/register'),
    meta: {
      title: '注册',
      isHide: true, // 隐藏底部导航栏
    },
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('../views/login'),
    meta: {
      title: '登录',
      isHide: true, // 隐藏底部导航栏
    },
  },
  {
    name: 'detail',
    path: '/detail',
    component: () => import('../views/detail'),
    meta: {
      title: '商品详情',
      isHide: true, // 隐藏底部导航栏
      keepAlive: true, // 不缓存组件
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 路由权限
  // 授权 => 判断to.meta.auth是否为true 为true则判断是否登录（是否有token） 未登录则跳转到登录页
  if (to.meta.auth) {
    if (!store.state.token) {
      next('/login');
      return;
    }
  }
  document.title = to.meta.title;
  next();
});

export default router;
