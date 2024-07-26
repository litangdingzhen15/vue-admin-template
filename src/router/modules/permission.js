// 员工的路由规则
import Layout from '@/layout'
export default {
  path: '/permission', // 路由地址
  name: 'permissions', // 给模块的一级路由加一个 name 属性，后面会用到
  component: Layout,
  children: [{
    path: '', // 二级路由的 path 什么都不写的时候，表示二级路由的默认路由
    name: 'permissions',
    component: () => import('@/views/permission'),
    // 路由元信息，其实就是一个存储数据的地方，可以放任何内容
    meta: {
      title: '权限管理', // 左侧导航布局需要用到这里的 title 属性
      icon: 'lock'
    }
  }]
}
