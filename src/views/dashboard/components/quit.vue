<template>
  <el-dialog :visible="showDialog" title="离职申请" @close="onCancel">
    <el-form ref="ruleForm" label-width="110px" status-icon :rules="rules" :model="ruleForm">
      <!-- 离职表单 -->
      <el-form-item label="离职时间" prop="exceptTime">
        <el-date-picker
          v-model="ruleForm.exceptTime"
          type="datetime"
          placeholder="选择日期时间"
          value-format="yyyy-MM-dd HH:mm:ss"
        />
      </el-form-item>

      <el-form-item label="离职原因" prop="reason">
        <el-input
          v-model="ruleForm.reason"
          style="width: 70%;"
          type="textarea"
          :autosize="{ minRows: 3, maxRows: 8}"
          placeholder="请输入内容"
        />
      </el-form-item>
    </el-form>

    <el-row slot="footer" type="flex" justify="center">
      <el-col :span="6">
        <el-button size="small" type="primary" @click="onOk">确定</el-button>
        <el-button size="small" @click="onCancel">取消</el-button>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import { startProcess } from '@/api/approvals'

export default {
  name: 'Quit',
  props: {
    showDialog: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      ruleForm: {
        exceptTime: '', // 离职时间
        reason: '', // 离职原因
        processKey: 'process_dimission', // 特定的审批
        processName: '离职'
      },
      rules: {
        exceptTime: [{ required: true, message: '离职时间不能为空', trigger: 'blur' }],
        reason: [{ required: true, message: '离职原因不能为空', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async onOk() {
      try {
        const data = {
          userId: this.$store.state.user.userInfo.id,
          username: this.$store.state.user.userInfo.username
        }
        console.log(data)
        await this.$refs.ruleForm.validate()
        await startProcess({ ...this.ruleForm, ...data })
        this.$message.success('操作成功')
        this.onCancel()
      } catch (error) {
        //
      }
    },
    onCancel() {
      this.$emit('update:showDialog', false)
      this.$refs.ruleForm.resetFields()
      this.ruleForm = {
        exceptTime: '', // 离职时间
        reason: '', // 离职原因
        processKey: 'process_dimission', // 特定的审批
        processName: '离职'
      }
    }
  }
}
</script>

<style>

</style>
