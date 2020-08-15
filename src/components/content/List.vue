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
        <!--搜索与添加区域-->
        <el-row :gutter="20">
          <el-col :span="8">
            <el-input placeholder="请输入内容" clearable @clear="getList" v-model="queryInfo.query">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" @click="addDialogVisibleShow">添加{{keyWord}}</el-button>
          </el-col>
        </el-row>
        <!--列表区域-->
        <el-table :data="list" border stripe style="margin-top: 15px;font-size: 12px">
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
                @close="addDialogClose">
          <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
            <el-form-item :label="item.label" :prop="item.prop" v-for="item in addField">
              <el-input v-model="addForm[item.prop]"></el-input>
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

  export default {
    name: "List",
    props: {
      keyWord: {
        type: String,
        default () {
          return ''
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
          return true
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
        addForm: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      addDialogVisibleShow() {
        this.addDialogVisible = true
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
      edit() {
        let that = this
        this.$refs.editFormRef.validate(async valid => {
          if (!valid) return false
          await Put(that, this.path, '更新'+this.keyWord, this.editForm.id, { email : this.editForm.email})
          this.editDialogVisible = false
          this.getList()
        })
      },
      addDialogClose() {
        this.$refs.addFormRef.resetFields()
      },
      editDialogClose() {
        this.$refs.editFormRef.resetFields()
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
      async getList() {
        let result = await Index(this, this.path, '获取'+this.keyWord, this.queryInfo);
        this.list = result.data
        this.total = result.total
      },
      async StateChange(row) {
        await Put(this, this.path, '更新'+this.keyWord, row.id, {status: row.status})
      },
      async editDialogVisibleShow(id) {
        this.editForm = await Read(this, this.path, '查询'+this.keyWord, id)
        this.editDialogVisible = true
      },
    }
  }
</script>

 <style scoped>

 </style>

