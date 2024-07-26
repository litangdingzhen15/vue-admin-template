<template>
  <!-- 用户 -->
  <div class="users panel">
    <div class="inner">
      <h3>全国用户总量统计</h3>
      <div class="chart">
        <div ref="bar" class="bar" />
        <div class="data">
          <div class="item">
            <h4>120,899</h4>
            <span>
              <i class="icon-dot" style="color: #ed3f35" />
              用户总量
            </span>
          </div>
          <div class="item">
            <h4>248</h4>
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
    this.chartes()
  },
  methods: {
    chartes() {
      const myChart = echarts.init(this.$refs.bar)
      // 为 series 里的数据单独提供数据
      const item = {
        name: '',
        value: 1200,
        // 柱子颜色
        itemStyle: {
          color: '#254065'
        },
        // 鼠标经过柱子颜色
        emphasis: {
          itemStyle: {
            color: '#254065'
          }
        },
        // 鼠标经过不显示提示框
        tooltip: {
          extraCssText: 'opacity:0'
        }
      }
      const option = {
        color: new echarts.graphic.LinearGradient(
          // (x1,y2) 点到点 (x2,y2) 之间进行渐变
          0, 0, 0, 1,
          [
            { offset: 0, color: '#00fffb' }, // 0 起始颜色
            { offset: 1, color: '#0061ce' } // 1 结束颜色
          ]
        ),
        // 提示框
        tooltip: {
          trigger: 'item'
        },
        // 柱形图内区域
        grid: {
          // 柱形图大小
          top: '3%',
          left: '0%',
          right: '4%',
          bottom: '3%',
          // 坐标轴文字离画布边缘有一定距离
          containLabel: true,
          // 是否显示直角坐标系网格
          show: true,
          // 该区域内四条边框的颜色
          borderColor: 'rgba(0, 240, 255, 0.3)'
        },
        xAxis: [
          {
            // 使用类目，和 data 关联
            type: 'category',
            // x 轴上的刻度数字
            data: ['上海', '广州', '北京', '深圳', '合肥', '', '......', '', '杭州', '厦门', '济南', '成都', '重庆'],
            // 刻度设置
            axisTick: {
              // 图形是否在刻度中间
              alignWithLabel: false,
              // 不显示刻度
              show: false
            },
            // 坐标轴上文字标签的样式
            axisLabel: {
              color: '#4c9bfd'
            },
            // 坐标轴线条样式设置
            axisLine: {
              lineStyle: {
                color: 'rgba(0, 240, 255, 0.3)'
              }
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            axisTick: {
              show: false
            },
            axisLabel: {
              color: '#4c9bfd'
            },
            axisLine: {
              lineStyle: {
                color: 'rgba(0, 240, 255, 0.3)'
              }
            },
            // 分割线的样式
            splitLine: {
              lineStyle: {
                color: 'rgba(0, 240, 255, 0.3)'
              }
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [2100, 1900, 1700, 1560, 1400, item, item, item, 900, 750, 600, 480, 240]
          }
        ]
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
/* 用户模块 */
.users {
  height: 4.25rem;
  display: flex;
}
.users .chart {
  display: flex;
  margin-top: .3rem;
}
.users .bar {
  width: 7.35rem;
  height: 3rem;
}
.users .data {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 2.1rem;
  padding: .45rem .375rem;
  box-sizing: border-box;
  background-image: url('../../../assets/images/rect.png');
  background-size: cover;
}
.users h3 {
  margin-bottom: .15rem;
  font-size: .35rem;
  color: #fff;
}
.users span {
  display: block;
  color: #4c9bfd;
  font-size: 0.2rem;
}
</style>
