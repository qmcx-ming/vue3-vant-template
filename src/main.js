import './assets/styles/index.scss';
import './permission';
import 'virtual:svg-icons-register'; // icon
import SvgIcon from '@/components/SvgIcon/index.vue';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('svg-icon', SvgIcon);

app.mount('#app')
