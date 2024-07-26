// 这里是操作 token 的方法

import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token' // 这个 key 可以自定义设置
const timeKey = 'hrsaas-timestamp-key' // 设置一个独一无二的 key

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

// 获取时间戳
export function getTimeStamp() {
  return Cookies.get(timeKey)
}

// 存入时间戳
export function setTimeStamp() {
  Cookies.set(timeKey, Date.now())
}
