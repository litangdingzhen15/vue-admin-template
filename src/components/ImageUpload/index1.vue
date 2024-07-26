<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :file-list="fileList"
      :class="{disabled:fileList.length === 1}"
      :on-remove="onRemove"
      :on-change="onChange"
      :before-upload="onBeforeUpload"
      :http-request="onHttpRequest"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" style="width:180px" :percentage="percent" />
    <el-dialog title="预览图片" :visible="isShow" width="30%" @close="onClose">
      <img :src="imgUrl" style="width:100%">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDfARUIsELDrGqCJCqFPL2VkkVTCgweHiv', // 身份识别 ID
  SecretKey: '70iEYHtMbdQzJPHuISO6ZoBNL4ZqsiOx' // 身份密钥
})
export default {
  data() {
    return {
      fileList: [],
      isShow: false, // 预览弹框
      imgUrl: '', // 预览图片
      percent: 0, // 进度条
      showPercent: false // 进度条显示隐藏
    }
  },
  methods: {
    // 点击预览，弹框出现，弹框图片显示
    preview(file) {
      this.isShow = true
      this.imgUrl = file.url
    },
    // 关闭预览，弹框隐藏，图片消失
    onClose() {
      this.isShow = false
      this.imgUrl = ''
    },
    // 点击删除，文件置空
    onRemove(file, fileList) {
      this.fileList = []
    },
    // 文件状态改变时的钩子函数，文件上传失败 成功 都会调用
    onChange(file, fileList) {
      // console.log(file, fileList)
      // fileList 是一个数组，里面有一个对象，对象里面才是需要上传的文件
      if (fileList) {
        this.fileList = fileList.map(item => item)
      }
      // this.showPercent = true
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    // 解构参数中的 size 和 type
    onBeforeUpload({ size, type, uid }) {
      // 设定限制上传条件
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      const maxSize = 5 * 1024 * 1024
      if (size > maxSize) {
        return Promise.reject('文件过大')
      } else if (!types.includes(type)) { // 文件类型规则里有没有上传的格式，取反后return
        this.$message.warning('文件不符合格式')
        return false
      }
      this.showPercent = true
      return true
    },
    onHttpRequest(params) {
      // 这里的 params.file 是要上传到服务器的文件
      const file = params.file

      // putObject 是腾讯云提供的简单上传文件方法
      cos.putObject({
        Bucket: 'ranrika-1315192244', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: '1.jpg', /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        Body: file, /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */
        onProgress: (progressData) => {
          // progressData 是上传进度
          this.showPercent = true
          this.percent = progressData.percent * 100
        }
      }, (err, data) => {
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
</script>

<style scoped lang="scss">
// .img-upload {
//     .el-upload--picture-card{
//         display: none;
//     }
// }
</style>
