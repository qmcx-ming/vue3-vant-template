import Layout from '@/layout/index.vue';
import pages from '@/pages';

/**
 * 路由配置
 * meta参数说明
 * title: 页面标题
 * keepAlive: 是否缓存页面，可以用于判断是否显示tabbar
 * showNav: 是否显示导航栏
 */
const routes = [
  {
    path: '/',
    name: 'root',
    component: Layout,
    redirect: '/home',
    // 相当于让children中每一个对象的meta属性有了默认值
    meta: {
      keepAlive: false,
      showNav: false
    },
    children: pages
  },
  {
    path: "/:pathMatch(.*)*",
    redirect:'/404',
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: {
      title: '页面没有找到🐳'
    }
  }
]

export default routes;