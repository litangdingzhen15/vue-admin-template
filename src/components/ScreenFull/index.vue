<template>
  <div>
    <svg-icon icon-class="fullscreen" style="color:#fff; width: 20px; height: 20px" @click="changeScreen" />
  </div>
</template>

<script>
import ScreenFull from 'screenfull/dist/screenfull'

export default {
  methods: {
    changeScreen() {
      if (!ScreenFull.isEnabled) {
        return this.$message.warning('当前不可全屏')
      }
      ScreenFull.toggle()
      // document.documentElement.requestFullscreen()
    }
  }
}
</script>

<style>

</style>
