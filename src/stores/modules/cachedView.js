import { defineStore } from 'pinia'

const useCachedViewStore = defineStore('cachedView', {
  state: () => ({
    cachedViewList: []
  }),
  actions: {
    addCachedView(view) {
      if (this.cachedViewList.includes(view.name)) return;
      if (view?.meta?.keepAlive) {
        this.cachedViewList.push(view.name);
      }
    },
    delCachedView(view) {
      const index = this.cachedViewList.indexOf(view.name);
      index > -1 && this.cachedViewList.splice(index, 1);
    }
  }
})

export default useCachedViewStore;
