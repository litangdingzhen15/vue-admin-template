<template>
  <div class="dashboard-container">
    <div class="app-container">
      <PageTools :show-left="true">
        <!-- 左侧显示总记录数 -->
        <template #left>
          <span>共{{ total }}条消息</span>
        </template>
        <!-- 右侧显示按钮，excel 导入 导出 新增员工 -->
        <template #right>
          <el-button size="small" type="success" @click="$router.push('/import')">excel导入</el-button>
          <el-button size="small" type="danger" @click="exportData">excel导出</el-button>
          <el-button size="small" type="primary" :disabled="!checkPermission('aa')" @click="isShow=true">新增员工</el-button>
        </template>
      </PageTools>
      <!-- 表格组件 -->
      <!-- 表格数据根据 :data 属性绑定 -->
      <el-table v-loading="Loading" border="" stripe :data="list">
        <el-table-column label="序号" sortable="" type="index" />
        <el-table-column label="姓名" sortable="" prop="username" />
        <el-table-column v-slot="{row}" label="头像" sortable="" prop="staffPhoto" align="center">
          <!-- 全局注册的图片防裂指令 ↓ -->
          <img v-imagerror="defaultImg" :src="row.staffPhoto" class="staffPhoto" @click="showQrCode(row.staffPhoto)">
        </el-table-column>
        <el-table-column label="手机号" sortable="" prop="mobile" />
        <el-table-column label="工号" sortable="" prop="workNumber" />
        <el-table-column label="聘用形式" sortable="" prop="formOfEmployment">
          <template v-slot="{row}">
            {{ row.formOfEmployment | formatterHire }}
          </template>
        </el-table-column>
        <el-table-column label="部门" sortable="" prop="departmentName" />
        <el-table-column label="入职时间" sortable="">
          <template v-slot="{row}">
            {{ row.timeOfEntry | formatDate }}
          </template>
        </el-table-column>
        <el-table-column label="账户状态" sortable="" prop="enableState">
          <template v-slot="{row}">
            <el-switch active-color="#67c23a" :value="row.enableState == 1" />
          </template>
        </el-table-column>
        <el-table-column label="操作" sortable="" fixed="right" width="280">
          <template v-slot="{row}">
            <!-- 点击去往 detail 页面 -->
            <el-button
              v-if="checkPermission('aa')"
              type="text"
              size="small"
              @click="$router.push(`/employees/detail/${row.id}`)"
            >查看</el-button>
            <el-button type="text" size="small">转正</el-button>
            <el-button type="text" size="small">调岗</el-button>
            <el-button type="text" size="small">离职</el-button>
            <el-button type="text" size="small" @click="editRole(row.id)">角色</el-button>
            <el-button type="text" size="small" @click="deleteEmployee(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-row type="flex" justify="center" align="middle" style="height: 60px">
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
    </div>
    <!-- 新增员工对话框 -->
    <addemployee :is-show.sync="isShow" @getEmployeeList="getEmployeeList" />

    <el-dialog title="二维码" :visible="showCode" @close="onClose">
      <el-row type="flex" justify="center">
        <canvas ref="myCanvas" />
      </el-row>
    </el-dialog>
    <!-- 放置分配角色组件 -->
    <AssignRole v-if="showRoleDialog" ref="assignRole" :show-role-dialog.sync="showRoleDialog" :user-id="userId" />
  </div>
</template>

<script>

import { getEmployeeList, delEmployee } from '@/api/employees' // 引入 axios 请求
import EmployeeEnum from '@/api/constant/employees' // 导入员工枚举对象
import addemployee from './components/add-employee'
import { formatDate } from '@/filters/index'
import QrCode from 'qrcode'
import AssignRole from './components/assign-role.vue'

export default {
  name: 'Tab',
  components: {
    addemployee,
    AssignRole
  },
  data() {
    return {
      list: [], // 接收数组
      pageInfo: {
        page: 1,
        size: 10
      },
      total: 0, // 数据总数
      Loading: false, // 加载动画
      hireType: EmployeeEnum.hireType,
      defaultImg: require('@/assets/common/head.jpg'), // 图片加载失败显示的默认图片
      isShow: false, // 控制新增员工对话框显示
      showCode: false, // 显示二维码弹层
      showRoleDialog: false, // 显示分配角色弹层
      userId: '' // 定义一个 userId
    }
  },
  mounted() {
    this.getEmployeeList()
  },
  methods: {
    // 获取最新数据
    async getEmployeeList() {
      this.Loading = true
      const { total, rows } = await getEmployeeList(this.pageInfo)
      rows.forEach(item => {
        item.enableState = 1
      })
      this.total = total
      this.list = rows
      this.Loading = false
    },
    // 切换页面事件
    handleCurrentChange(newPage) {
      this.pageInfo.page = newPage
      this.getEmployeeList()
    },
    // 分页数据数量改变事件
    handleSizeChange(newSize) {
      this.pageInfo.size = newSize
      this.getEmployeeList()
    },
    // 格式化聘用形式
    formatEmployment(row, column, cellValue, index) {
      const obj = this.hireType.find(item => item.id === +cellValue)
      return obj ? obj.value : '未知'
    },
    // 删除员工
    async deleteEmployee(id) {
      try {
        await this.$confirm('确定要删除吗')
        await delEmployee(id)
        this.$message.success('删除员工成功')
        this.getEmployeeList()
      } catch (error) {
        //
      }
    },
    // 导出 excel
    exportData() {
      const headers = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      import('@/vendor/Export2Excel').then(async excel => {
        // excel 是引入文件的导出合集
        const { rows } = await getEmployeeList({ page: 1, size: this.total }) // rows 是所有的员工数据
        const data = this.formatJson(headers, rows) // 返回的 data 就是要导出的结构
        const multiHeader = [['姓名', '主要信息', '', '', '', '', '部门']]
        const merges = ['A1:A2', 'B1:F1', 'G1:G2']
        excel.export_json_to_excel({
          header: Object.keys(headers), // 表头的内容数组，就是 header 的所有 key
          data,
          filename: '员工资料表',
          multiHeader, // 复杂表头
          merges // 合并选项
        })
      })
    },
    // 转换格式
    formatJson(headers, rows) {
      return rows.map(item => {
        // item 的格式：{id: "604f764971f93f3ac8f365c3", mobile: "13800000003", username: "孙财",…}
        return Object.keys(headers).map(key => {
          // key 的格式：姓名 手机号 入职日期
          if (headers[key] === 'timeOfEntry' || headers[key] === 'correctionTime') {
            // 格式化日期
            return formatDate(item[headers[key]])
          } else if (headers[key] === 'formOfEmployment') {
            // 格式化聘用方式
            const obj = EmployeeEnum.hireType.find(obj => obj.id === item[headers[key]])
            return obj ? obj.value : '未知'
            // ?. 可选链操作符，取不到对应的属性返回 underfined，如果返回了 undefined，就应该给个默认值 未知
            // ?? 空值合并操作符
            // 逻辑或：只要左侧的操作符转成布尔值之后为 false 的话，一律返回右侧数据
            // 控制合并运算符（??）是一个逻辑运算符，当左侧的操作数为 null 或者 undefined 时，返回其右侧操作数，否则返回左侧操作数
            // 总结一下：?? 在某些场景下比 逻辑或 会更好的处理数据
            // return obj?.value ?? '未知'
          }
          return item[headers[key]]
        })
      })
      // return rows.map(item => Object.keys(headers).map(key => item[headers[key]]))
    },
    // formatJson2(headers, rows) {
    //   return rows.map(item => {
    //     // item 的格式：{id: "604f764971f93f3ac8f365c3", mobile: "13800000003", username: "孙财",…}
    //     return Object.values(headers).map(key => {
    //       // key 的格式：username mobile timeOfEntry
    //       return item[key]
    //     })
    //   })
    // }
    // 点击头像
    showQrCode(url) {
      // url 存在的情况下才弹出层
      if (url) {
        this.showCode = true
        // 因为页面的渲染是异步的，弹层先出现，弹层内的图片才渲染
        // 使用 nextTick 可以在上一次数据更新完毕之后，页面渲染完毕之后，执行代码
        this.$nextTick(() => {
          // 等待 ref 对象出现，才进行转化
          QrCode.toCanvas(this.$refs.myCanvas, url)
        })
      } else {
        this.$message.warning('用户未上传头像')
      }
    },
    // 关闭二维码弹窗
    onClose() {
      this.showCode = false
    },
    // 点击角色,传入点击的员工的 id
    editRole(id) {
      this.userId = id
      // this.$refs.assignRole.getUserDetailById(id)
      this.showRoleDialog = true
    }
  }
}
</script>

<style scoped>
  .staffPhoto{
    width: 70px;
    height: 70px;
    border-radius: 50%;
    text-align: center;
  }
</style>
