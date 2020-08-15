<template>
  <div class="category">
    <tree
            key-word="分类"
            path="category"
            :columns="columns"
            :add-field="addField"
            :add-form-rules="addFormRules"></tree>
  </div>
</template>

<script>
  import Tree from "../../../components/content/Tree";
  export default {
    name: 'Category',
    components: {
      Tree
    },
    data() {
      return {
        columns: [
          {
            label: '分类名称',
            prop: 'name'
          },
          {
            label: '创建时间',
            prop: 'create_time'
          },
          {
            label: '排序',
            type: 'template',
            template: 'order'
          },
          {
            label: '操作',
            type: 'template',
            template: 'OP'
          }
        ],
        addField: {
          0: {
            label: '分类名称',
            prop: 'name',
            disabled: false
          }
        },
        addFormRules: {
          name: [
            { required: true, message:'请输入分类名称', trigger: 'blur'}
          ]
        },
      }
    }
  }

</script>

<style scoped>

</style>