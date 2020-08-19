<template>
  <div class="about">
    <!--卡片区域-->
    <el-card style="height: 82vh">
      <el-tabs
              style="margin-top: 10px"
              v-model="active"
              type="card"
              editable
              @edit="edit">
        <el-tab-pane
                v-for="item in list"
                :key="item.id"
                :label="item.options"
                :name="item.id+''">
          <el-alert
                  style="margin-bottom: 5px"
                  title="最后更新时间"
                  type="success"
                  :description="item.update_time"
                  show-icon>
          </el-alert>
          <mavon-editor v-model="item.content" :toolbars="toolbars" @save="save(item)" style="height: 360px"/>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <!--添加操作的对话框-->
    <el-dialog
            title="添加选项"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClose">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item label="选项名称" prop="options">
          <el-input v-model="addForm.options"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="add">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import {Delete, Index, Put, Save} from "../../../network/home";

  export default {
    name: 'About',
    data() {
      return {
        list: [],
        total: 0,
        addDialogVisible: false,
        addForm: {
          options: ''
        },
        addFormRules: {
          options: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
          ]
        },
        active: '1',
        content: ' ',//输入的数据
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
      this.getList()
    },
    methods: {
      async getList() {
        let result = await Index(this, 'about', '获取选项');
        this.list = result.data
        this.total = result.total
      },
      addTab() {
        this.addDialogVisible = true
      },
      addDialogClose() {
        this.$refs.addFormRef.resetFields()
      },
      add() {
        let that = this
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return false
          await Save(that, 'about', '添加选项', this.addForm);
          this.addDialogVisible = false
          this.getList()
        })
      },
      edit(targetName, action) {
        if (action === 'add') this.addTab()
        if (action === 'remove') this.removeTab()
      },
      async save(row){
        await Put(this, 'about', '更新', row.id, {content: row.content})
        this.getList()
      },
      removeTab(id) {
        let that = this
        this.$confirm('此操作将永久删除该选项, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await Delete(that, 'about', '删除选项', id)
          this.getList()
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'})
        });
      }
    }
  }

</script>

<style scoped>

</style>