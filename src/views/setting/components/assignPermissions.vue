<template>
  <div>
    <el-dialog title="分配权限" :visible="showDialog" @close="onCancel" @closed="a">
      <!-- 权限用树组件 -->
      <!-- check-strictly 父子节点是否互相关联 -->
      <!-- default-expand-all 是否默认展开所有节点 -->
      <!-- show-checkbox 节点是否可被选择 -->
      <!-- node-key 每个节点绑定的数据源的唯一属性 -->
      <!-- default-checked-keys 默认勾选的节点的 key 的数组 -->
      <!-- check-on-click-node 点击节点时选中复选框 -->
      <el-tree
        ref="tree"
        :data="permData"
        :props="defaultProps"
        :default-expand-all="true"
        :show-checkbox="true"
        :check-strictly="true"
        node-key="id"
        :default-checked-keys="selectCheck"
        :check-on-click-node="true"
      />

      <!-- 确定 取消 -->
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
          <el-button size="small" @click="onCancel">取消</el-button>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { list2Tree } from '@/utils/index'
import { assignPerm, getRoleDetail } from '@/api/setting'
import { getPermissionList } from '@/api/permisson'

export default {
  name: 'AssignPermissions',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      permData: [], // 接收所有权限点数据 树形结构
      roleId: null, // 当前点击的角色的id
      defaultProps: { // 定义树形组件显示字段的名称，和 子属性 的名称
        label: 'name'
      },
      selectCheck: [] // 当前角色所拥有的权限
    }
  },
  methods: {
    // 清空数据
    empty() {
      this.selectCheck = []
      this.permData = []
      this.roleId = null
    },
    // 父组件调用子组件的 获取权限列表方法
    async getPermissionList(id) {
      // 转换树形结构
      this.permData = list2Tree(await getPermissionList(), '0')
      // 拿到当前点击角色拥有的权限
      const { permIds } = await getRoleDetail(id)
      this.selectCheck = permIds
      this.roleId = id
    },
    // 点击确定
    async btnOk() {
      // getCheckedKeys 是树形组件的方法，能拿到所有选中的 node-key，也就是当前勾选的权限点
      await assignPerm({ id: this.roleId, permIds: this.$refs.tree.getCheckedKeys() })
      this.onCancel()
    },
    // 关闭弹层
    async onCancel() {
      await this.$emit('update:showDialog', false)
    },
    a() {
      this.empty()
    }
  }
}
</script>

<style>

</style>
