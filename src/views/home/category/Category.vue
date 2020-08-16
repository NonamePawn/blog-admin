<template>
  <div class="category">
    <list
            key-word="分类"
            path="category"
            tips="文章数不为0的分类不可删除"
            :columns="columns"
            :is-tree="true"
            :is-category="true"
            :add-field="addField"
            :add-form-rules="addFormRules"></list>
  </div>
</template>

<script>
  import List from "../../../components/content/List";
  export default {
    name: 'Category',
    components: {
      List
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
            label: '文章数',
            prop: 'count'
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