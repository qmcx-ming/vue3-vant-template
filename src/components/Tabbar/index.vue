<script setup>
import { ref } from 'vue';
import routes from '@/router/routes';
import Layout from '@/layout/index.vue';

const active = ref(0);
const tabbar = ref([]);

tabbar.value = routes
  // 过滤出Layout组件
  .filter(({ component }) => component === Layout)
  .flatMap(({ children }) =>
    children
      // 过滤出需要缓存的路由
      .filter(({ meta }) => meta.keepAlive)
      // 处理成 [{ path: '/home', title: '首页', icon: 'home-o' }, ...]
      .map(({ path, meta: { title, icon } }) => ({ path, title, icon }))
  );
</script>
<template>
  <van-tabbar v-if="$route.meta.keepAlive" v-model="active" route>
    <van-tabbar-item
      v-for="(item, index) in tabbar"
      :key="index"
      :icon="item.icon"
      :to="item.path"
    >
      {{ item.title }}
    </van-tabbar-item>
  </van-tabbar>
</template>
<style lang="scss" scoped></style>
