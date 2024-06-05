<script setup>
import useSettingsStore from '@/stores/modules/settings';
const settingsStore = useSettingsStore();

// 说明：keepAlive 为 true，标志着他为tabbar页面，如主页、我的...
// keepAlive 为 false，标志着他为非tabbar页面，如个人资料页、搜索页...
</script>
<template>
  <van-nav-bar
    v-if="$route.meta.showNav"
    placeholder
    fixed
    :title="settingsStore.title"
    :left-arrow="!$route.meta.keepAlive"
    @click-left="$router.back()"
  />
</template>
<style lang="scss" scoped></style>
