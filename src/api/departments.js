// 部门相关的请求
import Request from '@/utils/request'

// 获取组织架构的信息
export function getDepartments() {
  return Request({
    method: 'GET',
    url: '/company/department'
  })
}

// 删除组织架构的部门
export function delDepartments(id) {
  return Request({
    url: `/company/department/${id}`,
    method: 'DELETE' // 接口满足 restful 规范
    // 同样的地址 不同的方法 执行不同的业务
    // delete 删除业务
    // get 获取业务
    // post 新增或者添加业务
    // put 修改业务
  })
}

// 新增部门
export function addDepartments(data) {
  return Request({
    url: '/company/department', // restful 接口规范
    method: 'POST',
    data
  })
}

// 获取员工简单列表
export function getSimplelist() {
  return Request({
    url: '/sys/user/simple'
  })
}

// 获取某个部门的详情
export function getDepartDetail(id) {
  return Request({
    url: `/company/department/${id}`,
    method: 'GET'
  })
}

// 编辑部门信息的接口
export function updateDepartments(data) {
  return Request({
    method: 'PUT',
    url: `/company/department/${data.id}`,
    data
  })
}
