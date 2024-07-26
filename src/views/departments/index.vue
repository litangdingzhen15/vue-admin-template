<template>
  <div v-loading="loading" class="dashboard-container">
    <div class="app-container">
      <!-- 组织架构的内容 - 头部 -->
      <el-card class="tree-card">
        <tree-tools :tree-node="company" :is-root="true" />

        <!-- 使用 tree 组件 -->
        <!-- data 属性：用来指定 tree 组件的数据源，一般是一个数组 -->
        <!-- props：是配置信息列表（展示哪些数据）：
          label 指定节点标签为节点对象的某个属性值（你看到的各级标题的文字，是通过 label 指定的）
          children 指定子树为节点对象的某个属性值（各个级别通过 children 去关联） -->
        <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
          <!-- 传入内容 插槽内容 会循环多次 有多少节点 就循环多少次 -->
          <!-- 作用域插槽 slot-scope="obj" 接收传递给插槽的数据 ; 接收自定义事件传过来的值不需要加括号-->
          <tree-tools slot-scope="{ data }" :tree-node="data" @delDepts="onDelDept" @add="onAdd" @editDepts="editDepts" />
        </el-tree>
      </el-card>
    </div>
    <!-- 放置新增弹层组件 -->
    <!-- 传入既要用又要改的 isShow 属性 -->
    <add-dept ref="addDept" :is-show.sync="isShow" :dept-id="deptId" @updataList="loadDeptsList" />
  </div>
</template>

<script>
import treeTools from './components/tree-tools.vue'
import { getDepartments } from '@/api/departments'
import { list2Tree } from '@/utils/index'
import AddDept from './components/add-dept.vue'
import { delDepartments } from '@/api/departments'
export default {
  name: 'DepartMent',
  components: { treeTools, AddDept },
  data() {
    return {
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      companyInfo: [],
      isShow: false,
      deptId: null, // 点击的部门的 id
      loading: false // 页面加载动画
    }
  },
  mounted() {
    this.loadDeptsList()
  },
  methods: {
    async loadDeptsList() {
      this.loading = true
      const res = await getDepartments()
      this.company.name = res.companyName
      // 转成树形结构（第二个参数是表示 一级部门的 pid 是什么）
      this.departs = list2Tree(res.depts, '')
      this.loading = false
    },
    // 点击删除部门
    async onDelDept(deptId) {
      try {
        // 弹出组件弹窗
        const result = await this.$confirm('确定要删除该部门吗')
        // 确定删除的话
        if (result === 'confirm') {
          // 调用删除接口方法；刷新页面
          await delDepartments(deptId)
          this.loadDeptsList()
        }
      } catch (error) {
        // console.log(error)
      }
    },
    // 点击添加部门
    onAdd(deptId) {
      this.isShow = true // 对话框展现
      this.deptId = deptId
    },
    // 点击编辑功能
    async editDepts(id) {
      // 先调用编辑信息接口，再打开弹窗
      await this.$refs.addDept.getDepartDetail(id)
      this.isShow = true
    }
  }
}
</script>

<style scoped>
.tree-card {
  padding: 30px  140px;
  font-size:14px;
}
</style>
