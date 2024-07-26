'use strict'
const path = require('path')
const defaultSettings = require('./src/settings.js')

function resolve(dir) {
  return path.join(__dirname, dir)
}

// 调用声明好的 title 名字
const name = defaultSettings.title || 'vue Admin Template' // page title

// ————————————————————————————————————————————————————————————
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
// You can change the port by the following methods:
// port = 9528 npm run dev OR npm run dev --port = 9528
// ————————————————————————————————————————————————————————————

const port = process.env.port || process.env.npm_config_port || 9528 // dev port
let cdn = { css: [], js: [] }
let externals = {}
const isProd = process.env.NODE_ENV === 'production' // 判断是否是生产环境
if (isProd) {
  // 只有生产环境才有必要去做排除和 cdn 的注入
  externals = { 'vue': 'Vue',
    'element-ui': 'ELEMENT',
    'xlsx': 'XLSX' }
  cdn = {
    css: [
      // element-ui css
      'https://unpkg.com/element-ui/lib/theme-chalk/index.css' // 样式表
    ],
    js: [
      // vue must at first!
      'https://unpkg.com/vue/dist/vue.js', // vuejs
      // element-ui js
      'https://unpkg.com/element-ui/lib/index.js', // elementUI
      'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/jszip.min.js',
      'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js'
    ]
  }
}

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
  /**
   * You will need to set publicPath if you plan to deploy your site under a sub path,
   * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then publicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail: https://cli.vuejs.org/config/#publicpath
   */
  publicPath: '/',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV === 'development',
  productionSourceMap: false,
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    // 通过  proxy 节点进行设置跨域代理（对象的形式）
    proxy: {
      // '要跳转到的地址':{
      // target:'到代理到的服务器地址'；会把要跳转的地址自动拼接到服务器地址后面
      // changeOrigin:true // 是否跨域
      // }
      // ---------------------------------------
      '/api': {
        target: 'http://ihrm.itheima.net/',
        changeOrigin: true
      }
      // -----------------------------------------
      // pathRewrite:{
      //  'api':''
      // }
      // 如果有需要在真正请求期间将 /api 去除的话,可以通过 pathRewrite 去去除
    }
    // before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    // 要排除哪些包
    // key 是要排除的包；value 是实际引入的包的全局的变量名
    // 因为要排除 element-ui，所以后面要引入 CDN 文件，CDN 文件中有 ELEMENT 的全局变量名
    // externals 首先会排除掉定义的包名，空出来的位置，会用变量来替换
    externals: externals
  },
  chainWebpack(config) {
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config.plugin('preload').tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ])

    // 注入 cdn 变量
    // 这行代码会在执行打包的时候，将 cdn 变量注入到 html 模板中
    config.plugin('html').tap((args) => {
      // args 是注入 html 模板的一个变量
      args[0].cdn = cdn // 后面的 cdn 就是定义的变量
      return args // 需要返回这个参数
    })
    // when there are many pages, it will cause too many meaningless requests
    config.plugins.delete('prefetch')

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    config
      .when(process.env.NODE_ENV !== 'development',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
            // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end()
          config
            .optimization.splitChunks({
              chunks: 'all',
              cacheGroups: {
                libs: {
                  name: 'chunk-libs',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // only package third parties that are initially dependent
                },
                elementUI: {
                  name: 'chunk-elementUI', // split elementUI into a single package
                  priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                  test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // can customize your rules
                  minChunks: 3, //  minimum common number
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            })
          // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
          config.optimization.runtimeChunk('single')
        }
      )
  }
}
