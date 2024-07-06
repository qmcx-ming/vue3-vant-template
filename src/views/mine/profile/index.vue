<script setup name="Profile">
import { ref, computed } from 'vue';
import useUserStore from '@/stores/modules/user';
import { getUserProfile } from '@/api/login';

const userStore = useUserStore();

// 46px:导航栏高度
const NAVBAR_HEIGHT = 46;
// 44px:tab标签栏高度
const TABBAR_HEIGHT = 44;

const active = ref(0);

const info = ref({
  nickname: 'Admin',
  phoneNumber: '13456789012',
  email: '123@qq.com',
  sex: '0',
  remark: '慢慢来，不要急，生活给你出了难题，可也终有一天会给出答案。',
  createTime: '2024-01-01',
});

const form = ref({
  nickname: '',
  phoneNumber: '',
  email: '',
  sex: '2',
  remark: '',
});

const loading = ref(false);

const onSubmit = async (values) => {
  console.log('submit', values);
  loading.value = true;
  // 执行修改操作
  await userStore.updateProfile(form.value);
  loading.value = false;
  // 回显到 我的信息
  info.value = { ...form.value };
  showToast('修改成功');
};

// 获取用户信息
const getProfile = async () => {
  const { data } = await getUserProfile();
  // 信息赋值 和 表单赋值
  info.value = { ...data };
  form.value = { ...data };
};

// 获取性别图标name
const getSexIcon = computed(() => {
  return (sex) => {
    if (sex === '0') {
      return 'sex-boy';
    } else if (sex === '1') {
      return 'sex-girl';
    } else {
      return 'sex-secrecy';
    }
  };
});

// 获取个人资料页面高度
const profileHeight = computed(() => {
  // 窗口高度减去导航栏和标签栏的高度
  return `${window.innerHeight - NAVBAR_HEIGHT - TABBAR_HEIGHT}px`;
});
getProfile();
</script>
<template>
  <div class="profile">
    <van-tabs v-model:active="active" swipeable>
      <van-tab title="我的信息" class="profile-tab">
        <van-cell-group inset>
          <van-cell icon="contact" title="用户昵称" :value="info.nickname" />
          <van-cell
            icon="phone-circle"
            title="手机号码"
            :value="info.phoneNumber"
          />
          <van-cell icon="notes" title="邮箱" :value="info.email" />
          <van-cell icon="gem" title="性别" :value="info.sex">
            <template #value>
              <svg-icon :name="getSexIcon(info.sex)" size="18px" />
            </template>
          </van-cell>
          <van-cell icon="comment" title="个性签名" :value="info.remark" />
          <van-cell icon="description" title="创建日期" value="2024-01-01" />
        </van-cell-group>
      </van-tab>
      <van-tab title="编辑信息" class="profile-tab">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field
              v-model="form.nickname"
              name="nickname"
              label="用户昵称"
              placeholder="用户昵称"
              clearable
              :rules="[{ required: true, message: '请填写用户昵称' }]"
            />
            <van-field
              v-model="form.phoneNumber"
              name="phoneNumber"
              label="手机号码"
              placeholder="手机号码"
              clearable
              :rules="[
                { required: true, message: '请填写手机号码' },
                { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码' },
              ]"
            />
            <van-field
              v-model="form.email"
              name="email"
              label="邮箱"
              placeholder="邮箱"
              clearable
              :rules="[
                { required: true, message: '请填写邮箱' },
                {
                  pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                  message: '请输入正确的邮箱',
                },
              ]"
            />
            <van-field name="sex" label="性别">
              <template #input>
                <van-radio-group
                  v-model="form.sex"
                  direction="horizontal"
                  shape="dot"
                >
                  <van-radio name="0">男</van-radio>
                  <van-radio name="1">女</van-radio>
                  <van-radio name="2">保密</van-radio>
                </van-radio-group>
              </template>
            </van-field>
            <van-field
              name="remark"
              v-model="form.remark"
              rows="2"
              autosize
              label="个性签名"
              type="textarea"
              maxlength="50"
              placeholder="请输入个性签名"
              show-word-limit
            />
          </van-cell-group>
          <div style="margin: 16px">
            <van-button
              block
              :loading="loading"
              type="primary"
              native-type="submit"
            >
              保存
            </van-button>
          </div>
        </van-form>
      </van-tab>
    </van-tabs>
  </div>
</template>
<style lang="scss" scoped>
.profile {
  .profile-tab {
    height: v-bind(profileHeight);
  }
}
</style>
