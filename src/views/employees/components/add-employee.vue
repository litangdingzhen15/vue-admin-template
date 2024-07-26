<template>
  <el-dialog :visible="isShow" title="新增员工" @close="btnCancel">
    <el-form ref="form" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="姓名" prop="username">
        <el-input v-model="formData.username" style="width:50%" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机" prop="mobile">
        <el-input v-model="formData.mobile" style="width:50%" placeholder="请输入手机" />
      </el-form-item>
      <el-form-item label="入职时间" prop="timeOfEntry">
        <el-date-picker v-model="formData.timeOfEntry" style="width:50%" placeholder="请选择入职时间" />
      </el-form-item>
      <el-form-item label="聘用形式" prop="formOfEmployment">
        <el-select v-model="formData.formOfEmployment" style="width:50%" placeholder="请选择">
          <el-option v-for="item in employees" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="工号" prop="workNumber">
        <el-input v-model="formData.workNumber" style="width:50%" placeholder="请输入工号" />
      </el-form-item>
      <el-form-item label="部门" prop="departmentName">
        <!-- <el-input v-model="formData.departmentName" style="width:50%" placeholder="请选择部门" @focus="getDepartments" /> -->
        <!-- 树形组件 -->
        <!-- <el-tree v-if="showTree" v-loading="Loading" :data="treeData" :props="{label:'name'}" :default-expand-all="true" @node-click="selectNode" /> -->
        <el-cascader
          v-model="deptName"
          :options="depts"
          placeholder="请选择部门"
          :props="{label:'name',value:'name',checkStrictly:true}"
          @change="handleChange"
        />
      </el-form-item>
      <el-form-item label="转正时间" prop="correctionTime">
        <el-date-picker v-model="formData.correctionTime" style="width:50%" placeholder="请选择转正时间" />
      </el-form-item>
    </el-form>
    <!-- footer插槽 -->
    <template v-slot:footer>
      <el-row type="flex" justify="center">
        <el-col :span="6">
          <el-button size="small" @click="btnCancel">取消</el-button>
          <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        </el-col>
      </el-row>
    </template>
  </el-dialog>
</template>

<script>

import { addEmployee } from '@/api/employees'
import { getDepartments } from '@/api/departments'
import { list2Tree } from '@/utils/index' // 转换树形结构模块
import employees from '@/api/constant/employees'

export default {
  name: 'Addemployee',
  props: {
    isShow: {
      default: false,
      type: Boolean
    }
  },
  data() {
    return {
      formData: { // 表单绑定数据
        username: '', // 姓名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门名称
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      },
      employees: employees.hireType,
      rules: {
        username: [{ required: true, message: '用户姓名不能为空', trigger: 'blur' }, {
          min: 1, max: 4, message: '用户姓名为1-4位'
        }],
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, {
          // 正则表达式，满足才能通过
          pattern: /^1[3-9]\d{9}$/, message: '手机号格式不正确', trigger: 'blur'
        }],
        formOfEmployment: [{ required: true, message: '聘用形式不能为空', trigger: 'blur' }],
        workNumber: [{ required: true, message: '工号不能为空', trigger: 'blur' }],
        departmentName: [{ required: true, message: '部门不能为空', trigger: 'change' }],
        timeOfEntry: [{ required: true, message: '入职时间', trigger: 'blur' }]
      },
      depts: [], // 接收树形结构数组
      deptName: []
      // Loading: false // 加载动画
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    btnCancel() {
      this.$emit('update:isShow', false)
      this.formData = { // 表单绑定数据
        username: '', // 姓名
        mobile: '', // 手机号
        formOfEmployment: '', // 聘用形式
        workNumber: '', // 工号
        departmentName: '', // 部门名称
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间
      }
      this.$refs.form.resetFields()
      this.deptName = []
    },
    // 获取部门数据
    async getDepartments() {
      const { depts } = await getDepartments()
      // depts 是一个数组，需要转换成树形结构
      this.depts = await list2Tree(depts, '')
    },
    // 级联组件点击事件
    handleChange(value) {
      // departmentName 赋值为点击的 value
      this.formData.departmentName = value[value.length - 1]
    },
    // 选择部门列表赋值
    // selectNode(node) {
    //   this.formData.departmentName = node.name
    //   this.showTree = false
    // },
    // 提交对话框
    async btnOk() {
      try {
        // 验证表单
        await this.$refs.form.validate()
        // 调用新增接口
        await addEmployee(this.formData)
        // 组件弹窗
        this.$message.success('新增成功')
        // 调用关闭对话框方法
        this.btnCancel()
        // 调用父组件刷新页面
        this.$emit('getEmployeeList')
        // this.$parent.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
