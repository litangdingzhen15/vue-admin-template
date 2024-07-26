// 专门处理权限路由的模块
import { constantRoutes, asyncRoutes } from '@/router/index'
const state = {
  // 一开始只有静态路由的权限
  routes: constantRoutes // 路由表 表示 当前用户能访问的所有路由
}
const mutations = {
  // 定义修改 routes 的 mutations
  // 载荷认为是登录成功需要添加的路由
  setRoutes(state, newRoutes) {
    // 每次都把静态路由和新的动态路由合并
    state.routes = [...constantRoutes, ...newRoutes]
  }
}

const actions = {
  // 筛选权限路由
  // 第二个参数为当前用户的所拥有的菜单权限
  // filterRoutes(context, menus) {
  //   const routes = []
  //   // 筛选出 动态路由中和 menus 中能够对上的路由
  //   menus.forEach(key => {
  //     // key 就是标识
  //     // asyncRoutes 找 有没有对象中的 name 属性等于 key，如果找不到就没权限，如果找到了要筛选出来
  //     routes.push(...asyncRoutes.filter(item => item.name === key)) // 得到一个数组或者空数组
  //     // 得到的 routes 是所有模块中满足权限要求的路由数组
  //     // 这个 routes 就是用户所拥有的动态路由权限
  //   })
  //   context.commit('setRoutes', routes) // 将动态路由提交给 mutations
  filterRoutes({ commit }, menus) {
    const newRoutes = asyncRoutes.filter(item => menus.includes(item.name))
    // item:{name:'setting',path:'xxx'} {name:'department',path:'xxx'}
    // menus:['setting','department']
    // menus 表示当前用户应该只能访问哪几个路由；找出 menus 里面和所有动态路由相同的权限点，代表着当前用户能访问的路由
    // 将筛选出来的路由赋值给 state.routes
    commit('setRoutes', newRoutes)
    // 将每个人的权限路由 return
    return newRoutes
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
