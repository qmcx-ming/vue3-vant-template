import useSettingsStore from '@/stores/modules/settings'
import settings from '@/settings';

/**
 * 动态修改标题
 */
export function setPageTitle() {
  const settingsStore = useSettingsStore();
  // 判断是否需要拼接标题，如：xxx | xxx
  document.title = settings.isPageTitleJoining
    ? `${settingsStore.title} | ${settings.title}`
    : settingsStore.title;
}