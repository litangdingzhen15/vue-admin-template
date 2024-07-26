import store from '@/store'

// 做一个混入对象
export default {
  // 混入对象是组件的选项对象
  methods: {
    // 检查权限 要么有 要么没有
    checkPermission(point) {
      // 去用户的信息里面找 points 中有没有 key,如果有,则认为有权限,没有则不能点击
      // store.state.user.userInfo.roles.points
    //   const { userInfo } = store.state.user
    //   if (userInfo.roles && userInfo.roles.points) {
    //     return userInfo.roles.points.some(item => item === key)
    //   }
    //   return false // 如果没进去,说明没权限
    // }
      return store.getters.points.includes(point)
    }
  }
}
