<script setup name="Mine">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Avatar from '@/assets/images/avatar.jpg';
import useUserStore from '@/stores/modules/user';
import { updateUserPwd } from '@/api/login';
// import { validatorConfirmPassword } from '@/utils/rules';

const userStore = useUserStore();

const editPasswordShow = ref(false);
const editPasswordRef = ref();
const editPasswordForm = ref({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
});
const oldPasswordShow = ref(false);
const newPasswordShow = ref(false);
const confirmPasswordShow = ref(false);

const router = useRouter();

// 预览图片
const previewImage = () => {
  showImagePreview([Avatar]);
};

// 对话框关闭
const dialogClose = () => {
  // 重置表单校验
  editPasswordRef.value.resetValidation();
  // 重置表单值
  editPasswordForm.value = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
};

// 对话框关闭前的回调-可以阻止关闭
const beforeClose = (action) => {
  if (action === 'confirm') {
    return false;
  } else {
    return true;
  }
};

// 校验确认密码
const validatorConfirmPassword = (val) => {
  return val === editPasswordForm.value.newPassword;
};

const onSubmit = () => {
  // 校验通过
  editPasswordRef.value
    .validate()
    .then(() => {
      const passwordForm = editPasswordForm.value;
      updateUserPwd(passwordForm.oldPassword, passwordForm.newPassword).then(
        () => {
          showToast('修改成功');
          editPasswordShow.value = false;
        }
      );
    })
    .catch(() => {});
};

const logoutHandler = () => {
  showConfirmDialog({
    title: '提示',
    message: '确定要退出登录吗？',
  })
    .then(async () => {
      await userStore.logout();
      router.replace('/login');
      showToast('退出成功');
    })
    .catch(() => {});
};
</script>
<template>
  <div class="mine">
    <!-- 顶部头像区 -->
    <div class="top">
      <div class="user-info">
        <van-image
          class="avatar"
          width="80"
          height="80"
          :src="userStore.avatar"
          fit="cover"
          round
          @click="previewImage"
        />
        <span class="username">{{ userStore.name }}</span>
      </div>
    </div>
    <!-- 个性签名 -->
    <div class="personalized-signature">
      <van-text-ellipsis
        :content="userStore.remark"
        expand-text="展开"
        collapse-text="收起"
      />
    </div>
    <!-- 底部功能区 -->
    <div class="bottom-feature">
      <van-cell-group inset>
        <van-cell
          title="修改密码"
          icon="shield-o"
          is-link
          @click="editPasswordShow = true"
        />
        <van-cell title="个人资料" icon="more-o" is-link to="/profile" />
        <van-cell title="设置" icon="setting-o" is-link />
        <van-cell title="关于我们" icon="like-o" is-link />
      </van-cell-group>

      <div style="padding: 16px">
        <van-button type="default" block @click="logoutHandler"
          >退出登录</van-button
        >
      </div>
    </div>

    <!-- 修改密码对话框 -->
    <van-dialog
      v-model:show="editPasswordShow"
      title="修改密码"
      show-cancel-button
      :before-close="beforeClose"
      @closed="dialogClose"
      @confirm="onSubmit"
    >
      <van-form ref="editPasswordRef">
        <van-cell-group inset>
          <van-field
            v-model="editPasswordForm.oldPassword"
            :type="oldPasswordShow ? 'text' : 'password'"
            name="旧密码"
            label="旧密码"
            placeholder="旧密码"
            required
            :right-icon="oldPasswordShow ? 'closed-eye' : 'eye-o'"
            @click-right-icon="oldPasswordShow = !oldPasswordShow"
            :rules="[
              { required: true, message: '请填写旧密码' },
              { pattern: /^\S{6,20}$/, message: '长度在 6 到 20 个字符' }
            ]"
          />
          <van-field
            v-model="editPasswordForm.newPassword"
            :type="newPasswordShow ? 'text' : 'password'"
            name="新密码"
            label="新密码"
            placeholder="新密码"
            required
            :right-icon="newPasswordShow ? 'closed-eye' : 'eye-o'"
            @click-right-icon="newPasswordShow = !newPasswordShow"
            :rules="[
              { required: true, message: '请填写新密码' },
              { pattern: /^\S{6,20}$/, message: '长度在 6 到 20 个字符' }
            ]"
          />
          <van-field
            v-model="editPasswordForm.confirmPassword"
            :type="confirmPasswordShow ? 'text' : 'password'"
            name="确认密码"
            label="确认密码"
            placeholder="确认密码"
            required
            :right-icon="confirmPasswordShow ? 'closed-eye' : 'eye-o'"
            @click-right-icon="confirmPasswordShow = !confirmPasswordShow"
            :rules="[
              { required: true, message: '请填写确认密码' },
              { pattern: /^\S{6,20}$/, message: '长度在 6 到 20 个字符' },
              {
                validator: validatorConfirmPassword,
                message: '两次输入的密码不一致',
              }
            ]"
          />
        </van-cell-group>
      </van-form>
    </van-dialog>
  </div>
</template>

<style lang="scss" scoped>
.mine {
  background-color: #f5f6f7;
  // 50px 为tabbar的高度
  height: calc(100vh - 50px);
  .top {
    display: flex;
    height: 180px;
    background: url('@/assets/images/background.jpg');
    background-size: cover;
    background-position: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 30px;

    .user-info {
      position: absolute;
      top: 100px;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      .avatar {
        border: 2px solid #ffffff;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }

      .username {
        font-size: 18px;
        letter-spacing: 2px;
        font-weight: bold;
        margin-top: 2px;
        text-align: center;
      }
    }
  }

  .personalized-signature {
    padding: 10px;
    text-align: center;
  }

  // .bottom-feature {
  //   margin-top: 50px;
  // }
}
</style>
