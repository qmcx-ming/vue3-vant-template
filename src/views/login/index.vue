<script setup name="Login">
import { ref } from 'vue';
import Logo from '@/assets/logo.png';
import { useRouter } from 'vue-router';
import { getCodeImg } from '@/api/login';
import useUserStore from '@/stores/modules/user';

const router = useRouter();

const loading = ref(false);
const codeUrl = ref('');
// 验证码开关
const captchaEnabled = ref(true);
const form = ref({
  username: 'admin',
  password: '123456',
  code: 'cqfb',
  uuid: '',
});

// 密码框显示切换
const passwordShow = ref(false);

// 获取验证码图片
const getCaptchaImg = () => {
  getCodeImg().then((res) => {
    captchaEnabled.value =
      captchaEnabled.value === undefined ? true : res.captchaEnabled;
    if (captchaEnabled.value) {
      codeUrl.value = 'data:image/gif;base64,' + res.img;
      form.value.uuid = res.uuid;
    }
  });
};

const onSubmit = async (values) => {
  // console.log('submit', values);
  loading.value = true;
  try {
    await useUserStore().login(form.value);
    router.replace({ path: '/' });
  } catch (error) {
    console.log(error);
    if (captchaEnabled.value) {
      getCaptchaImg();
    }
  } finally {
    loading.value = false;
  }
};

getCaptchaImg();
</script>
<template>
  <div class="login">
    <van-image class="logo" width="80" height="80" :src="Logo" fit="cover" />
    <van-form @submit="onSubmit" label-width="20px">
      <van-cell-group :border="false">
        <van-field
          v-model="form.username"
          name="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        >
          <template #label>
            <van-icon name="user" size="18" />
          </template>
        </van-field>
        <van-field
          v-model="form.password"
          :type="passwordShow ? 'text' : 'password'"
          name="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          :right-icon="passwordShow ? 'closed-eye' : 'eye-o'"
          @click-right-icon="passwordShow = !passwordShow"
        >
          <template #label>
            <van-icon name="lock" size="18" />
          </template>
        </van-field>
        <van-field
          v-show="captchaEnabled"
          v-model="form.code"
          name="验证码"
          placeholder="验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
          style="align-items: center"
        >
          <template #label>
            <van-icon name="checked" size="18" />
          </template>
          <template #right-icon>
            <van-image :src="codeUrl" fit="cover" />
          </template>
        </van-field>
      </van-cell-group>
      <div style="margin: 10px">
        <van-button
          :loading="loading"
          block
          type="primary"
          native-type="submit"
        >
          登录
        </van-button>
      </div>
      <div class="bottom-register">
        <!-- <router-link to="/register">注册账号</router-link> -->
      </div>
    </van-form>
  </div>
</template>
<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-image: linear-gradient(to bottom, transparent, #fff 200px),
    linear-gradient(to right, #a1c4fd 20%, #c2e9fb);
  .logo {
    margin-bottom: 30px;
    margin-top: 100px;
  }

  .van-field {
    width: 360px;
  }

  .bottom-register {
    text-align: center;
    display: flex;
    justify-content: space-evenly;
    a {
      color: #000000;
      font-size: 14px;
    }
  }
}
</style>
