<script setup>
import useCachedViewStore from '@/stores/modules/cachedView';
import NavBar from '@/components/NavBar/index.vue';
import Tabbar from '@/components/Tabbar/index.vue';

const cachedViewsStore = useCachedViewStore();
</script>
<template>
  <!-- 导航栏 -->
  <nav-bar />
  <!-- 中间容器 -->
  <router-view v-slot="{ Component, route }">
    <keep-alive :include="cachedViewsStore.cachedViewList">
      <component :is="Component" :key="route.path" />
    </keep-alive>
  </router-view>
  <!-- tabbar -->
  <tabbar />
</template>
<style lang="scss" scoped></style>
