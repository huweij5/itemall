<template>
  <div class="nav-bar" :style="{ background: bgColor }">
    <template v-if="isBack">
      <div class="left" @click="handleBack">
        <slot name="left"></slot>
      </div>
    </template>
    <template v-else>
      <div class="left">
        <slot name="left"></slot>
      </div>
    </template>

    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" :style="{ width: rightWidth }">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bgColor: {
      type: String,
      default: '#ffffff',
    },
    rightWidth: {
      type: String,
      default: '60px',
    },
    isBack: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /** 返回上一页 */
    handleBack() {
      this.$router.back();
    },
  },
};
</script>

<style lang="less" scoped>
.nav-bar {
  height: 80px;
  display: flex;
  align-items: center;
  text-align: center;
  .left {
    width: 60px;
  }
  .center {
    flex: 1;
  }
}
</style>
