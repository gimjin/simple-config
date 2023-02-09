import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      vue(),
      viteStaticCopy({
        targets: [
          { src: './src/protocols', dest: './' }
        ]
      })
    ],
    resolve: {
      alias: {
        vue: 'vue/dist/vue.esm-bundler.js',
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    }
  }

  if (command === 'build') {
    return {
      define: { 'process.env.NODE_ENV': '"production"' },
      publicDir: false,
      build: {
        lib: {
          entry: fileURLToPath(new URL('src/index.js', import.meta.url)),
          formats: ['es', 'cjs'],
          fileName: (format) => `index.${format}.js`
        },
        rollupOptions: {
          external: [
            'pinia',
            'vue'
          ]
        }
      },
      ...config
    }
  } else if (command === 'serve') {
    return {
      define: { 'process.env.NODE_ENV': '"development"' },
      ...config
    }
  }
})
