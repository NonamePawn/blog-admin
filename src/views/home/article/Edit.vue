<template>
  <div class="edit">
    <!--面包屑区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>修改文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card style="height: 78vh">
      <el-alert
              style="margin-bottom: 15px"
              title="最后更新时间"
              type="success"
              :description="item.update_time"
              show-icon>
      </el-alert>
      <mavon-editor v-model="item.content" :toolbars="toolbars" @save="save(item)" style="height: 360px;"/>
    </el-card>
  </div>
</template>

<script>
  import {Put, Read} from "../../../network/home";

  export default {
    name: "Edit",
    data() {
      return {
        a_id: 0,
        item: {
          id: 0,
          update_time: '',
          content: ''
        },
        toolbars: {
          bold: true, // 粗体
          italic: true, // 斜体
          header: true, // 标题
          underline: true, // 下划线
          mark: true, // 标记
          superscript: true, // 上角标
          quote: true, // 引用
          ol: true, // 有序列表
          link: true, // 链接
          imagelink: true, // 图片链接
          help: true, // 帮助
          code: true, // code
          subfield: true, // 是否需要分栏
          fullscreen: true, // 全屏编辑
          readmodel: true, // 沉浸式阅读
          /* 1.3.5 */
          undo: true, // 上一步
          trash: true, // 清空
          save: true, // 保存（触发events中的save事件）
          /* 1.4.2 */
          navigation: true // 导航目录
        }
      }
    },
    created() {
      this.a_id = this.$route.query.a_id
      this.getItem(this.a_id)
    },
    methods: {
      async getItem(id) {
        this.item = await Read(this, 'article', '获取文章', id)
      },
      async save(row){
        await Put(this, 'article', '更新文章', row.id, {content: row.content})
        this.getItem(this.a_id)
      },
    }

  }
</script>

<style scoped>

</style>