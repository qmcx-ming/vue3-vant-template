import request from '@/utils/request';

// 登录
export const login = (username, password, code, uuid) => {
  const data = {
    username,
    password,
    code,
    uuid
  }
  return request({
    url: '/login',
    method: 'post',
    data,
  });
}

// 获取用户信息
export const getInfo = () => {
  return request({
    url: '/getInfo',
    method: 'get'
  });
}

// 获取验证码
export const getCodeImg = () => {
  return request({
    url: '/captchaImage',
    method: 'get'
  });
}

// 退出登录
export const logout = () => {
  return request({
    url: '/logout',
    method: 'post'
  });
}

// 修改密码
export function updateUserPwd(oldPassword, newPassword) {
  const data = {
    oldPassword,
    newPassword
  }
  return request({
    url: '/system/user/profile/updatePwd',
    method: 'put',
    params: data
  })
}

// 获取用户个人信息
export function getUserProfile() {
  return request({
    url: '/system/user/profile',
    method: 'get'
  })
}

// 修改用户个人信息
export function updateUserProfile(data) {
  return request({
    url: '/system/user/profile',
    method: 'put',
    data: data
  })
}
