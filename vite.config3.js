import { fileURLToPath, URL } from 'node:url'
import { execSync } from 'child_process'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import { name, version } from './package.json'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        headers: {
          Cookie: '1234567890'
        }
      },
    },
  },
  base: './',
  define: {
    __APP_VERSION__: JSON.stringify(getAppVersion()),
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

function getAppVersion() {
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

  return `${name}: ${version}-${commit}-${tag}+${build}`
}
