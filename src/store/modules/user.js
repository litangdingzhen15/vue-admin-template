// 这里放 vuex 内单独的模块属性、方法!!!
// 引入发送 login axios请求的方法
import { getUserInfo, login, getUserDetailById } from '@/api/user'
// 引入封装好的操作 token 的方法
import { getToken, setToken, removeToken, setTimeStamp } from '@/utils/auth'

import { resetRouter } from '@/router/index'

const state = {
  token: getToken(), // token 的初始化值,应该先从缓存中读取
  userInfo: {}
}

const mutations = {
  // 定义修改 token 的方法
  setToken(state, token) {
  // 先给 token 重新赋值
    state.token = token
    // 判断传进来的 token 有没有值（登录的账号密码正确与否）,有的话存到本地,否则移除本地的 token
    // if (token) {
    //   setToken(token)
    // } else {
    //   removeToken()
    // }
    // 改用三元 ↓
    token ? setToken(token) : removeToken()
  },
  // 获取用户信息的方法
  setUserInfo(state, result) {
    state.userInfo = result // 这样是响应式
  },
  removeUserInfo(state) {
    state.userInfo = {}
  }
}

// 定义异步发送 axios 请求的方法
const actions = {
  // 解构 context 上下文里的 commit 提交操作方法
  async userLogin({ commit }, data) {
    try {
      // 响应回来的数据会先经过拦截器处理，拦截器已经处理并 return 了响应数据中的 token 了，这里直接接收即可
      const token = await login(data)
      // 派发操作本地 token 方法
      commit('setToken', token)
      setTimeStamp() // 登录时候在本地存入时间戳
      return true
    } catch (error) { // 如果请求失败的话（根本没获取到数据，至于数据返回的内容是什么暂时先不管，由响应拦截器处理）
      commit('setToken', null)
      return false
    }
  },
  async getUserInfo({ commit }) {
    const result = await getUserInfo() // 这里的 result 是经由响应拦截器解构出来的需要的 data 数据
    // 获取用户的详情  用户的详情数据
    const baseInfo = await getUserDetailById(result.userId) // 先获取用户信息，再获取用户详情，所以用 await 指定顺序
    commit('setUserInfo', { ...result, ...baseInfo }) // 给userinfo 赋值合并后的数据
    return result
  },
  // 登出操作
  logout({ commit }) {
    // 清空 token ；清空 userinfo
    commit('setToken')
    commit('setUserInfo', {})
    // 重置路由
    resetRouter()
    // 设置权限模块下的路由为初始状态
    // 调用同级 permission 模块里的设置路由方法，将动态路由清空，只保留静态路由
    // 同级模块调用同级模块，需要 root: true
    commit('permission/setRoutes', [], { root: true })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}

// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken } from '@/utils/auth'
// import { resetRouter } from '@/router'

// const getDefaultState = () => {
//   return {
//     token: getToken(),
//     name: '',
//     avatar: ''
//   }
// }

// const state = getDefaultState()

// const mutations = {
//   RESET_STATE: (state) => {
//     Object.assign(state, getDefaultState())
//   },
//   SET_TOKEN: (state, token) => {
//     state.token = token
//   },
//   SET_NAME: (state, name) => {
//     state.name = name
//   },
//   SET_AVATAR: (state, avatar) => {
//     state.avatar = avatar
//   }
// }

// const actions = {
//   // user login
//   login({ commit }, userInfo) {
//     const { username, password } = userInfo
//     return new Promise((resolve, reject) => {
//       login({ username: username.trim(), password: password }).then(response => {
//         const { data } = response
//         commit('SET_TOKEN', data.token)
//         setToken(data.token)
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // get user info
//   getInfo({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       getInfo(state.token).then(response => {
//         const { data } = response

//         if (!data) {
//           return reject('Verification failed, please Login again.')
//         }

//         const { name, avatar } = data

//         commit('SET_NAME', name)
//         commit('SET_AVATAR', avatar)
//         resolve(data)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // user logout
//   logout({ commit, state }) {
//     return new Promise((resolve, reject) => {
//       logout(state.token).then(() => {
//         removeToken() // must remove  token  first
//         resetRouter()
//         commit('RESET_STATE')
//         resolve()
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

//   // remove token
//   resetToken({ commit }) {
//     return new Promise(resolve => {
//       removeToken() // must remove  token  first
//       commit('RESET_STATE')
//       resolve()
//     })
//   }
// }

// export default {
//   namespaced: true,
//   state,
//   mutations,
//   actions
// }

