// 这里放的是对子模块的快捷访问合集
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  // avatar: state => state.user.avatar,
  name: state => state.user.userInfo.username,
  userId: state => state.user.userInfo.userId,
  staffPhoto: state => state.user.userInfo.staffPhoto, // 建立用户头像的映射
  companyId: state => state.user.userInfo.companyId, // 公司 id
  routes: state => state.permission.routes, // 建立权限模块下的快捷访问
  menus: state => state.user.userInfo.roles.menus, // 快捷访问 menus
  points: state => state.user.userInfo.roles.points
}
export default getters
