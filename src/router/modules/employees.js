// 员工的路由规则
import Layout from '@/layout'
export default {
  path: '/employees', // 路由地址
  name: 'employees', // 给模块的一级路由加一个 name 属性，后面会用到
  component: Layout,
  children: [{
    path: '', // 二级路由的 path 什么都不写的时候，表示二级路由的默认路由
    component: () => import('@/views/employees'),
    name: 'employees',
    // 路由元信息，其实就是一个存储数据的地方，可以放任何内容
    meta: {
      title: '员工管理', // 左侧导航布局需要用到这里的 title 属性
      icon: 'people'
    }
  }, { // 子路由的路径不要加 / ， 如果加 / 的话，系统会认为是一级路由
    path: 'detail/:id?', // 动态路由 ?的含义是表示后面的参数可传可不传
    component: () => import('@/views/employees/detail.vue'),
    hidden: true,
    meta: {
      title: '员工详情'
    }
  },
  {
    path: 'print/:id', // 二级默认路由
    component: () => import('@/views/employees/components/print'), // 按需加载
    hidden: true,
    meta: {
      title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      icon: 'people'
    }
  }]
}
