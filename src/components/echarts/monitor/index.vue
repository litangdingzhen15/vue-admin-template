<template>
  <div class="monitor panel">
    <div class="inner">
      <div class="tabs">
        <a href="javascript:;" :class="{active:isShow===1}" @click="fault">故障设备监控</a>
        <a href="javascript:;" :class="{active:isShow===2}" @click="abnormal">异常设备监控</a>
      </div>
      <div v-show="isShow === 1" class="content">
        <div class="head">
          <span class="col">故障时间</span>
          <span class="col">设备地址</span>
          <span class="col">异常代码</span>
        </div>
        <div class="marquee-view">
          <div class="marquee">
            <div class="row">
              <span class="col">20180701</span>
              <span class="col">11北京市昌平西路金燕龙写字楼</span>
              <span class="col">1000001</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190601</span>
              <span class="col">北京市昌平区城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190704</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000003</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20180701</span>
              <span class="col">北京市昌平区建路金燕龙写字楼</span>
              <span class="col">1000004</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190701</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000005</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190701</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000006</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190701</span>
              <span class="col">北京市昌平区建西路金燕龙写字楼</span>
              <span class="col">1000007</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190701</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000008</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190701</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000009</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190710</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000010</span>
              <span class="icon-dot" />
            </div>
          </div>
        </div>
      </div>
      <div v-show="isShow === 2" class="content">
        <div class="head">
          <span class="col">异常时间</span>
          <span class="col">设备地址</span>
          <span class="col">异常代码</span>
        </div>
        <div class="marquee-view">
          <div class="marquee">
            <div class="row">
              <span class="col">20190701</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000001</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190701</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190703</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190704</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190705</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190706</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190707</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190708</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190709</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
            <div class="row">
              <span class="col">20190710</span>
              <span class="col">北京市昌平区建材城西路金燕龙写字楼</span>
              <span class="col">1000002</span>
              <span class="icon-dot" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
export default {
  name: 'Monitor',
  data() {
    return {
      isShow: 1
    }
  },
  mounted() {
    this.roll()
  },
  methods: {
    fault() {
      this.isShow = 1
    },
    abnormal() {
      this.isShow = 2
    },
    roll() {
      $('.inner .marquee').each(function(i) {
        const clone = $(this).children().clone()
        $(this).append(clone)
      })
    }
  }
}
</script>

<style scoped lang="scss">
/* 监控区域 */
.monitor{
  height: 6.6rem;
}
h3 {
  font-size: 0.35rem;
}
.monitor .inner{
  padding: .3rem 0 .45rem;
  display: flex;
  flex-direction: column;
}
.monitor .tabs{
  padding: 0 .45rem;
  margin-bottom: 0.225rem;
  display: flex;
}
.monitor .tabs a{
  color:#1950c4;
  font-size: 0.225rem;
  padding: 0 .3375rem;
}
.monitor .tabs a:first-child{
  padding-left: 0;
  border-right: 0.025rem solid #00f2f1;
}
.monitor .tabs a.active{
  color: #fff;
}
.monitor .content{
  flex: 1;
  position: relative;
}
.monitor .head{
  display: flex;
  justify-content: space-between;
  line-height: 1.05;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.15rem 0.45rem;
  color: #68d8fe;
  font-size: 0.175rem;
}
.monitor .marquee-view {
  position: absolute;
  top: 0.5rem;
  bottom: 0;
  width: 100%;
}
.monitor .row{
  display: flex;
  justify-content: space-between;
  line-height: 1.05;
  font-size: 0.15rem;
  color: #61a8ff;
  padding: 0.15rem 0.45rem;
}
.monitor .row .icon-dot{
  position: absolute;
  left: 0.2rem;
  opacity: 0;
}
.monitor .row:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #68d8fe;
}
.monitor .row:hover .icon-dot{
  opacity: 1;
}
.monitor .col:first-child{
  width: 1rem;
}
.monitor .col:nth-child(2){
  width: 2.5rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.monitor .col:nth-child(3){
  width: 1rem;
}
/* 通过CSS3动画滚动marquee */
.marquee-view .marquee {
  animation: move 15s linear infinite;
}
@keyframes move {
  0% {
  }
  100% {
    transform: translateY(-50%);
  }
}
/* 3.鼠标经过marquee 就停止动画 */
.marquee-view .marquee:hover {
  animation-play-state: paused;
}
.marquee-view {
  overflow: hidden;
}
</style>
