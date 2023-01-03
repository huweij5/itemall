<template>
  <div class="register">
    <van-sticky>
      <nav-bar ref="navBarRef" is-back>
        <template #left>
          <van-icon name="arrow-left" />
        </template>
        <template #center> 注册 </template>
      </nav-bar>
    </van-sticky>
    <div class="form" :style="{ height: `calc(100vh - ${navBarHeight}px)` }">
      <van-form colon validate-first label-align="right" @submit="handleRegister">
        <van-field name="uploader" label="头像">
          <template #input>
            <van-uploader v-model="file" max-count="1" :after-read="handleUpload" />
          </template>
        </van-field>
        <van-field
          v-model="userInfo.nickName"
          name="nickName"
          label="昵称"
          placeholder="请输入昵称"
          :rules="nickNameRule"
        />
        <van-field
          v-model="userInfo.phone"
          name="phone"
          label="手机号"
          placeholder="请输入手机号"
          :rules="phoneRule"
        />
        <van-field
          v-model="sms"
          center
          clearable
          label="验证码"
          placeholder="请输入验证码"
          :rules="[{ validator, message: '验证码错误' }]"
        >
          <template #button>
            <van-button
              size="mini"
              type="primary"
              color="#00bfc0"
              native-type="button"
              @click="sendSms"
              :disabled="!!timer"
              >{{ text }}</van-button
            >
          </template>
        </van-field>
        <van-field
          v-model="userInfo.password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="passwordRule"
        />
        <van-field
          v-model="userInfo.email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="emailRule"
        />
        <van-field name="gander" label="性别">
          <template #input>
            <van-radio-group v-model="userInfo.gander" direction="horizontal">
              <van-radio name="1" checked-color="#00bfc0">男</van-radio>
              <van-radio name="2" checked-color="#00bfc0">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit" size="small" color="#00bfc0">
            注册
          </van-button>
          <div class="link">
            已有账号，去
            <router-link to="/login">登录</router-link>
          </div>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import { uploadAvatar, sendSms, register } from '@/api';
import { nickNameRule, phoneRule, passwordRule, emailRule } from '@/utils/validate';
import NavBar from '@/components/nav-bar';
export default {
  components: { NavBar },
  data: () => ({
    userInfo: {
      avatar: '',
      gander: '1',
      nickName: '',
      phone: '',
      password: '',
      email: '',
    },
    navBarHeight: 0,
    sms: '', // 输入的验证码
    verificationCode: '', // 获取验证码
    file: [],
    text: '发送验证码',
    timer: null, // 计时器
    nickNameRule,
    phoneRule,
    passwordRule,
    emailRule,
  }),
  mounted() {
    // 获取挂载后的navBar高度
    this.navBarHeight = this.$refs.navBarRef.$el.offsetHeight;
  },
  methods: {
    // 上传图片
    async handleUpload({ file }) {
      // 创建表单数据
      const formData = new FormData();
      formData.set('image', file);
      // 上传图片
      this.userInfo.avatar = await uploadAvatar(formData);
    },
    async sendSms() {
      if (this.timer) return;
      // 倒计时
      let time = 60;
      this.timer = setInterval(() => {
        time--;

        if (time <= 0) {
          clearInterval(this.timer);
          this.text = '发送验证码';
          return;
        }

        this.text = `${time}秒后重发`;
      }, 1000);

      // 发送验证码
      this.verificationCode = await sendSms({ phone: this.userInfo.phone });
    },
    /** 注册 */
    async handleRegister() {
      try {
        await register(this.userInfo);
        this.$router.push('/login');
      } catch (error) {
        console.log(error);
      }
    },
    /** 验证码校验 */
    validator(value) {
      return this.verificationCode === value;
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
