import AutoImport from 'unplugin-auto-import/vite';
import { VantResolver } from '@vant/auto-import-resolver';

// 自动导入配置
export default function createAutoImport() {
  return AutoImport({
    resolvers: [VantResolver()]
  });
}