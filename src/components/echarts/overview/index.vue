<template>
  <div class="panel overview">
    <div class="inner">
      <ul>
        <li>
          <h4>2,190</h4>
          <span>
            <i class="icon-dot" style="color: #006cff" />
            设备总数
          </span>
        </li>
        <li class="item">
          <h4>190</h4>
          <span>
            <i class="icon-dot" style="color: #6acca3" />
            季度新增
          </span>
        </li>
        <li>
          <h4>3,001</h4>
          <span>
            <i class="icon-dot" style="color: #6acca3" />
            运营设备
          </span>
        </li>
        <li>
          <h4>108</h4>
          <span>
            <i class="icon-dot" style="color: #ed3f35" />
            异常设备
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
  .overview{
    height: 1.575rem;
    ul{
      display: flex;
      justify-content: space-between;
    }
    li h3 {
    font-size: .35rem;
    color: #fff;
    margin: 0 0 .1rem .06rem;
}
span {
    font-size: .2rem;
    color: #4c9bfd;
}
  }
</style>
