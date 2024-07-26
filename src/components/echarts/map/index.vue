<template>
  <!-- 地图 -->
  <div class="map">
    <h3>
      <span class="icon-cube" />
      设备数据统计
    </h3>
    <div class="chart">
      <div class="geo" />
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
/* 地图  */
.map {
  height: 7.895rem;
  margin-bottom: 0.25rem;
  display: flex;
  flex-direction: column;
}
.map h3 {
  line-height: 1;
  padding: 0.2rem 0;
  margin: 0;
  font-size: 0.25rem;
  color: #fff;
  font-weight: 400;
}
.map .icon-cube {
  color: #68d8fe;
}
.map .chart {
  flex: 1;
  background-color: rgba(255, 255, 255, 0.05);
}
.map .geo {
  width: 100%;
  height: 100%;
}
</style>
