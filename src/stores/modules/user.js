import { defineStore } from 'pinia';
import { getToken, setToken, removeToken } from '@/utils/auth';
import { login, getInfo, logout, updateUserProfile } from '@/api/login';
import defaultAvatar from '@/assets/images/avatar.jpg';

const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    id: '',
    name: '',
    avatar: '',
    remark: ''
  }),
  actions: {
    // 登录
    login(userInfo) {
      const username = userInfo.username.trim();
      const password = userInfo.password;
      const code = userInfo.code;
      const uuid = userInfo.uuid;
      return new Promise((resolve, reject) => {
        login(username, password, code, uuid).then(res => {
          setToken(res.token);
          this.token = res.token;
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },
    // 获取用户信息
    getInfo() {
      return new Promise((resolve, reject) => {
        getInfo().then(res => {
          const user = res.user;
          const avatar = (user.avatar === '' || user.avatar === null)
            ? defaultAvatar : import.meta.env.VITE_APP_BASE_API + user.avatar;
          this.id = user.id;
          this.name = user.username;
          this.avatar = avatar;
          this.remark = user.remark;
          resolve(res);
        }).catch(error => {
          reject(error);
        });
      })
    },
    // 退出登录
    logout() {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          removeToken();
          this.token = '';
          resolve();
        }).catch(error => {
          reject(error);
        });
      })
    },
    // 修改用户资料
    updateProfile(userInfo) {
      return new Promise((resolve, reject) => {
        updateUserProfile(userInfo).then(res => {
          this.remark = userInfo.remark;
          resolve();
        }).catch(error => {
          reject(error);
        })
      });
    }
  }
});

export default useUserStore;