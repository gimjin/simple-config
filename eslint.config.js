import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'
import json from 'eslint-plugin-json'

export default [
  ...pluginVue.configs['flat/recommended'],
  stylistic.configs['recommended-flat'],
  json.configs['recommended'],
  {
    ignores: ['dist/*'],
  },
]
