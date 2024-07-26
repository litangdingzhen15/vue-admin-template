import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import * as directives from '@/directives' // 这里的 directives 装的就是文件里的所有对象

import '@/icons' // icon
import '@/permission' // permission control
import i18n from '@/lang/index.js'

// import 'lib-flexible'

// 全局混入检查对象
import checkPermission from '@/mixin/checkPermission'
// 表示所有组件都有了检查的方法
Vue.mixin(checkPermission)

// 注册自己定义的全局组件
import Components from '@/components/index'
Vue.use(Components)

// 导入过滤器
import * as filters from '@/filters/index'
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]) // 遍历的形式去注册过滤器（这里面的函数的名称就是过滤器的名称）
})

// if (process.env.NODE_ENV === 'production') {
//   // const { mockXHR } = require('../mock')
//   // eslint-disable-next-line no-undef
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI, {
//   i18n: (key, value) => i18n.t(key, value)
// })

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
})

Object.keys(directives).forEach(key => {
  Vue.directive(key, directives[key]) // 注册自定义指令
})

Vue.config.productionTip = false

import 'lib-flexible/flexible'
import '@/styles/index.scss'
import '@/fonts/icomoon.css'
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})

