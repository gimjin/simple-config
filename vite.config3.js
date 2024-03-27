import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { name as appName } from './package.json'

let commitId = ''
let tagName = ''
let ciBuild = ''
try {
  commitId = execSync('git rev-parse --short HEAD').toString().trim()
  tagName = execSync(`git tag --list --contain ${commitId}`).toString().trim()
  ciBuild = process.env.VITE_CI_BUILD || ''
}
catch (error) {
  console.error(error)
}

export default defineConfig({
  server: {
    proxy: {
      '/resourcecompetition': {
        target: 'http://10.40.163.205:8446',
        changeOrigin: true,
      },
    },
  },
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(`${appName}: ${tagName}-${commitId}+${ciBuild}`),
  },
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
      },
    },
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
