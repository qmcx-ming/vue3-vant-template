import Components from 'unplugin-vue-components/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// 组件自动导入配置
export default function createVueComponents() {
  return Components({
    resolvers: [VantResolver()]
  });
}