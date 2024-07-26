<template>
  <div class="main">
    <div class="viewport">
      <el-row :gutter="20">
        <el-col :span="7">
          <!-- 概览 -->
          <overview />
          <!-- 监控 -->
          <monitor />
          <!-- 点位 -->
          <point />
        </el-col>
        <el-col :span="10" class="two">
          <!-- 地图 -->
          <mapp />
          <!-- 用户 -->
          <user />
        </el-col>
        <el-col :span="7">
          <!-- 订单 -->
          <order />
          <!-- 销售统计 -->
          <sales />
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    overview: () => import('@/components/echarts/overview'),
    monitor: () => import('@/components/echarts/monitor'),
    point: () => import('@/components/echarts/point'),
    mapp: () => import('@/components/echarts/map/'),
    user: () => import('@/components/echarts/users'),
    order: () => import('@/components/echarts/order'),
    sales: () => import('@/components/echarts/sales')
  },
  data() {
    return {
      bodyBgImage: 'url(' + require('../../assets/images/bg.jpg') + ')'
    }
  },
  mounted() {
    // 进来的时候调用添加
    this.setBodyBackGround()
  },
  beforeDestroy() {
    // 离开页面的时候清除
    this.clearBodyBackGround()
  },
  methods: {
    // 添加body图片
    setBodyBackGround() {
      console.log(document.body.style)
      document.body.style.backgroundSize = 'cover'
      document.body.style.backgroundImage = this.bodyBgImage
    },
    // 清除背景图
    clearBodyBackGround() {
      document.body.style.backgroundImage = ''
    }
  }}
</script>

<style scoped lang="scss">
  .abc {
     color: red;
    font-size: 0.5rem;
    line-height: 1.15;
    background: url('../../assets/images/bg.jpg') no-repeat;
    background-size: cover;
    }
  .main {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .viewport {
  max-width: 1920px;
  min-width: 1024px;
  margin: 0 auto;
  min-height: 780px;
  padding: 1.257rem .3rem 0;
  background: url('../../assets/images/logo.png') no-repeat 0 0 / contain;
}
.el-row {
  color: white;
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
   .two{
    margin-top: .55rem;
  }
</style>
