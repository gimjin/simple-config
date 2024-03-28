import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { name, version } from './package.json'

let commit = ''
let tag = ''
let build = ''
try {
  commit = execSync('git rev-parse --short HEAD').toString().trim() || 'commit'
  tag = execSync(`git tag --list --contain ${commit}`).toString().trim() || 'tag'
  build = process.env.VITE_CI_BUILD || 'build'
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
    __APP_VERSION__: JSON.stringify(`${name}: ${version}-${commit}-${tag}+${build}`),
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
