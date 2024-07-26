// 多语言实例化文件
import Vue from 'vue' // 引入Vue
import VueI18n from 'vue-i18n' // 引入国际化的包
import Cookie from 'js-cookie' // 引入 cookie 工具
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入 element-ui 的中文包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入 element-ui 的英文包
import elementJA from 'element-ui/lib/locale/lang/ja' // 引入 element-ui 的英文包
// 自定义语言包
import customZH from './zh'
import customEN from './en'

Vue.use(VueI18n) // 全局注册国际化包

export default new VueI18n({
  locale: Cookie.get('language') || 'zh', // 是当前的多语言的类型，随意定义的字符串   中文/zh  英文/en
  messages: { // 是当前的语言包
    zh: {
      ...elementZH,
      ...customZH
    },
    en: {
      ...elementEN,
      ...customEN
    },
    ja: {
      ...elementJA
    }
  }
})
