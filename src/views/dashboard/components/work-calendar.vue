<template>
  <!-- 工作日历 -->
  <div>
    <!-- 年和月 -->
    <el-row type="flex" justify="end">
      <el-select v-model="currentYear" size="small" style="width:120px" @change="dateChange">
        <el-option v-for="item in yearList" :key="item" :label="item" :value="item">
          {{ item }}
        </el-option>
      </el-select>
      <el-select v-model="currentMonth" size="small" style="width:120px;margin-left:10px" @change="dateChange">
        <!-- 循环 -->
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </el-row>
    <!-- 日历组件 -->
    <el-calendar v-model="currentDate">
      <template v-slot:dateCell="{date,data}">
        <div class="date-content">
          <span class="text">
            {{ data.day | getDay }}
          </span>
          <span v-if="isWeek(date)" class="rest">休</span>
        </div>
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getDay(value) {
      const day = value.split('-')[2]
      return day.startsWith('0') ? day.substr(1) : day
    }
  },
  props: {
    startDate: {
      type: Date,
      default: () => new Date() // 如果没有传递 startDate，就取当前时间
    }
  },
  data() {
    return {
      yearList: [], // 要遍历的年的数组
      currentYear: null, // 当前年份
      currentMonth: null, // 当前月份
      currentDate: null // 当前日
    }
  },
  mounted() {
    this.currentYear = this.startDate.getFullYear() // 得到当前的年份
    this.currentMonth = this.startDate.getMonth() + 1 // 得到当前月份
    // 快速生成数组方法
    // Array.from(Array(5),(v,i) => i)    [0, 1, 2, 3, 4]
    // Array.from(Array(5),(v,i) => i+2022)   [2022, 2023, 2024, 2025, 2026]
    // Array.from(Array(5),(v,i) => i+2022-3)   [2019, 2020, 2021, 2022, 2023]
    this.yearList = Array.from(Array(11), (v, i) => this.currentYear + i - 5)
    // 钩子函数执行之后
    this.dateChange()
  },
  methods: {
    dateChange() {
      // 生成新的日期
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`) // 以一号为开始
    },
    isWeek(value) {
      return [0, 6].includes(value.getDay())
    }
  }
}
</script>

<style  scoped>
 /deep/ .el-calendar-day {
  height:  auto;
 }
 /deep/ .el-calendar-table__row td,/deep/ .el-calendar-table tr td:first-child,  /deep/ .el-calendar-table__row td.prev{
  border:none;
 }
.date-content {
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 14px;
}
.date-content .rest {
  color: #fff;
  border-radius: 50%;
  background: rgb(250, 124, 77);
  width: 20px;
  height: 20px;
  line-height: 20px;
  display: inline-block;
  font-size: 12px;
  margin-left: 10px;
}
.date-content .text{
  width: 20px;
  height: 20px;
  line-height: 20px;
 display: inline-block;

}
 /deep/ .el-calendar-table td.is-selected .text{
   background: #409eff;
   color: #fff;
   border-radius: 50%;
 }
 /deep/ .el-calendar__header {
   display: none
 }
</style>
