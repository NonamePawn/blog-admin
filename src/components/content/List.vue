<template>
    <div>
      <!--面包屑区域-->
      <bread-crumb :key-word="keyWord"></bread-crumb>
      <!--卡片区域-->
      <el-card>
        <el-alert :title="tips" type="warning" v-if="tips" style="margin-bottom: 15px"></el-alert>
        <!--搜索与添加区域-->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" clearable @clear="getList" v-model="queryInfo.query">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4"  v-if="isAdd">
            <el-button type="primary" @click="showAddDialog">添加{{keyWord}}</el-button>
          </el-col>
        </el-row>
        <!--树形列表-->
        <tree-table
                v-if="isTree"
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
          <template slot="status" slot-scope="scope" v-if="!isCategory">
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
            <el-button type="success" icon="el-icon-s-comment" size="mini" @click="ViewContent(scope.row)" v-if="!isCategory">查看</el-button>
            <el-button type="warning" icon="el-icon-s-promotion" size="mini" @click="showReplyDialog(scope.row)" v-if="!isCategory">回复</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteByID(scope.row.id)">删除</el-button>
          </template>
        </tree-table>
        <!--普通列表区域-->
        <el-table
                v-else
                :data="list"
                border
                stripe
                style="margin-top: 15px;font-size: 12px">
          <el-table-column type="index"></el-table-column>
          <el-table-column :label="item.label" :prop="item.prop" :width="item.width" v-for="item in field"></el-table-column>
          <el-table-column label="状态" width="70px" v-if="hasStatus">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.status" @change="StateChange(scope.row)"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120px">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDialogVisibleShow(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteByID(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
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
        <!--添加操作的对话框-->
        <el-dialog
                :title="'添加'+keyWord"
                :visible.sync="addDialogVisible"
                width="50%"
                @close="closeAddDialog">
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
            <el-form-item :label="item.label" :prop="item.prop" v-for="item in addField">
              <el-input v-model="addForm[item.prop]" :disabled="item.disabled"></el-input>
            </el-form-item>
            <el-form-item label="父级分类" v-if="isCategory">
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
        <!--修改操作的对话框-->
        <el-dialog
                :title="'修改'+keyWord"
                :visible.sync="editDialogVisible"
                width="50%"
                @close="editDialogClose">
          <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="70px">
            <el-form-item :label="item.label" v-for="item in editField">
              <el-input v-model="editForm[item.prop]" :disabled="item.disabled"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
          <el-button @click="eidtDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="edit">确 定</el-button>
        </span>
        </el-dialog>
      </el-card>
    </div>
</template>

<script>
  import {Delete, Index, Put, Read, Save} from "../../network/home";
  import BreadCrumb from "./BreadCrumb";

  export default {
    name: "List",
    components: {
      BreadCrumb
    },
    props: {
      keyWord: {
        type: String,
        default () {
          return ''
        }
      },
      isAdd: {
        type: Boolean,
        default() {
          return true
        }
      },
      isTree: {
        type: Boolean,
        default() {
          return false
        }
      },
      isCategory: {
        type: Boolean,
        default() {
          return false
        }
      },
      goToAdd: {
        type: Boolean,
        default() {
          return false
        }
      },
      tips: {
        type: String,
        default() {
          return ''
        }
      },
      columns: {
        type: Array,
        default() {
          return []
        }
      },
      field: {
        type: Object,
        default () {
          return {}
        }
      },
      hasStatus: {
        type: Boolean,
        default() {
          return false
        }
      },
      path: {
        type: String,
        default() {
          return ''
        }
      },
      addField: {
        type: Object,
        default() {
          return {}
        }
      },
      editField: {
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
      },
      editFormRules: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        // 请求信息
        queryInfo: {
          query: '',
          pageNum: 1,
          pageSize: 5
        },
        // 列表数据
        list: [],
        // 总数
        total: 0,
        addDialogVisible: false,
        editDialogVisible: false,
        editForm: {},
        addForm: {},
        selectedKeys: [],
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
        if (this.goToAdd) {
          this.$router.push('/article/add')
        }
        else{
          this.addDialogVisible = true
        }
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
      ViewContent(row) {
        this.$notify({
          title: row.username,
          message: row.comment,
        });
      },
      async StateChange(row) {
        await Put(this, this.path, '更新'+this.keyWord, row.id, {status: row.status})
      },
      closeAddDialog() {
        if (this.isCategory) {
          this.selectedKeys = []
          this.addForm.p_id =  0
        }
        this.$refs.addFormRef.resetFields()
      },
      add() {
        let that = this
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return false
          await Save(that, this.path, '添加'+this.keyWord, this.addForm);
          this.addDialogVisible = false
          this.getList()
        })
      },
      async editDialogVisibleShow(id) {
        if (this.goToAdd) {
          await this.$router.push({path:'/article/edit',query:{a_id:id}})
        }
        this.editForm = await Read(this, this.path, '查询'+this.keyWord, id)
        this.editDialogVisible = true
      },
      editDialogClose() {
        this.$refs.editFormRef.resetFields()
      },
      edit() {
        let that = this
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return false
          await Put(that, this.path, '更新'+this.keyWord, this.editForm.id, this.editForm)
          this.editDialogVisible = false
          this.getList()
        })
      },
      ParentChanged() {
        if (this.selectedKeys.length > 0){
          this.addForm.p_id = this.selectedKeys[this.selectedKeys.length - 1]
        }else {
          this.addForm.p_id =  0
        }
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
      handleSizeChange(newValue){
        this.queryInfo.pageSize = newValue
        this.getList()
      },
      handleCurrentChange(newValue){
        this.queryInfo.pageNum = newValue
        this.getList()
      },
    }
  }
</script>

 <style scoped>

 </style>

