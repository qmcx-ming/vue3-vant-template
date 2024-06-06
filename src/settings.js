export default {
  title: import.meta.env.VITE_APP_TITLE,
  /**
   * 免登录白名单
   */
  whiteList: [
    '/login',
    '/404',
    '/home'
  ],
  /**
   * token key
   */
  tokenKey: 'vue3-vant-token',
  /**
   * 请求头token是否拼接 'Bearer '
   * @type {boolean} true | false
   */
  isTokenBearer: false,
  /**
   * 是否开启页面标题拼接
   * @type {boolean} true | false
   */
  isPageTitleJoining: false,
  /**
   * 是否开启WebHashHistory模式
   * @type {boolean} true | false
   * @description 因为github pages使用history模式的话，会有404的错误，所以使用hash模式
   */
  isHashHistory: true
}