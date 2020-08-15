<template>
  <div class="donate">
    <list
            key-word="赞助人"
            path="donate"
            :has-status="false"
            :field="field"
            :edit-form-rules="editFormRules"
            :add-form-rules="addFormRules"
            :add-field="addField"
            :edit-field="editField"></list>
  </div>
</template>

<script>
  import List from "../../../components/content/List";
  export default {
    name: "Donate",
    components: {
      List
    },
    data() {
      return {
        // 显示表格字段
        field: {
            0: {
              'label': '名称',
              'prop': 'name'
            },
            1: {
              'label': '金额',
              'prop': 'amount'
            },
            2: {
              'label': '赞助时间',
              'prop': 'time'
            },
            3: {
              'label': '备注',
              'prop': 'remarks'
            }
        },
        // 添加表格字段
        addField: {
          0: {
            'label': '名称',
            'prop': 'name'
          },
          1: {
            'label': '金额',
            'prop': 'amount'
          },
          3: {
            'label': '备注',
            'prop': 'remarks'
          }
        },
        // 修改表格字段
        editField: {
          0: {
            'label': '名称',
            'prop': 'name',
            'disabled': true
          },
          1: {
            'label': '金额',
            'prop': 'amount',
            'disabled': false
          },
          2: {
            'label': '备注',
            'prop': 'remarks',
            'disabled': false
          }
        },
        // 添加表格字段规则
        addFormRules: {
          name: [
            {required: true, message: '请输入名称', trigger: 'blur'},
          ],
          amount: [
            {required: true, message: '请输入金额', trigger: 'blur'},
          ],
          remarks: [
            {required: true, message: '请输入备注', trigger: 'blur'},
          ]
        },
        // 修改表格字段规则
        editFormRules: {
          amount: [
            {required: true, message: '请输入金额', trigger: 'blur'},
          ],
          remarks: [
            {required: true, message: '请输入备注', trigger: 'blur'},
          ]
        }
      }
    }
  }
</script>

<style scoped>

</style>