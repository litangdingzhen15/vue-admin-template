<template>
  <!-- 点位 -->
  <div class="point panel">
    <div class="inner">
      <h3>点位分布统计</h3>
      <div class="chart">
        <div ref="pie" class="pie" />
        <div class="data">
          <div class="item">
            <h4>320,11</h4>
            <span>
              <i class="icon-dot" style="color: #ed3f35" />
              点位总数
            </span>
          </div>
          <div class="item">
            <h4>418</h4>
            <span>
              <i class="icon-dot" style="color: #eacf19" />
              本月新增
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  mounted() {
    this.echarts()
  },
  methods: {
    echarts() {
      const myChart = echarts.init(this.$refs.pie)
      const option = {
        color: ['#006cff', '#60cda0', '#ed8884', '#ff9f7f', '#0096ff', '#9fe6b8', '#32c5e9', '#1d9dff'],
        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        series: [
          {
            name: '点位统计',
            type: 'pie',
            radius: ['10%', '70%'],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              borderRadius: 8
            },
            data: [
              { value: 20, name: '云南' },
              { value: 26, name: '北京' },
              { value: 24, name: '山东' },
              { value: 25, name: '河北' },
              { value: 20, name: '江苏' },
              { value: 25, name: '浙江' },
              { value: 30, name: '四川' },
              { value: 42, name: '湖北' }
            ],
            labelLine: {
              length: 10,
              length2: 5
            }
          }
        ]
      }
      myChart.setOption(option)
      // 监听浏览器缩放，图表对象调用缩放resize函数
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* 点位 */
.point {
  height: 4.25rem;
  h3 {
    font-size: 0.25rem;
    color: #fff;
    font-weight: 400;
  }
}
.point .chart {
  display: flex;
  margin-top: 0.3rem;
  justify-content: space-between;
}
.point .pie {
  width: 3.9rem;
  height: 3rem;
  margin-left: -0.125rem;
}
.point .data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.1rem;
  padding: .45rem .375rem;
  box-sizing: border-box;
  background-image: url('../../../assets/images/rect.png');
  background-size: cover;
}
.point h3 {
  margin-bottom: 0.25rem;
  font-size: .35rem;
  color: #fff;
}
.point span {
  display: block;
  color: #4c9bfd;
  font-size: .2rem;
}
</style>
