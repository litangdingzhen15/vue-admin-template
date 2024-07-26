<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 放置内容 -->
      <el-card>
        <el-tabs>
          <el-tab-pane label="角色管理">
            <!-- 左侧内容 -->
            <el-row style="height:60px">
              <el-button icon="el-icon-plus" size="small" type="primary" @click="isShow = true">
                新增角色
              </el-button>
            </el-row>
            <!-- 表格 -->
            <el-table border="" :data="list">
              <el-table-column align="center" type="index" label="序号" width="120" />
              <el-table-column align="center" prop="name" label="角色名称" width="240" />
              <el-table-column align="center" prop="description" label="描述" />
              <el-table-column v-slot="{row}" align="center" label="操作">
                <el-button size="small" type="success" icon="el-icon-lock" @click="assign(row.id)">分配权限</el-button>
                <el-button size="small" type="primary" icon="el-icon-edit-outline" @click="editRole(row.id)">编辑</el-button>
                <el-button size="small" type="danger" icon="el-icon-delete" @click="onDelRole(row.id)">删除</el-button>
              </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-row type="flex" justify="center" align="middle" style="height: 60px">
              <!-- 分页组件 -->
              <!-- size-change 和 current-change，来处理页码大小和当前页变动时候触发的事件 -->
              <!-- page-sizes 定义当前页面有多少个页数显示可以选择 -->
              <!-- page-size 表示每页显示多少条 -->
              <!-- total 表示总数 -->
              <!-- current-change 表示当前显示第几页 -->
              <el-pagination
                :current-page="pageInfo.page"
                :page-sizes="[ 5, 10, 20]"
                :page-size="pageInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
              />
            </el-row>
          </el-tab-pane>
          <el-tab-pane label="公司信息">
            <!-- 右侧内容 -->
            <el-alert title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改" show-icon :closable="false" type="info" />
            <el-form label-width="120px" style="margin-top:50px">
              <el-form-item label="公司名称">
                <el-input v-model="companyInfo.name" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="公司地址">
                <el-input v-model="companyInfo.companyAddress" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="companyInfo.mailbox" disabled style="width:400px" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="companyInfo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
    <!-- 编辑角色弹层组件 -->
    <RoleDialog ref="diaLog" :is-show.sync="isShow" @getRoleList="getRoleList" />
    <!-- 分配权限弹层组件 -->
    <assignPermissions ref="assignPermissions" :show-dialog.sync="showDialog" />
  </div>
</template>

<script>
import { getRoleList, getCompanyInfo, delRole } from '@/api/setting'
import { mapGetters } from 'vuex'
export default {
  name: 'SettingPage',
  components: {
    RoleDialog: () => import('./components/roleDialog.vue'),
    assignPermissions: () => import('./components/assignPermissions.vue')
  },
  data() {
    return {
      loading: false,
      list: [],
      pageInfo: {
        // 放置页码及相关数据
        page: 1, // 第几页
        pagesize: 5 // 每页有几条数据
      },
      total: 0, // 记录总数
      companyInfo: {},
      isShow: false, // 对话框显示
      showDialog: false // 分配权限弹层显示
    }
  },
  computed: {
    ...mapGetters['companyId']
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    // 获取页面信息
    async getRoleList() {
      this.loading = true
      const { total, rows } = await getRoleList(this.pageInfo)
      this.total = total
      this.list = rows
      this.loading = false
    },
    // 页面信息数量改变时触发，每次改变会得到最新的页面显示数量
    handleSizeChange(newSize) {
      this.pageInfo.pagesize = newSize
      this.getRoleList()
    },
    // 分页改变时触发，每次改变会得到最新的显示第几页
    handleCurrentChange(newPage) {
      this.pageInfo.page = newPage
      this.getRoleList()
    },
    // 获取公司信息
    async getCompanyInfo() {
      this.companyInfo = await getCompanyInfo(this.companyId)
    },
    // 删除角色
    async onDelRole(id) {
      try {
        await this.$confirm('确定要删除?')
        await delRole(id)
        this.$message.success('删除成功了')
        this.getRoleList()
      } catch (error) {
        if (error === 'cancel') {
          this.$message.info('取消了删除')
        }
      }
    },
    // 点击编辑
    async editRole(id) {
      await this.$refs.diaLog.editRole(id)
    },
    // 点击分配权限
    async assign(id) {
      await this.$refs.assignPermissions.getPermissionList(id)
      this.showDialog = true
    }
  }
}
</script>

<style>

</style>
