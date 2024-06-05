import vue from '@vitejs/plugin-vue';
import createAutoImport from './auto-import';
import createVueComponents from './vue-components';
import createSetupExtend from './setup-extend';
import createSvgIcon from './svg-icon';
import createVitePluginFakeServer from './fake-server';

export default function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createVueComponents());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  vitePlugins.push(createVitePluginFakeServer());
  return vitePlugins;
}