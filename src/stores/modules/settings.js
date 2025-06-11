import { defineStore } from 'pinia';
import { setPageTitle } from '@/utils/pageTitle';

const useSettingsStore = defineStore('settings', {
  state: () => ({
    title: '',
    theme: localStorage.getItem('theme') || 'light', // 默认主题为 light
  }),
  actions: {
    /**
     * 设置标题
     * @param {String} title 标题
     */
    setTitle(title) {
      this.title = title;
      setPageTitle();
    },
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', this.theme);
      document.documentElement.classList.add(this.theme);
    }
  }
})

export default useSettingsStore;
