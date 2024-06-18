/**
 * 路由页面配置
 * @type {Array.<{path: String, name: String, component: Function, meta: {title: String, keepAlive: Boolean, showNav: Boolean, icon: String}}>}
 * @property {String} path - 路由路径
 * @property {String} name - 路由名称
 * @property {Function} component - 路由组件
 * @property {Object} meta - 路由元信息
 * @property {String} meta.title - 路由标题
 * @property {Boolean} meta.keepAlive - 是否缓存路由(tabbar)
 * @property {Boolean} meta.showNav - 是否显示导航栏
 * @property {String} meta.icon - 导航栏图标
 * @example
 * {
 *   path: '/test',
 *   name: 'Test',
 *   component: () => import('@/views/test/index.vue'),
 *   meta: {
 *     title: '测试',
 *     keepAlive: true,
 *     showNav: true,
 *     icon: 'test'
 *   }
 * }
 */
const pages = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '主页',
      keepAlive: true,
      showNav: true,
      icon: 'wap-home-o'
    }
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/views/mine/index.vue'),
    meta: {
      title: '我的',
      keepAlive: true,
      showNav: false,
      icon: 'user-o'
    }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/mine/profile/index.vue'),
    meta: {
      title: '个人资料',
      keepAlive: false,
      showNav: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面没有找到🐳'
    }
  }
];

export default pages;