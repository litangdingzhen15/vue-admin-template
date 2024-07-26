// 这里放的是对请求信息的二次处理
import axios from 'axios'
import router from '@/router'
import store from '@/store'
// 引入组件弹窗
import { Message } from 'element-ui'

import { getTimeStamp } from './auth'
const TimeOut = 3600 // 定义超时时间

// 创建一个新的 axios , service 接收
const service = axios.create({
  // 这里的根地址会经由反向代理处理，如果是 /api ，会自动转到代理的服务器，并且反向代理只处理开发环境
  baseURL: process.env.VUE_APP_BASE_API
  // timeout: 5000
})

// 添加请求拦截器
service.interceptors.request.use(config => {
  // conig 是请求的配置信息，必须要返回，否则服务器会认为没有携带信息
  // 为所有请求添加 token，每次发送请求时，都会向服务器发送携带 token 的数据
  if (store.getters.token) {
    // 只有在有 token 的情况下，才有必要检查是否超时
    if (IsCheckTimeOut()) {
      // 如果为 true ，代表过期了
      // 清除 token ;跳转到登录页
      store.dispatch('user/logout')
      router.push('/login')
      // 跳出 Promise 执行链
      return Promise.reject(new Error('token超时了'))
    }
    config.headers.Authorization = `Bearer ${store.getters.token}`// 判断 token 有没有值，把获取到的 token 放入携带参数里
    // config.headers.tag = '测试'
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器，里面有两个回调函数，响应到数据就执行第一个，否则执行第二个
service.interceptors.response.use(res => {
  const { data, success, message } = res.data
  // 如果响应的数据 success 为 true（代表账号信息正确）
  if (success) {
    return data // 发送给服务器的所有请求，都经过解构得到了响应回来的 data 对象
  } else {
    // 弹出错误，并跳出 promise 执行链，new 一个错误对象给浏览器
    Message.error(message)
    return Promise.reject(new Error(message))
  }
},
// 没有响应到数据的话
async erro => {
  if (erro?.res?.data?.code === 10002) {
    // 当等于 10002 的时候，表示后端告诉我 token 超时了
    await store.dispatch('user/logout')
    router.push('/login')
  } else {
  // 用弹窗组件弹出错误信息
    Message.error(erro.message)
  }
  // 返回执行错误，跳出当前的 promise 执行链，直接进入 catch
  return Promise.reject(erro)
})

// 超时逻辑：（当前时间 - 缓存中的时间）是否大于 时间差
function IsCheckTimeOut() {
  const currentTime = Date.now() // 当前时间戳
  const timeStamp = getTimeStamp() // 获取缓存在本地的时间戳
  return (currentTime - timeStamp) / 1000 > TimeOut
}

// 默认导出
export default service

// ————————————————————————————————————————————————————————————————————————————————————————————————————————————————
// import axios from 'axios'
// import { MessageBox, Message } from 'element-ui'
// import store from '@/store'
// import { getToken } from '@/utils/auth'

// // create an axios instance
// const service = axios.create({
//   baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
//   // withCredentials: true, // send cookies when cross-domain requests
//   timeout: 5000 // request timeout   设置请求超时时长
// })

// // request interceptor
// // 请求拦截器
// service.interceptors.request.use(
//   config => {
//     // do something before request is sent

//     if (store.getters.token) {
//       // let each request carry token
//       // ['X-Token'] is a custom headers key
//       // please modify it according to the actual situation
//       config.headers['X-Token'] = getToken()
//     }
//     return config
//   },
//   error => {
//     // do something with request error
//     console.log(error) // for debug
//     return Promise.reject(error)
//   }
// )

// // response interceptor
// // 响应拦截器
// service.interceptors.response.use(
//   /**
//    * If you want to get http information such as headers or status
//    * Please return  response => response
//   */

//   /**
//    * Determine the request status by custom code
//    * Here is just an example
//    * You can also judge the status by HTTP Status Code
//    */
//   response => {
//     const res = response.data

//     // if the custom code is not 20000, it is judged as an error.
//     // 20000状态码是自行约定的，如果返回的 code 不是20000，就是为错误
//     if (res.code !== 20000) {
//       Message({
//         message: res.message || 'Error',
//         type: 'error',
//         duration: 5 * 1000
//       })

//       // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
//       //
//       if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
//         // to re-login
//         MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
//           confirmButtonText: 'Re-Login',
//           cancelButtonText: 'Cancel',
//           type: 'warning'
//         }).then(() => {
//           store.dispatch('user/resetToken').then(() => {
//             location.reload()
//           })
//         })
//       }
//       return Promise.reject(new Error(res.message || 'Error'))
//     } else {
//       return res
//     }
//   },
//   error => {
//     console.log('err' + error) // for debug
//     Message({
//       message: error.message,
//       type: 'error',
//       duration: 5 * 1000
//     })
//     return Promise.reject(error)
//   }
// )

// export default service

// const obj = { a: 1, b: 2, c: 3 }
// Object.keys(obj).forEach(key => {
//   console.log(key)
// })
