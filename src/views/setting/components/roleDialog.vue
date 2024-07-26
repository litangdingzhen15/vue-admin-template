<template>
  <el-dialog :title="`${getTitle()}角色`" :visible="isShow" @close="btnCancel">
    <el-form ref="rule" :model="roleFrom" label-width="120px" :rules="rules">
      <el-form-item label="角色名称" prop="name">
        <el-input v-model="roleFrom.name" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述">
        <el-input v-model="roleFrom.description" placeholder="请输入角色描述" />
      </el-form-item>
    </el-form>
    <!-- 底部 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="btnCancel">取消</el-button>
        <el-button size="small" type="primary" @click="btnOK">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { getRoleDetail, updateRoleDetail, addRole } from '@/api/setting'
export default {
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      roleFrom: { // 对话框输入的内容
        name: '',
        description: ''
      },
      rules: {
        name: [{ required: true, message: '角色名称不能为空', trigger: 'blur' },
          { min: 2, max: 10, message: '角色名称须在2~10位之间', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 关闭对话框事件
    btnCancel() {
      this.$emit('update:is-show', false)
      // 清空对象；重置表单及验证规则
      this.roleFrom = { name: '',
        description: '' }
      this.$refs.rule.resetFields()
    },
    async editRole(id) {
      this.roleFrom = await getRoleDetail(id)
      this.$emit('update:is-show', true)
    },
    // 提交表单
    async btnOK() {
      try {
        await this.$refs.rule.validate()
        if (this.roleFrom.id) { // 编辑模式
          await updateRoleDetail(this.roleFrom)
        } else { // 新增模式
          await addRole(this.roleFrom)
        }
        this.$message.success(`${this.roleFrom.id ? '编辑' : '新增'}角色成功`)
        this.$emit('getRoleList') // 通知父组件刷新页面
        this.btnCancel() // 调用关闭对话框函数
      } catch (error) {
        this.$message.success('出错了')
      }
    },
    getTitle() {
      return this.roleFrom.id ? '编辑' : '新增'
    }
    // 点击编辑事件
    // async editRole(id) {
    //   this.roleFrom = await getRoleDetail(id)
    //   this.isShow = true
    // },
    // 提交编辑功能
    // async btnOK() {
    //   try {
    //     // 执行表单校验
    //     await this.$refs.rule.validate()
    //     // 每次点击编辑，会得到一个返回的 id，有 id 说明是编辑模式，没有就是新增模式
    //     if (this.roleFrom.id) {
    //       await updateRoleDetail(this.roleFrom)
    //     } else {
    //       await addRole(this.roleFrom)
    //     }
    //     // 刷新页面
    //     this.getRoleList()
    //     // 组件弹窗
    //     this.$message.success('操作成功')
    //     this.isShow = false
    //     // // 数据置空
    //     // this.roleFrom = { name: '',
    //     //   description: '' }
    //     // // 移除表单数据
    //     // this.$refs.rule.resetFields()
    //   } catch (error) {
    //     // console.log(error)
    //   }
    // }
  }
}
</script>

<style>

</style>
