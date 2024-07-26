<template>
  <div class="dashboard-container">
    <div class="app-container">
      <!-- 靠右的按钮 -->
      <page-tools>
        <template v-slot:right>
          <el-button type="primary" size="small" @click="addPermission(1,0)">添加权限</el-button>
        </template>
      </page-tools>
      <!-- 表格 -->
      <!-- 指定 id 为唯一属性的标识 -->
      <el-table border="" :data="list" row-key="id" default-expand-all>
        <el-table-column label="名称" prop="name" />
        <el-table-column align="center" label="标识" prop="code" />
        <el-table-column align="center" label="描述" prop="description" />
        <el-table-column align="center" label="操作">
          <template v-slot="{row}">
            <!-- 添加按钮只在 一级权限 的层级显示，当 type===1 时，才显示添加按钮 -->
            <el-button v-if="row.type === 1" type="text" @click="addPermission(2,row.id)">添加</el-button>
            <el-button type="text" @click="editPermission(row.id)">编辑</el-button>
            <el-button type="text" @click="delPermission(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <permissionDialog ref="permissionDialog" :show-dialog.sync="showDialog" />
    <!-- 新增编辑弹层 -->
    <!-- <el-dialog :visible="showDialog" :title="title" @close="btnCancel"> -->
    <!-- 表单 -->
    <!-- <el-form ref="perForm" label-width="120px" :rules="rules" :model="formData">
        <el-form-item label="权限名称" prop="name">
          <el-input v-model="formData.name" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限标识" prop="code">
          <el-input v-model="formData.code" style="width:90%" />
        </el-form-item>
        <el-form-item label="权限描述">
          <el-input v-model="formData.description" style="width:90%" />
        </el-form-item>
        <el-form-item label="开启"> -->
    <!-- 组件设定：active 为激活，inactive 为不激活，绑定一个值即可 -->
    <!-- <el-switch
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
    </el-dialog> -->
  </div>
</template>

<script>
import { getPermissionList, delPermission } from '@/api/permisson'
import { list2Tree } from '@/utils/index'

export default {
  name: 'Permission',
  components: {
    permissionDialog: () => import('./components/permissionDialog.vue')
  },
  data() {
    return {
      list: [],
      showDialog: false
    }
  },
  mounted() {
    this.getPermissionList()
  },
  methods: {
    // 获取所有权限点,转换树形结构数据
    async getPermissionList() {
      this.list = list2Tree(await getPermissionList(), '0')
    },
    // 删除权限点
    async delPermission(id) {
      try {
        await this.$confirm('确认要删除该权限点吗')
        await delPermission(id)
        await this.getPermissionList()
      } catch (error) {
        //
      }
    },
    // 点击添加
    async addPermission(type, pid) {
      // 访问权的 type = 1 按钮操作权的 type = 2
      // pid 表示当前数据的父节点的标识
      await this.$refs.permissionDialog.getData(type, pid)
      this.showDialog = true
    },
    // 点击编辑
    async editPermission(id) {
      // 回显数据到表单
      await this.$refs.permissionDialog.getPermissionDetail(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
