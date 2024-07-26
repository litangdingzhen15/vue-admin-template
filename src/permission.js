// 这里放的是路由守卫

import router from '@/router/index'
// 引入 store 实例，和组件中的 this.$store 是一回事
import store from './store'
import NProgress from 'nprogress' // 引入一份进度条插件
import 'nprogress/nprogress.css' // 引入进度条样式

// 路由前置守卫，初始化时执行，每次路由切换时执行
// next 是前置守卫必须执行的钩子函数！！！！！！！！！！
// next() 放过
// next(false) 跳转终止
// next(地址) 跳转到某个地址

// 设定不受 token 权限控制的白名单（有没有 token 都能访问）
const whiteList = ['/login', '/404']

router.beforeEach(async(to, from, next) => {
  // 路由守卫一开始打开进度条
  NProgress.start()
  // 看看有没有 token
  const token = store.getters.token
  // 有 token 的情况下
  if (token) {
    // 如果去往的是登录页（有 token 代表已登录了，既然已登录就不要再去登录页了）
    if (to.path === '/login') {
      // this.$router.push('/')
      // 原来在组件里用的 this.$router.push 里面的 this 指向的是当前组件.$router
      // js 文件里的 this 指向 undefined ,不能在 js 文件里面使用 this.$router
      next('/') // 直接跳到主页
    } else { // 去往的是其他页面
      if (!store.getters.userId) { // vuex 里的数据每刷新一次页面都会重新获取一次
        await store.dispatch('user/getUserInfo') // 获取用户资料
        const routes = await store.dispatch('permission/filterRoutes', store.getters.menus) // 筛选得到当前用户可用的动态路由，接收 return 出来的权限路由

        // 已经取到了用户本身拥有的权限（使用 router 对象身上的 addRoutes 方法，将静态路由与每个人的动态路由合并）
        router.addRoutes([...routes, { path: '*', redirect: '/404', hidden: true }])
        next(to.path)
      } else {
        next()
      }
    }
  } else { // 没有token 的情况下
    // 再看看去往的页面属于白名单列表吗
    // 如果是在白名单列表中,直接放行即可
    // 否则就要去登录页
    if (whiteList.includes(to.path)) { // includes 查询字符串是否包含 xxx 的方法
      next()
    } else { // 没有 token 还想去其他页面是不可能的，强制转去login
      next('/login')
    }
  }
  NProgress.done() // 手动强制关闭一次  为了解决 手动切换地址时  进度条的不关闭的问题
})

// 路由后置守卫，初始化时执行，每次路由切换后执行
router.afterEach(() => {
  NProgress.done()
})
// import router from './router'
// import store from './store'
// import { Message } from 'element-ui'
// import NProgress from 'nprogress' // progress bar
// import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

// const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)

//   // determine whether the user has logged in
//   const hasToken = getToken()

//   if (hasToken) {
//     if (to.path === '/login') {
//       // if is logged in, redirect to the home page
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       const hasGetUserInfo = store.getters.name
//       if (hasGetUserInfo) {
//         next()
//       } else {
//         try {
//           // get user info
//           await store.dispatch('user/getInfo')

//           next()
//         } catch (error) {
//           // remove token and go to login page to re-login
//           await store.dispatch('user/resetToken')
//           Message.error(error || 'Has Error')
//           next(`/login?redirect=${to.path}`)
//           NProgress.done()
//         }
//       }
//     }
//   } else {
//     /* has no token*/

//     if (whiteList.indexOf(to.path) !== -1) {
//       // in the free login whitelist, go directly
//       next()
//     } else {
//       // other pages that do not have permission to access are redirected to the login page.
//       next(`/login?redirect=${to.path}`)
//       NProgress.done()
//     }
//   }
// })

// router.afterEach(() => {
//   // finish progress bar
//   NProgress.done()
// })
