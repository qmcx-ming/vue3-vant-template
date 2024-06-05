import { vitePluginFakeServer } from 'vite-plugin-fake-server';

export default function createVitePluginFakeServer() {
  return vitePluginFakeServer({
    logger: true, // 是否显示日志
    include: 'mock',
    infixName: false, // 是否使用中缀，如：login.fake.js 【fake就是中缀】
    enableProd: true, // 生产环境mock/fake
    enableDev: true // 开发环境mock/fake
  });
}