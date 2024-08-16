import axios from 'axios';
import useUserStore from '@/stores/modules/user';
import settings from '@/settings';
import { getToken } from './auth';
import router from '@/router';

// 是否显示重新登录
export let isRelogin = { show: false };

axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // url = base url + request url
  timeout: 10000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use(config => {
  const userStore = useUserStore();
  if (userStore.token) {
    config.headers['Authorization'] =
      settings.isTokenBearer ? 'Bearer ' + getToken() : getToken();
  }
  return config;
}, error => {
  console.log(error);
  Promise.reject(error);
});

// 响应拦截器
service.interceptors.response.use(response => {
  const res = response.data;
  const responseType = response.request.responseType; // 获取响应类型
  // 二进制数据则直接返回
  if (responseType === 'blob' || responseType === 'arraybuffer') {
    return res;
  }

  if (res.code === 401) {
    if (!isRelogin.show) {
      isRelogin.show = true;
      showDialog({
        title: '系统提示',
        message: '登录状态已过期，您可以继续留在该页面，或者重新登录',
        confirmButtonText: '重新登录',
        showCancelButton: true,
        cancelButtonText: '取消'
      }).then(() => {
        isRelogin.show = false; // 避免重复弹窗
        // 直接调用登出，可能会导致服务器升级或者服务器缓存清理时，前端无法正常登出
        router.replace({ path: '/login' });
      }).catch(() => {
        // 若页面非白名单页面，则跳转到登录页面
        if (settings.whiteList.indexOf(router.currentRoute.value.path) === -1) {
          router.replace({ path: '/login' });
        }
        isRelogin.show = false;
      });
      // 清除缓存
      useUserStore().resetToken();
    }

    return Promise.reject('无效的会话，或者会话已过期，请重新登录。');
  }
  if (res.code !== 200) {
    showFailToast(res.msg);
    return Promise.reject('error');
  }
  return res;
}, error => {
  console.log('err' + error);
  let { message } = error;
  console.log(message);
  if (message == "Network Error") {
    message = "后端接口连接异常";
  } else if (message.includes("timeout")) {
    message = "系统接口请求超时";
  } else if (message.includes("Request failed with status code")) {
    message = "系统接口" + message.substr(message.length - 3) + "异常";
  }
  showFailToast(message);
  return Promise.reject(error);
});

export default service;
