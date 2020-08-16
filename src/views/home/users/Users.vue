<template>
  <div class="user">
    <list
            key-word="用户"
            path="users"
            :field="field"
            :has-status="true"
            :edit-form-rules="editFormRules"
            :add-form-rules="addFormRules"
            :add-field="addField"
            :edit-field="editField"></list>
  </div>
</template>

<script>
  import List from "../../../components/content/List";
  export default {
    name: "Users",
    components: {
      List
    },
    data() {
      return {
        // 显示表格字段
        field: {
          0: {
            'label': '姓名',
            'prop': 'username',
            'width': '130px'
          },
          1: {
            'label': '邮箱',
            'prop': 'email',
            'width': ''
          },
          2: {
            'label': '上次登录时间',
            'prop': 'last_login_time',
            'width': '150px'
          },
          3: {
            'label': '上次登录IP',
            'prop': 'last_login_IP',
            'width': '90px'
          },
          4: {
            'label': '登录总次数',
            'prop': 'login_times',
            'width': '85px'
          },
          5: {
            'label': '用户权限',
            'prop': 'power',
            'width': '70px'
          }
        },
        // 添加表格字段
        addField: {
          0: {
            'label': '用户名',
            'prop': 'username'
          },
          1: {
            'label': '密码',
            'prop': 'password'
          },
          2: {
            'label': '邮箱',
            'prop': 'email'
          },
        },
        // 修改表格字段
        editField: {
          0: {
            'label': '用户名',
            'prop': 'username',
            'disabled': true
          },
          1: {
            'label': '邮箱',
            'prop': 'email',
            'disabled': false
          }
        },
        // 添加表格字段规则
        addFormRules: {
          username: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3,max: 10, message: "用户名长度在3~10字符之间", trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6,max: 16, message: "密码长度在6~16字符之间", trigger: 'blur'}
          ],
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ]
        },
        // 修改表格字段规则
        editFormRules: {
          email: [
            {required: true, message: '请输入邮箱', trigger: 'blur'},
            {type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
          ],
        }
      }
    }
  }
</script>

<style scoped>

</style>