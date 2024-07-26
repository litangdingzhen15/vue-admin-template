<template>
  <!-- 放置弹层组件 -->
  <el-dialog :title="`${showTitle}部门`" :visible="isShow" @close="onclose">
    <!-- 表单数据 -->
    <el-form ref="deptFormRef" label-width="120px" :model="deptForm" :rules="rules">
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="deptForm.name" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门编码" prop="code">
        <el-input v-model="deptForm.code" style="width:80%" placeholder="1-50个字符" />
      </el-form-item>
      <el-form-item label="部门负责人" prop="manager">
        <el-select v-model="deptForm.manager" style="width:80%" placeholder="请选择" @focus="onfocus">
          <!-- 根据员工简单列表数据决定有多少条选项 -->
          <el-option v-for="item in simpleList" :key="item.id" :label="item.username" :value="item.username" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门介绍" prop="introduce">
        <el-input v-model="deptForm.introduce" style="width:80%" placeholder="1-300个字符" type="textarea" :rows="3" />
      </el-form-item>
    </el-form>
    <!-- 确定和消息 -->
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" @click="onclose">取消</el-button>
        <el-button size="small" type="primary" @click="onConfirm">确定</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addDepartments, getDepartments, getSimplelist, getDepartDetail, updateDepartments } from '@/api/departments'
export default {
  props: {
    isShow: Boolean,
    deptId: { // 点击的部门的 id
      type: [String, Number],
      default: ''
    }
  },
  data() {
    // 检查部门名称是否重复
    const checkNameRepeat = async(rule, value, callback) => {
      // value 是输入框输入的值，要去和同级部门下的部门去比较，有没有相同的，有相同的不能过；不相同就可以过
      const { depts } = await getDepartments() // 拿到所有的部门
      let isRepeat = false
      // 校验编辑模式
      if (this.deptForm.id) {
        // 找出点击部门的所有同级部门，再排除掉自己
        isRepeat = depts.filter(item => item.pid === this.deptForm.pid && this.deptForm.id !== item.id).some(item => item.name === value)
      } else {
        // 没有 id 就是新增模式
        // 找到当前点击部门的所有子部门，看看里面有没有和输入框的名字重名的
        isRepeat = depts.filter(item => item.pid === this.deptForm.id).some(item => item.name === value)
      }

      // 如果 isRepeat 为 true，表示找到了一样的名字
      isRepeat ? callback(new Error(`同级部门下已经存在${value}部门了`)) : callback()
    }
    // 检查部门编码是否重复
    const checkDeptCode = async(rule, value, callback) => {
      const { depts } = await getDepartments() // 拿到所有的部门
      let isRepeat = false
      // 修改编码时候的校验
      if (this.deptForm.id) {
        // 排除掉自己
        isRepeat = depts.filter(item => item.id !== this.deptForm.id).some(item => item.code === value)
      } else {
        // 看看所有部门的编码有没有和输入的编码重复的
        isRepeat = depts.some(item => item.code === value)
      }

      isRepeat ? callback(new Error(`公司已经存在${value}编码了`)) : callback()
    }
    return {
      deptForm: {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      },
      simpleList: [], // 接收获取的员工简单列表的数据
      rules: {
        name: [{ required: true, message: '部门名称不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门名称长度为1~50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkNameRepeat }],
        code: [{ required: true, message: '部门编码不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门编码长度为1~50个字符', trigger: 'blur' },
          { trigger: 'blur', validator: checkDeptCode }],
        manager: [{ required: true, message: '部门负责人不能为空', trigger: 'blur' }],
        introduce: [{ required: true, message: '部门介绍不能为空', trigger: 'blur' },
          { min: 1, max: 50, message: '部门介绍长度为1~300个字符', trigger: 'blur' }],
        pid: []
      }
    }
  },
  computed: {
    // 展示对话框标题
    showTitle() {
      return this.deptForm.id ? '编辑' : '新增'
    }
  },
  methods: {
    // 获取员工简单列表的数据
    async onfocus() {
      this.simpleList = await getSimplelist()
    },
    async onConfirm() {
      // 添加新部门
      try {
        // 执行表单的验证
        await this.$refs.deptFormRef.validate()
        // deptForm 里面有 id 吗，有的话说明正在进行编辑功能
        if (this.deptForm.id) {
          await updateDepartments(this.deptForm)
          this.$message.success('部门编辑成功')
        } else {
          // 指定新加的部门的上级部门
          this.deptForm.pid = this.deptId
          // 调用新增部门的 axios
          await addDepartments(this.deptForm)
          // 弹出组件弹框
          this.$message.success('部门新增成功')
        }
        this.onclose()
        // 关闭对话框，刷新页面
        this.$emit('update:isShow', false)
        this.$emit('updataList')
      } catch (error) {
        console.log('验证不通过')
      }
    },
    // 摘自文档：before-close 仅当用户通过点击关闭图标或遮罩关闭 Dialog 时起效。如果你在 footer 具名 slot 里添加了用于关闭 Dialog 的按钮，那么可以在按钮的点击回调函数里加入 before-close 的相关逻辑。
    onclose() {
      // 每次关闭对话框将对象重新赋值为空
      this.deptForm = {
        name: '',
        code: '',
        manager: '',
        introduce: '',
        pid: ''
      }
      this.$emit('update:isShow', false)
      // 组件自带的方法：重置整个表单并移除校验效果
      this.$refs.deptFormRef.resetFields()
    },
    // 获取详情方法
    async getDepartDetail(id) {
      // 每次点击编辑按钮后，deptform 就多了 id
      this.deptForm = await getDepartDetail(id)
    }
  }
}
</script>

<style>

</style>
