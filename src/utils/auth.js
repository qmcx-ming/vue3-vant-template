import settings from "@/settings";

/**
 * 获取token
 * @returns {String} token
 */
export const getToken = () => {
  return localStorage.getItem(settings.tokenKey);
}

/**
 * 设置token
 * @param {String} token 
 */
export const setToken = (token) => {
  localStorage.setItem(settings.tokenKey, token);
}

/**
 * 移除token
 */
export const removeToken = () => {
  localStorage.removeItem(settings.tokenKey);
}
