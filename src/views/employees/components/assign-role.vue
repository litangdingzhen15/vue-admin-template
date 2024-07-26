<template>
  <el-dialog title="分配角色" :visible="showRoleDialog" class="123" @close="btnCancel">
    <!-- 多选框组 -->
    <!-- 当前员工有多少个角色，就勾选多少项 -->
    <el-checkbox-group v-model="roleIds" v-loading="loading">
      <!-- 要循环的选项；总共有多少个角色，就渲染多少个复选框 -->
      <el-checkbox v-for="item in list" :key="item.id" :label="item.id">
        {{ item.name }}
      </el-checkbox>
    </el-checkbox-group>
    <!-- 定义 footer 插槽 -->
    <el-row slot="footer" type="flex" justify="end">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleList } from '@/api/setting'
import { getUserDetailById } from '@/api/user'
import { assignRoles } from '@/api/employees'

export default {
  props: {
    showRoleDialog: {
      type: Boolean,
      default: false
    },
    // 用户的 id，当前要处理的哪个用户
    userId: {
      type: String,
      default: null,
      required: true // 要求必须传 id
    }
  },
  data() {
    return {
      list: [], // 负责存储当前所有的角色 id
      roleIds: [], // 当前员工所拥有的角色 id
      loading: true
    }
  },
  mounted() {
    // 获取所有的角色
    this.getRoleList()
    this.getUserDetailById(this.userId)
  },
  // methods: {
  //   async getRoleList() {
  //     const { rows } = await getRoleList({ page: 1, pagesize: 20 }) // 默认只取 10 条数据，因为角色的数量不会太多
  //     // rows 是要循环的数据
  //     this.list = rows
  //   },
  //   // props 的传值是异步的，这里用父组件 props 传进来的 userid 的话，等页面渲染完了才会接收到
  //   // 让父组件调用
  //   async getUserDetailById(id) {
  //     const { roleIds } = await getUserDetailById(id) // 将用户所拥有的角色赋值给当前用户的对象
  //     this.roleIds = roleIds
  //   },
  //   // 点击确定
  //   async btnOk() {
  //     // 将接口需要的参数一起放在一个对象里，发送过去
  //     await assignRoles({ id: this.userId, roleIds: this.roleIds })
  //     // 关闭弹出层
  //     this.$emit('update:showRoleDialog', false)
  //   },
  //   // 点击取消
  //   btnCancel() {
  //     // 分配角色弹出框消失；roleIds 清空
  //     this.$emit('update:showRoleDialog', false)
  //     this.roleIds = []
  //   }
  // }
  methods: {
    // 获取所有角色
    async getRoleList() {
      const { rows } = await getRoleList({ page: 1, pagesize: 20 })
      this.list = rows
    },
    // 获取当前员工所拥有的角色
    async getUserDetailById(id) {
      const { roleIds } = await getUserDetailById(id)
      this.roleIds = roleIds || []
      this.loading = false
    },
    async btnOk() {
      await assignRoles({ id: this.userId, roleIds: this.roleIds })
      this.$emit('update:showRoleDialog', false)
    },
    // 关闭弹窗
    btnCancel() {
      this.$emit('update:showRoleDialog', false)
    }
  }
}
</script>

<style>

</style>
