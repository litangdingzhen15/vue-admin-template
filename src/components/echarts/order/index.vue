<template>
  <!-- 订单 -->
  <div class="order panel">
    <div class="inner">
      <!-- 筛选 -->
      <div class="filter">
        <a href="javascript:;" class="active">365天</a>
        <a href="javascript:;">90天</a>
        <a href="javascript:;">30天</a>
        <a href="javascript:;">24小时</a>
      </div>
      <!-- 数据 -->
      <div class="data">
        <div class="item">
          <h4>20,301,987</h4>
          <span>
            <i class="icon-dot" style="color: #ed3f35;" />
            订单量
          </span>
        </div>
        <div class="item">
          <h4>99834</h4>
          <span>
            <i class="icon-dot" style="color: #eacf19;" />
            销售额(万元)
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
/* 订单 */
.order {
  height: 1.875rem;
}
.order .filter {
  display: flex;
}
.order .filter a {
  display: block;
  height: 0.225rem;
  line-height: 1;
  padding: 0 0.225rem;
  color: #1950c4;
  font-size: 0.225rem;
  border-right: 0.025rem solid #00f2f1;
}
.order .filter a:first-child {
  padding-left: 0;
}
.order .filter a:last-child {
  border-right: none;
}
.order .filter a.active {
  color: #fff;
  font-size: 0.25rem;
}
.order .data {
  display: flex;
  margin-top: 0.25rem;
}
.order .item {
  width: 50%;
}
.order h4 {
  font-size: 0.35rem;
  color: #fff;
  margin-bottom: 0.125rem;
}
.order span {
  display: block;
  color: #4c9bfd;
  font-size: 0.2rem;
}
</style>
