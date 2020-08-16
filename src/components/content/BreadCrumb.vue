<template>
  <!--面包屑区域-->
  <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{keyWord}}管理</el-breadcrumb-item>
    <el-breadcrumb-item>{{keyWord}}列表</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "BreadCrumb",
    props: {
      keyWord: {
        type: String,
        default() {
          return ''
        }
      }
    }
  }
</script>

<style scoped>

</style>