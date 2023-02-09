const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin')
const WebpackObfuscator = require('webpack-obfuscator')

const commit = execSync('git rev-parse --short HEAD').toString().trim()
const tag = execSync(`git tag --list --contain ${commit}`).toString().trim()
process.env.VUE_APP_VERSION = `${tag}(${commit})`

module.exports = {
  publicPath: '/',
  lintOnSave: true,
  productionSourceMap: false,
  runtimeCompiler: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        bypass (req) {
          req.headers.Cookie = 'JSESSIONID=1234567890'
        }
      }
    }
  },
  chainWebpack: config => {
    config.plugin('MonacoWebpackPlugin').use(MonacoWebpackPlugin)
    if (process.env.NODE_ENV === 'production') {
      // 2.17.1 (安全-敏感信息保护测试) 敏感信息保护测试-js信息泄露。URL 混淆
      config.module
        .rule('obfuscator')
        .test(/axios\/api\.js$/)
        .post()
        .use()
        .loader(WebpackObfuscator.loader)
        .options({
          optionsPreset: 'high-obfuscation',
          debugProtection: false,
          disableConsoleOutput: false
        })
        .end()
    }
  }
}
