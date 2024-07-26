<template>
  <!-- 销售额 -->
  <div class="sales panel">
    <div class="inner">
      <div class="caption">
        <h3>销售额统计</h3>
        <a href="javascript:;" class="active">年</a>
        <a href="javascript:;">季</a>
        <a href="javascript:;">月</a>
        <a href="javascript:;">周</a>
      </div>
      <div class="chart">
        <div class="label">单位:万</div>
        <div ref="line" class="line" />
      </div>
    </div>
  </div>
</template>

<script>
import echarts from 'echarts'
export default {
  mounted() {
    this.chart()
  },
  methods: {
    chart() {
      const myChart = echarts.init(this.$refs.line)
      const option = {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['预期销售额', '实际销售额'],
          textStyle: {
            color: '#4c9bfd'
          },
          right: '10%'
        },
        grid: {
          top: '20%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '预期销售额',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '实际销售额',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          }]
      }
      myChart.setOption(option)
      window.addEventListener('resize', function() {
        myChart.resize()
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* 销售区域 */
.sales {
  height: 3.1rem;
}
.sales .caption {
  display: flex;
  line-height: 1;
}
.sales h3 {
  font-size: 0.25rem;
  height: 0.3rem;
  padding-right: 0.225rem;
  border-right: 0.025rem solid #00f2f1;
}
.sales a {
  padding: 0.05rem;
  font-size: 0.2rem;
  margin: -0.0375rem 0 0 0.2625rem;
  border-radius: 0.0375rem;
  color: #0bace6;
}
.sales a.active {
  background-color: #4c9bfd;
  color: #fff;
}
.sales .inner {
  display: flex;
  flex-direction: column;
}
.sales .chart {
  flex: 1;
  padding-top: 0.1875rem;
  position: relative;
}
.sales .label {
  position: absolute;
  left: 0.525rem;
  top: 0.225rem;
  color: #4996f5;
  font-size: 0.175rem;
}
.sales .line {
  width: 100%;
  height: 100%;
  padding-bottom: .1875rem;
}
</style>
