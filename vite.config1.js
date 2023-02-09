import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import Unocss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
import { vitePluginRemoveVueStyle } from 'unplugin-remove-vue-style'

const commit = execSync('git rev-parse --short HEAD').toString().trim()
const tag = execSync(`git tag --list --contain ${commit}`).toString().trim()

export default defineConfig({
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(`${tag}(${commit})`)
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        headers: {
          // 请求路径 browser > req > proxyReq > server，浏览器hmr中看到的是req header无法看到当前设置，但是代理请求server时会带着当前设置（用抓包工具查看）
          Cookie: 'JSESSIONID=1234567890'
        }
      }
    }
  },
  plugins: [
    vitePluginRemoveVueStyle(),
    vue(),
    legacy({ targets: ['defaults', 'not IE 11'] }),
    Unocss(),
    Icons({
      customCollections: {
        'custom-icons': FileSystemIconLoader(
          './src/assets/icons',
          svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
        )
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
