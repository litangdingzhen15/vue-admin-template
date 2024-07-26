<template>
  <el-dropdown trigger="click" @command="changeLanguage">
    <!-- 这里显示一个图标 -->
    <div>
      <svg-icon style="color:#fff;font-size:20px" icon-class="language" />
    </div>
    <!-- 下拉图标 -->
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh">中文</el-dropdown-item>
      <el-dropdown-item command="en">en</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  methods: {
    changeLanguage(type) {
      // 设置的类型 先写入到 cookie
      Cookie.set('language', type) // 写入 cookie 缓存
      // 改变当前的多语言
      this.$i18n.locale = type // 将当前的多语言类型改成对应的类型
      this.$message.success('切换语言成功')
    }
  }
}
</script>

<style>

</style>
