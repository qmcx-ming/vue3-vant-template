import router from './router';
import useSettingsStore from '@/stores/modules/settings';
import useCachedViewStore from '@/stores/modules/cachedView';
import useUserStore from '@/stores/modules/user';
import settings from './settings';
import { getToken } from '@/utils/auth';

// 进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// 进度条配置
NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

router.beforeEach(async (to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();

  // 设置页面路由缓存 即tabbar页面
  useCachedViewStore().addCachedView(to);
  // 设置页面标题
  to.meta.title && useSettingsStore().setTitle(to.meta.title);

  // 判断是否有token
  if (getToken()) {
    if (to.path === '/login') {
      // 已登录的情况下，访问登录页面，跳转到首页
      next('/');
      NProgress.done();
    } else {
      // 判断用户是否已拉取完user_info信息
      if (useUserStore().name) {
        next();
      } else {
        try {
          await useUserStore().getInfo();
          next();
        } catch(error) {
          await useUserStore().logout();
          showFailToast(error);
          next('/login');
          NProgress.done();
        }
      }
    }
  } else {
    // 判断免登录白名单,true 直接进入, false 进入登录页面
    if (settings.whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
})

router.afterEach(() => {
  // 路由切换完毕后，进度条走完
  NProgress.done();
})
