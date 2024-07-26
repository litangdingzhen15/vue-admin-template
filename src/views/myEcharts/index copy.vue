<template>
  <div class="main">
    <div id="box1" />
    <div id="box2" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'lib-flexible/flexible'
export default {
  name: 'MyEcharts',
  data() {
    return {
      myChart1: null,
      myChart2: null
    }
  },
  mounted() {
    // 基于准备好的dom，初始化echarts实例
    this.myChart1 = echarts.init(document.getElementById('box1'))
    this.myChart2 = echarts.init(document.getElementById('box2'))
    // 绘制图表
    this.myChart1.setOption({
      title: {
        text: 'ECharts 入门示例'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    })
    this.myChart2.setOption({
      // 图标的标题文字
      title: {
        text: '我测你们码'
      },
      // 文本提示
      tooltip: {
        trigger: 'axis'
      },
      // 图例，可以点击
      legend: {
        data: ['a', 'b', 'c', 'd', 'e']
      },
      grid: {
        show: true,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
        borderWidth: 2
      },
      // 快捷键，可以将图表下载成图片
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      // x 轴方向
      xAxis: {
        // 类目轴，适用于离散的类目数据
        type: 'category',
        boundaryGap: false,
        // x 轴方向的数据
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      // y 轴方向
      yAxis: {
        // 数值轴，适用于连续数据
        type: 'value'
      },
      series: [
        {
          // y 轴的名字
          name: 'a',
          // 类型：line 线型；pie 饼型；bar 柱状图
          type: 'line',
          // 设置数据堆叠（数据会累加）
          // stack: 'Total',
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'b',
          type: 'line',
          // stack: 'Total',
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'c',
          type: 'line',
          // stack: 'Total',
          data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
          name: 'd',
          type: 'line',
          // stack: 'Total',
          data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
          name: 'e',
          type: 'line',
          // stack: 'Total',
          data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
      ]
    })
  }

}
</script>

<style scoped lang="scss">
// 实现rem适配
@media screen and (max-width: 1024px) {
     html {
         font-size: 42.66px !important;
     }
 }

 @media screen and (min-width: 1920px) {
     html {
         font-size: 80px !important;
     }
 }
.main{
  display: flex;
  justify-content: space-between;
   #box1{
    width: 5rem;
    height: 5rem;
    background-color: khaki;
  }
  #box2{
    width: 5rem;
    height: 5rem
  }
}

</style>
