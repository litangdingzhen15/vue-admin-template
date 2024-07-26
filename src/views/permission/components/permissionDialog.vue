<template>
  <!-- 新增编辑弹层 -->
  <el-dialog :visible="showDialog" :title="title" @close="btnCancel">
    <!-- 表单 -->
    <el-form ref="perForm" label-width="120px" :rules="rules" :model="formData">
      <el-form-item label="权限名称" prop="name">
        <el-input v-model="formData.name" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限标识" prop="code">
        <el-input v-model="formData.code" style="width:90%" />
      </el-form-item>
      <el-form-item label="权限描述">
        <el-input v-model="formData.description" style="width:90%" />
      </el-form-item>
      <el-form-item label="开启">
        <!-- 组件设定：active 为激活，inactive 为不激活，绑定一个值即可 -->
        <el-switch
          v-model="formData.enVisible"
          style="width:90%"
          active-value="1"
          inactive-value="0"
        />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button type="primary" size="small" @click="btnOk">确定</el-button>
        <el-button size="small" @click="btnCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { addPermission, updatePermission, getPermissionDetail } from '@/api/permisson'

export default {
  name: 'PermissionDialog',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: { // 表单绑定数据
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      },
      rules: {
        name: [{ required: true, message: '权限名称不能为空', trigger: 'blur' }],
        code: [{ required: true, message: '权限标识不能为空', trigger: 'blur' }]
      }
    }
  },
  computed: {
    title() {
      return this.formData.id ? '编辑' : '新增'
    }
  },
  methods: {
    getData(type, pid) {
      this.formData.type = type
      this.formData.pid = pid
    },
    // 获取当前权限点详情
    async getPermissionDetail(id) {
      this.formData = await getPermissionDetail(id)
    },
    // 点击确定
    async btnOk() {
      try {
        await this.$refs.perForm.validate()
        // 调用编辑接口返回的数据有 id 属性，判断 formData 有无 id 可区分当前是编辑还是添加
        this.formData.id ? await updatePermission(this.formData) : await addPermission(this.formData)
        // 提示；刷新；关闭
        this.$message.success('操作成功')
        this.btnCancel()
        this.$parent.getPermissionList()
      } catch (error) {
        //
      }
    },
    // 关闭弹窗；重置数据
    btnCancel() {
      this.$emit('update:showDialog', false)
      this.formData = {
        name: '', // 名称
        code: '', // 标识
        description: '', // 描述
        type: '', // 类型 该类型 不需要显示 因为点击添加的时候已经知道类型了
        pid: '', // 因为做的是树 需要知道添加到哪个节点下了
        enVisible: '0' // 开启
      }
      this.$refs.perForm.resetFields()
    }
  }
}
</script>

<style>

</style>
