<template>
  <div class="add">
    <!--面包屑区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加文章</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>
      <!--步骤条-->
      <el-steps :space="450" :active="activeIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="文章内容" icon="el-icon-tickets"></el-step>
        <el-step title="完成" icon="el-icon-folder-checked"></el-step>
        <el-button type="success" style="margin-bottom: 12px;" @click="add">添加文章</el-button>
      </el-steps>
      <!--tab栏区域-->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" style="margin-top: 5px">
        <el-tabs
                tab-position="top"
                v-model="activeIndex"
                :before-leave="beforeTabLeave">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="addForm.title"></el-input>
            </el-form-item>
            <el-form-item label="文章介绍" prop="introduce">
              <el-input v-model="addForm.introduce"></el-input>
            </el-form-item>
            <el-form-item label="所属分类" prop="c_id">
              <el-cascader
                      v-model="selectedKeys"
                      :options="cateList"
                      :props="{
                    trigger: 'hover',
                    label: 'name',
                    value: 'id',
                    children: 'children'
                  }"
                      @change="handleChange"></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="文章内容" name="1">
            <mavon-editor v-model="addForm.content" :toolbars="toolbars"/>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
  </div>
</template>

<script>
  import {Index} from "../../../network/home";

  export default {
    name: "Add",
    data() {
      return {
        addForm:{
          title: '',
          introduce: '',
          c_id: 0,
          content: ''
        },
        addFormRules: {
          title: [
            {required: true, message:'请输入文章标题', trigger: 'blur'},
          ],
          introduce: [
            {required: true, message:'请输入文章介绍', trigger: 'blur'},
          ],
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
        },
        cateList: [],
        activeIndex: '0',
        selectedKeys: []
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        let result = await Index(this, 'category', '获取分类');
        this.cateList = result.data
      },
      handleChange() {
        if (this.selectedKeys.length !== 3) {
          this.selectedKeys = []
        }else {
          this.addForm.c_id = this.selectedKeys[2]
        }
      },
      beforeTabLeave(activeName, oldActiveName) {
        if (oldActiveName === '0' && this.selectedKeys.length !== 3) {
          this.$message.error('请先选择分类')
          return false
        }
      },
      add() {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) {
            return this.$message.error('请填写必要的表单项')
          }
          await this.$router.push('/article')
        })
      }
    }
  }
</script>

<style scoped>

</style>