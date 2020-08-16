<template>
  <div class="comment">
    <List
            key-word="评论"
            path="comment"
            tips="请在搜索框中输入文章ID进行搜索"
            :is-add="false"
            :is-tree="true"
            :add-field="addField"
            :columns="columns"></List>
  </div>
</template>

<script>
  import List from "../../../components/content/List";
  export default {
    name: "Comment",
    components: {
      List
    },
    data() {
      return {
        columns: [
          {
            label: '评论人名称',
            prop: 'username'
          },
          {
            label: '评论文章标题',
            prop: 'title',
            width: 150
          },
          {
            label: '评论时间',
            prop: 'time',
            width: 150
          },
          {
            label: '是否通过',
            type: 'template',
            template: 'status',
            width: 90
          },
          {
            label: '排序',
            type: 'template',
            template: 'order',
            width: 70
          },
          {
            label: '操作',
            type: 'template',
            template: 'OP',
            width: 280
          }
        ],
        addField: {
          0: {
            label: '评论者',
            prop: 'username',
            disabled: true
          },
          1: {
            label: '所属文章',
            prop: 'title',
            disabled: true
          },
          2: {
            label: '回复内容',
            prop: 'comment',
            disabled: false
          }
        },
        addFormRules: {
          content: [
            { required: true, message:'请输入回复内容', trigger: 'blur'}
          ]
        },
      }
    }
  }
</script>

<style scoped>

</style>