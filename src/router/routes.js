import Layout from '@/layout/index.vue';

/**
 * 路由配置
 * meta参数说明
 * title: 页面标题
 * keepAlive: 是否缓存页面，可以用于判断是否显示tabbar
 * showNav: 是否显示导航栏
 */
const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: '/home',
    meta: {
      keepAlive: true
    },
    children: [
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
      }
    ]
  }
]

export default routes;