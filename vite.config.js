import { fileURLToPath, URL } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import createVitePlugins from './vite/plugins';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_BASE_URL  } = env;
  return {
    base: VITE_APP_BASE_URL,
    // 插件
    plugins: createVitePlugins(env, command === 'build'),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      // 监听所有可用的网络接口
      host: true,
      // 打开浏览器窗口
      open: true,
      proxy: {
        '/dev-api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/dev-api/, '')
        }
      }
    }
  }
})
