<template>
  <div>
    <!-- 给 action 一个 # 就不会报错了 -->
    <!-- file-list 是上传的文件类列表，可以绑定到上传组件上，让上传组件来显示 -->
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled:fileComputed}"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :http-request="upload"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width:180px" :percentage="percent" />
    <el-dialog :visible.sync="showDialog" title="图片预览">
      <img :src="imgUrl" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>

import COS from 'cos-js-sdk-v5' // 引入腾讯云 cos 包
const cos = new COS({
  SecretId: 'AKIDfARUIsELDrGqCJCqFPL2VkkVTCgweHiv', // 身份识别 ID
  SecretKey: '70iEYHtMbdQzJPHuISO6ZoBNL4ZqsiOx' // 身份密钥
})

export default {
  name: 'Image',
  data() {
    return {
      fileList: [],
      showDialog: false,
      imgUrl: '', // 存储点击的图片地址
      currentFileUid: null,
      percent: 0, // 当前的进度百分比
      showPercent: false // 是否显示进度条
    }
  },
  computed: {
    // 如果它为 true，就不应该显示 + 号
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.showDialog = true
      this.imgUrl = file.url
    },
    // 删除事件
    handleRemove(file, fileList) {
      // file 是要删除的文件；fileList 是删除后的文件
      this.fileList = this.fileList.filter(item => item.uid !== file.uid) // 看看删除这一文件后还有没有别的文件
      // this.fileList = fileList
    },
    // 文件改变事件，这个函数会执行多次
    changeFile(file, filList) {
      // file 是当前的文件，fileList 是当前的最新数组 this.fileList
      this.fileList = filList.map(item => item)
    },
    // 上传前的钩子函数
    beforeUpload(file) {
      // 检查文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      // 上传的文件类型取反之后为 true 的话（不符合），终止执行
      if (!types.includes(file.type)) {
        this.$message.error('图片不符合格式')
        return false
      }
      // 检查文件大小
      const maxSize = 5 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('文件过大')
        return false
      }
      this.currentFileUid = file.uid
      // 显示进度条
      this.showPercent = true
      return true
    },
    // 进行上传操作
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'ranrika-1315192244', // 存储桶
          Region: 'ap-nanjing', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 要上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型，默认标准模式
          onProgress: (params) => {
            this.percent = params.percent * 100
          }
        }, (err, data) => {
          // console.log(err || data)
          // data 中有一个 statusCode === 200 的时候说明上传成功
          if (!err && data.statusCode === 200) { // 此时说明文件上传成功
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })
            // 关闭进度条
            // 重置百分比
            setTimeout(() => {
              this.showPercent = false
              this.percent = 0
            }, 1000)
          }
        })
      }
    }
  }
}
</script>

<style>
	.disabled .el-upload--picture-card {
  display: none
}
</style>
