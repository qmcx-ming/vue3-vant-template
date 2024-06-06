import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router';
import routes from './routes';
import settings from '@/settings';

const baseUrl = import.meta.env.VITE_APP_BASE_URL;
const history = settings.isHashHistory
  ? createWebHashHistory(baseUrl)
  : createWebHistory(baseUrl);

const router = createRouter({
  history,
  routes
})

export default router
