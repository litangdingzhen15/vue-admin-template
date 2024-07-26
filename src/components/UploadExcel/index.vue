<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" size="mini" type="primary" @click="handleUpload">
        点击上传
      </el-button>
    </div>

    <input ref="excel-upload-input" class="excel-upload-input" type="file" accept=".xlsx, .xls" @change="handleClick">
    <div class="drop" @drop="handleDrop" @dragover="handleDragover" @dragenter="handleDragover">
      <i class="el-icon-upload" />
      <span>将文件拖到此处</span>
    </div>
  </div>

</template>

<script>
import XLSX from 'xlsx'

export default {
  props: {
    beforeUpload: Function, // eslint-disable-line
    onSuccess: Function// eslint-disable-line
  },
  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null
      }
    }
  },
  methods: {
    // generateData 生成的意思
    generateData({ header, results }) {
      // 拿到读取完毕之后的所有列内容和表格内容给当前组件的 excelData 做赋值了
      this.excelData.header = header
      this.excelData.results = results
      // 如果使用组件的时候，传递了 onSuccess 这个属性，就让这个函数执行，并且拿到刚刚读取的 列 和 内容
      this.onSuccess && this.onSuccess(this.excelData)
    },
    handleDrop(e) {
      e.stopPropagation()
      e.preventDefault()
      if (this.loading) return
      const files = e.dataTransfer.files
      if (files.length !== 1) {
        this.$message.error('Only support uploading one file!')
        return
      }
      const rawFile = files[0] // only use files[0]

      if (!this.isExcel(rawFile)) {
        this.$message.error('Only supports upload .xlsx, .xls, .csv suffix files')
        return false
      }
      this.upload(rawFile)
      e.stopPropagation()
      e.preventDefault()
    },
    handleDragover(e) {
      e.stopPropagation()
      e.preventDefault()
      e.dataTransfer.dropEffect = 'copy'
    },
    handleUpload() {
      this.$refs['excel-upload-input'].click()
    },
    handleClick(e) {
      const files = e.target.files
      // 去文件列表的第一位（就是刚刚选择的那个文件）
      const rawFile = files[0] // only use files[0]
      if (!rawFile) return

      // 如果选择了文件，继续走 upload（真实的 excel file）
      this.upload(rawFile)
    },
    upload(rawFile) {
      // 解决了不能同时选择同一个 excel 的问题
      this.$refs['excel-upload-input'].value = null // fix can't select the same excel

      // 如果用户在用这个组件期间，没有传入 beforeUpload 这个属性的话，直接走 readerData 方法
      if (!this.beforeUpload) {
        this.readerData(rawFile)
        return
      }

      // 让用户传递过来的 beforeUpload 方法执行了（beforeUpload 上传表格之前有可能需要检查一下[文件大小，后缀 等到一些小问题]）
      // 根据 before 是检查动作结束之后（检查通过了）
      const before = this.beforeUpload(rawFile)
      if (before) {
        // 开始读数据
        this.readerData(rawFile)
      }
    },
    readerData(rawFile) {
      this.loading = true
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
          // data 是真正的 excel 读完之后的字节：ArrayBuffer byteLength
          const data = e.target.result
          // 使用了 XLSX 里面的 read 方法，将 ArrayBuffer 转成工作簿
          const workbook = XLSX.read(data, { type: 'array' })
          // 这是第一个工作簿的名称
          const firstSheetName = workbook.SheetNames[0]
          // 当前的工作簿
          const worksheet = workbook.Sheets[firstSheetName]
          // 获取当前表格里面的头部标题（列标题）
          const header = this.getHeaderRow(worksheet) // 所有的列
          const results = XLSX.utils.sheet_to_json(worksheet) // 就是所有表格的内容
          this.generateData({ header, results })
          this.loading = false
          resolve()
        }
        reader.readAsArrayBuffer(rawFile)
      })
    },
    getHeaderRow(sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      let C
      const R = range.s.r
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })]
        /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell)
        headers.push(hdr)
      }
      return headers
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name)
    }
  }
}
</script>

<style scoped lang="scss">
.upload-excel {
  display: flex;
  justify-content: center;
   margin-top: 100px;
   .excel-upload-input{
       display: none;
        z-index: -9999;
     }
   .btn-upload , .drop{
      border: 1px dashed #bbb;
      width: 350px;
      height: 160px;
      text-align: center;
      line-height: 160px;
   }
   .drop{
       line-height: 80px;
       color: #bbb;
      i {
        font-size: 60px;
        display: block;
      }
   }
}
</style>
