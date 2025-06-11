<script setup>
import { computed } from 'vue';
import useSettingsStore from '@/stores/modules/settings';
const settingsStore = useSettingsStore();

const themeIcon = computed(() => {
  return settingsStore.theme === 'dark' ? 'light' : 'dark';
});

// 切换主题
const toggleTheme = () => {
  settingsStore.toggleTheme();
}

// 说明：keepAlive 为 true，标志着他为tabbar页面，如主页、我的...
// keepAlive 为 false，标志着他为非tabbar页面，如个人资料页、搜索页...
</script>
<template>
  <van-config-provider :theme="settingsStore.theme">
  </van-config-provider>
  <van-nav-bar
    v-if="$route.meta.showNav"
    placeholder
    fixed
    :title="settingsStore.title"
    :left-arrow="!$route.meta.keepAlive"
    @click-left="$router.back()"
  >
    <template #right>
      <svg-icon :name="themeIcon" color="var(--icon-color)" size="18px" @click="toggleTheme" />
    </template>
  </van-nav-bar>
</template>
<style lang="scss" scoped></style>
