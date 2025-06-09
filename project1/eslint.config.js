import pluginVue from 'eslint-plugin-vue'
import stylistic from '@stylistic/eslint-plugin'

export default [
  ...pluginVue.configs['flat/recommended'],
  stylistic.configs.recommended,
  {
    ignores: ['dist/*'],
  },
]
