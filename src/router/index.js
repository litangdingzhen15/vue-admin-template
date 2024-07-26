import Vue from 'vue'
import Router from 'vue-router'

import approvalsRouter from './modules/approvals'
import departmentsRouter from './modules/departments'
import employeesRouter from './modules/employees'
import permissionRouter from './modules/permission'
import attendancesRouter from './modules/attendances'
import salarysRouter from './modules/salarys'
import settingRouter from './modules/setting'
import socialRouter from './modules/social'
import userRouter from './modules/user'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

// 静态路由
export const constantRoutes = [
  {
    path: '/login',
    // 这是路由懒加载的写法，好处：只有当用户访问到 /login 这个页面地址的时候，组件才会被加载，能够节省浏览器性能
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  // 导入 excel 的路由
  {
    path: '/import',
    component: Layout,
    hidden: true, // 不显示在左侧菜单中
    children: [{
      path: '', // 什么都不写表示默认的二级路由
      component: () => import('@/views/import')
    }]
  },
  {
    path: '/echarts',
    component: () => import('@/views/myEcharts/index.vue'),
    hidden: true
  },
  userRouter // 放置一个都可以访问的路由
  // 404 规则必须在路由的最后一条
]

// 定义一个动态路由变量
export const asyncRoutes = [
  approvalsRouter,
  departmentsRouter,
  employeesRouter,
  permissionRouter,
  attendancesRouter,
  salarysRouter,
  settingRouter,
  socialRouter]

const createRouter = () => new Router({
  mode: 'hash', // require service support(如果用的是 / history模式的话，是需要服务端支持的，不然很容易出现 404 问题)
  // base: 'dzy/',
  scrollBehavior: () => ({ y: 0 }), // 表示当你切换路由的时候，可以保证页面滚到顶部
  routes: [...constantRoutes] // 静态路由;动态路由由每个用户权限的不同，跳转前而决定
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
// 重置路由方法
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重新设置路由的可匹配路径
}

export default router
