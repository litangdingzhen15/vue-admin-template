// 负责所有全局自定义组件的注册
import PageTools from '@/components/PageTools'
import UploadExcel from '@/components/UploadExcel'
import ImageUpload from '@/components/ImageUpload'
import ImageUpload1 from '@/components/ImageUpload/index1.vue'
import Print from 'vue-print-nb'
import ScreenFull from './ScreenFull/index.vue'
import ThemePicker from './ThemePicker'
import LangSelect from './lang/index.vue'
import TagsView from './TagsView'

export default {
  install(Vue) {
    // 注册全局的通用栏组件对象
    // 前面是注册后的组件名，后面是要注册的那个组件
    Vue.component('PageTools', PageTools)
    Vue.component('UploadExcel', UploadExcel)
    Vue.component('ImageUpload', ImageUpload)
    Vue.component('ImageUpload1', ImageUpload1)
    Vue.use(Print) // 注册打印插件
    Vue.component('ScreenFull', ScreenFull)
    Vue.component('ThemePicker', ThemePicker) // 注册更换主题插件
    Vue.component('LangSelect', LangSelect)
    Vue.component('TagsView', TagsView)
  }
}
