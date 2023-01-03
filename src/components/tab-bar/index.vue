<template>
  <div class="tab-bar">
    <van-tabbar
      placeholder
      safe-area-inset-bottom
      active-color="#00bfc0"
      v-model="active"
      @change="handleToggleLink"
    >
      <template v-for="item in tabbar">
        <van-tabbar-item :key="item.title" :icon="item.icon" :name="item.name">{{
          item.title
        }}</van-tabbar-item>
      </template>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  data() {
    return {
      tabbar: [
        {
          icon: 'home-o',
          title: '首页',
          name: 'home',
        },
        {
          icon: 'apps-o',
          title: '分类',
          name: 'category',
        },
        {
          icon: 'shopping-cart-o',
          title: '购物车',
          name: 'cart',
        },
        {
          icon: 'user-o',
          title: '我的',
          name: 'profile',
        },
      ],
    };
  },
  computed: {
    active: {
      get() {
        return this.$route.name;
      },
      set() {},
    },
  },
  methods: {
    /** 切换路由 */
    handleToggleLink(name) {
      this.$router.replace({ name });
    },
  },
};
</script>

<style lang="less" scoped>
.tab-bar {
  height: 100px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
