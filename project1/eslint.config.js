import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginPrettier from 'eslint-plugin-prettier'
import configPrettier from 'eslint-config-prettier'

export default [
  // 基础 JavaScript 规则
  js.configs.recommended,
  // Vue 推荐规则
  ...pluginVue.configs['flat/recommended'],
  // Prettier 配置
  configPrettier,
  {
    plugins: {
      prettier: pluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
    ignores: [
      'dist/**/*',
      'node_modules/**/*',
      '**/*.min.css',
      'build/**/*',
      '.git/**/*',
    ],
  },
]
