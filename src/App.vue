<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="!$route.meta.keepAlive" />
    </keep-alive>

    <router-view v-if="$route.meta.keepAlive" />

    <tab-bar v-if="!$route.meta.isHide" ref="tabBarRef" />
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import TabBar from './components/tab-bar';
export default {
  name: 'App',
  components: { TabBar },
  mounted() {
    this.saveTabBarHeight(this.$refs.tabBarRef.$el.offsetHeight);
  },
  methods: {
    ...mapMutations(['saveTabBarHeight']),
  },
};
</script>
