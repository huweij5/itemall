<template>
  <div class="login">
    <van-sticky>
      <nav-bar ref="navBarRef">
        <template #center> 登陆 </template>
      </nav-bar>
    </van-sticky>
    <div class="form" :style="{ height: `calc(100vh - ${navBarHeight}px)` }">
      <van-form colon validate-first label-align="right" @submit="handleLogin">
        <van-field
          v-model="userInfo.phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="phoneRule"
        />

        <van-field
          v-model="userInfo.password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="passwordRule"
        />

        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" size="small" color="#00bfc0">
            登录
          </van-button>
          <div class="link">
            没有账号，去
            <router-link to="/register">注册</router-link>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { phoneRule, passwordRule } from '@/utils/validate';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data: () => ({
    userInfo: {
      phone: '',
      password: '',
    },
    navBarHeight: 0,
    phoneRule,
    passwordRule,
  }),
  mounted() {
    // 获取挂载后的navBar高度
    this.navBarHeight = this.$refs.navBarRef.$el.offsetHeight;
  },
  methods: {
    ...mapActions(['loginAction']),
    /** 登陆 */
    handleLogin() {
      this.loginAction(this.userInfo);
    },
  },
};
</script>

<style lang="less" scoped>
.form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.link {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
  color: @theme-gray;
}
</style>
