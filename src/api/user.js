// 这里放的是 axios 的请求!!!
// 需要和请求拦截器配合！！！
// 注意，axios 已经设定了请求的根目录 '/api' 以及超时时间
import Request from '@/utils/request'

// 获取登录信息的接口
export function login(data) {
  // 返回一个由 Request 包装过的 promise 对象
  return Request({
    method: 'POST',
    url: '/sys/login',
    data
  })
}

// 获取用户资料的接口
export function getUserInfo() {
  return Request({
    url: '/sys/profile',
    method: 'POST'
  })
}

// 根据用户 id 获取用户的详情
export function getUserDetailById(id) {
  return Request({
    url: `/sys/user/${id}`,
    method: 'GET'
  })
}

export function logout() {

}
