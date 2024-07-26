<template>
  <UploadExcel :on-success="success" />
</template>

<script>
import { importEmployee } from '@/api/employees'
export default {
  name: 'Excel',
  methods: {
    async success({ header, results }) {
      // header → ['姓名'，'手机号']
      // results → [{'姓名'：'黑马'，'手机号'：15115151515}]
      // 需要 → [{mobile:15151515151,username:'黑马'}]
      const userRelations = {
        '入职日期': 'timeOfEntry',
        '手机号': 'mobile',
        '姓名': 'username',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const newArr = results.map(item => {
        // item → {'姓名'：'黑马'，'手机号':15151515151}
        const userInfo = {}
        Object.keys(item).forEach(key => {
          // key → '姓名' '手机号'
          if (userRelations[key] === 'timeOfEntry' || userRelations[key] === 'correctionTime') {
            userInfo[userRelations[key]] = new Date(this.formatDate(item[key], '/'))
          } else {
            // userInfo 的属性就是 userRelations 对照中文的值；userInfo 每条属性对应的值就是 item[属性名] 取出来的值
            userInfo[userRelations[key]] = item[key]
          }
        })
        return userInfo
      })
      try {
        await importEmployee(newArr)
        await this.$message.success('导入excel成功')
        this.$router.back()
      } catch (error) {
        console.log(error)
      }
    },
    // 转换 excel 的日期格式
    formatDate(numb, format) {
      const time = new Date((numb - 1) * 24 * 3600000 + 1)
      time.setYear(time.getFullYear() - 70)
      const year = time.getFullYear() + ''
      const month = time.getMonth() + 1 + ''
      const date = time.getDate() - 1 + ''
      if (format && format.length === 1) {
        return year + format + month + format + date
      }
      return year + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date)
    }
  }
}
</script>

<style>

</style>
