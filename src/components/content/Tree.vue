<template>
  <div>
    <!--面包屑区域-->
    <el-breadcrumb separator-class="el-icon-arrow-right" style="margin-bottom: 15px">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{keyWord}}管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{keyWord}}列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!--卡片区域-->
    <el-card>
      <el-alert title="请在搜索框输入文章ID进行查询" type="warning" v-if="!isAdd" style="margin-bottom: 15px">
      </el-alert>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" clearable @clear="getList" v-model="queryInfo.query">
            <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4" v-if="isAdd">
          <el-button type="primary" @click="showAddDialog">添加{{keyWord}}</el-button>
        </el-col>
      </el-row>
      <!--树形列表-->
      <tree-table
              style="margin-top: 15px;font-size: 12px"
              :data="list"
              :columns="columns"
              :selection-type="false"
              :expand-type="false"
              show-index
              :show-row-hover="true"
              :tree-type="true"
              index-text="#"
              border>
        <template slot="status" slot-scope="scope" v-if="hasStatus">
          <el-switch v-model="scope.row.status" @change="StateChange(scope.row)"></el-switch>
          <el-tag size="mini" style="margin-left: 5px; border-radius: 50%" type="info">{{scope.row.a_id}}</el-tag>
        </template>
        <template slot="order" slot-scope="scope">
          <el-tag type="primary" size="mini" v-if="scope.row.level === 1">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.level === 2">二级</el-tag>
          <el-tag type="warning" size="mini" v-else-if="scope.row.level === 3">三级</el-tag>
          <el-tag type="info" size="mini" v-else>四级</el-tag>
        </template>
        <template slot="OP" slot-scope="scope">
          <el-button type="success" icon="el-icon-s-comment" size="mini" @click="ViewContent(scope.row.comment)" v-if="isView">查看</el-button>
          <el-button type="warning" icon="el-icon-s-promotion" size="mini" @click="showReplyDialog(scope.row)" v-if="isReply">回复</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteByID(scope.row.id)">删除</el-button>
        </template>
      </tree-table>
      <!--分页区域-->
      <el-pagination
              style="margin-top: 15px"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pageNum"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="queryInfo.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </el-card>
    <!--添加分类的对话框-->
    <el-dialog
            :title="'添加' + keyWord"
            :visible.sync="addDialogVisible"
            width="50%"
            @close="addDialogClosed">
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="80px">
        <el-form-item :label="item.label" :prop="item.prop" v-for="item in addField">
          <el-input v-model="addForm[item.prop]" :disabled="item.disabled" ></el-input>
        </el-form-item>
        <el-form-item label="父级分类" v-if="isAdd">
          <el-cascader
                  style="width: 100%"
                  v-model="selectedKeys"
                  :options="list"
                  :props="{
                      expandTrigger: 'hover',
                      value: 'id',
                      label: 'name',
                      children: 'children',
                      checkStrictly: true
                    }"
                  @change="ParentChanged"
                  clearable
          ></el-cascader>
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
  import {Delete, Index, Put, Save} from "../../network/home";

  export default {
    name: "Tree",
    props: {
      keyWord: {
        type: String,
        default() {
          return ''
        }
      },
      path: {
        type: String,
        default() {
          return ''
        }
      },
      columns: {
        type: Array,
        default() {
          return {}
        }
      },
      isAdd: {
        type: Boolean,
        default() {
          return true
        }
      },
      isView: {
        type: Boolean,
        default() {
          return false
        }
      },
      isReply: {
        type: Boolean,
        default() {
          return false
        }
      },
      hasStatus: {
        type: Boolean,
        default() {
          return false
        }
      },
      addField: {
        type: Object,
        default() {
          return {}
        }
      },
      addFormRules: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        list: [],
        queryInfo: {
          query: '',
          pageNum: 1,
          pageSize: 5
        },
        total: 0,
        addDialogVisible: false,
        selectedKeys: [],
        addForm: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      async getList() {
        let result = await Index(this, this.path, '获取'+this.keyWord, this.queryInfo);
        this.list = result.data
        this.total = result.total
      },
      showAddDialog() {
        this.addDialogVisible = true
      },
      showReplyDialog(row) {
        this.addForm.username = row.username
        this.addForm.title = row.title
        this.addForm.p_id = row.u_id
        this.addForm.a_id = row.a_id
        this.addForm.u_id = 1
        this.addForm.content = ''
        this.addDialogVisible = true
      },
      addDialogClosed() {
        this.$refs.addFormRef.resetFields()
        this.selectedKeys = []
        this.addForm.p_id =  0
      },
      ViewContent(comment) {
        this.$notify({
          title: '评论内容',
          message: comment,
        });
      },
      ParentChanged() {
        if (this.selectedKeys.length > 0){
          this.addForm.p_id = this.selectedKeys[this.selectedKeys.length - 1]
        }else {
          this.addForm.p_id =  0
        }
      },
      add() {
        let that = this
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return
          await Save(that, this.path, '添加'+this.keyword, this.addForm);
          this.getList()
          this.addDialogVisible = false
        })
      },
      handleSizeChange(newValue){
        this.queryInfo.pageSize = newValue
        this.getList()
      },
      handleCurrentChange(newValue){
        this.queryInfo.pageNum = newValue
        this.getList()
      },
      async StateChange(row) {
        await Put(this, this.path, '更新'+this.keyWord, row.id, {status: row.status})
      },
      deleteByID(id) {
        let that = this
        this.$confirm('此操作将永久删除该'+this.keyWord+', 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await Delete(that, this.path, '删除'+this.keyWord, id)
          this.getList()
        }).catch(() => {
          this.$message({type: 'info', message: '已取消删除'})
        });
      },
    }
  }
</script>

<style scoped>

</style>