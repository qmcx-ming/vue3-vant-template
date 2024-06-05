import { defineStore } from 'pinia';
import { setPageTitle } from '@/utils/pageTitle';

const useSettingsStore = defineStore('settings', {
  state: () => ({
    title: ''
  }),
  actions: {
    /**
     * 设置标题
     * @param {String} title 标题
     */
    setTitle(title) {
      this.title = title;
      setPageTitle();
    }
  }
})

export default useSettingsStore;
