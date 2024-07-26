<template>
  <div class="dashboard-container">
    <div class="app-container">
      <el-card>
        <el-tabs>
          <el-tab-pane label="登录账户设置">
            <!-- 登录账户设置 -->
            <el-form ref="form" label-width="120px" :rules="rules" :model="userInfo" style="margin-left: 120px; margin-top:30px">
              <el-form-item label="用户名:" prop="username">
                <el-input v-model="userInfo.username" style="width:300px" />
              </el-form-item>
              <el-form-item label="新密码:" prop="password2">
                <el-input v-model="userInfo.password2" style="width:300px" type="password" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="saveUser">保存</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情">
            <!-- 打印组件 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印个人基本信息">
                <router-link :to="`/employees/print/${userId}?type=personal`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 个人详情 -->
            <!-- vue.js 中内置了一个组件 component 可以是任何组件 -->
            <component :is="userComponent" />
          </el-tab-pane>
          <el-tab-pane label="岗位信息">
            <!-- 打印组件 -->
            <el-row type="flex" justify="end">
              <el-tooltip content="打印岗位信息">
                <router-link :to="`/employees/print/${userId}?type=job`">
                  <i class="el-icon-printer" />
                </router-link>
              </el-tooltip>
            </el-row>
            <!-- 岗位信息 -->
            <component :is="jobComponent" />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>

import { getUserDetailById } from '@/api/user'
import { saveUserDetailById } from '@/api/employees'
import userInfo from '@/views/employees/components/user-info.vue'
import jobInfo from '@/views/employees/components/job-info.vue'

export default {
  name: 'Detail',
  components: {
    userInfo,
    jobInfo
  },
  data() {
    return {
      userComponent: 'userInfo', // 动态组件名
      jobComponent: 'jobInfo',
      userId: this.$route.params.id,
      userInfo: { // 表单绑定回显
        username: '',
        password2: ''
      },
      rules: {
        username: [{ required: true, message: '姓名不能为空', trigger: 'blur' }],
        password2: [{ required: true, message: '密码不能为空', trigger: 'blur' },
          { min: 6, max: 9, message: '密码长度6-9位', trigger: 'blur' }]
      }
    }
  },
  mounted() {
    this.getUserDetailById()
  },
  methods: {
    // 获取用户详情
    async getUserDetailById() {
      this.userInfo = await getUserDetailById(this.userId)
    },
    async saveUser() {
      try {
        await this.$refs.form.validate()
        // 把接口取过来的 password 改为输入框的 password2
        // 这里有三种写法
        await saveUserDetailById({ ...this.userInfo, password: this.userInfo.password2 })
        // this.userInfo.password = this.userInfo.password2
        // const newInfo = Object.assign({}, this.userInfo, { password: this.userInfo.password2 })
        this.$message.success('保存成功')
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style>

</style>
