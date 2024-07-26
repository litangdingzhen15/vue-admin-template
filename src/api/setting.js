import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}

// 获取公司 id
export function getCompanyInfo(id) {
  return request({
    url: `/company/${id}`
  })
}

// 删除角色接口
export function delRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'DELETE'
  })
}

// 读取角色详情
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}

// 更新角色详情
export function updateRoleDetail(data) {
  return request({
    url: `/sys/role/${data.id}`,
    method: 'put',
    data
  })
}

// 新增角色
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}

// 给角色分配权限
export function assignPerm(data) {
  return request({
    url: '/sys/role/assignPrem',
    method: 'put',
    data
  })
}
