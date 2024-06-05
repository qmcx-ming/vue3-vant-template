import VueSetupExtend from 'unplugin-vue-setup-extend-plus/vite';

// 使得setup语法糖上支持 name 属性 [解决 keep-alive 缓存失败问题]
export default function createSetupExtend() {
  return VueSetupExtend({});
}