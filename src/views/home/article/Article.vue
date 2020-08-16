<template>
  <div class="article">
    <list
            key-word="文章"
            path="article"
            tips="文章评论数不为0是不可删除"
            :go-to-add="true"
            :field="field"
            :add-field="addField"
            :edit-field="editField"></list>
  </div>
</template>

<script>
  import List from "../../../components/content/List";
  export default {
    name: "Article",
    components: {
      List
    },
    data() {
      return {
        field: {
          0: {
            'label': '文章标题',
            'prop': 'title',
          },
          1: {
            'label': '文章介绍',
            'prop': 'introduce',
          },
          2: {
            'label': '创建时间',
            'prop': 'create_time',
            'width': '150px'
          },
          3: {
            'label': '最后更新时间',
            'prop': 'update_time',
            'width': '150px'
          },
          4: {
            'label': '阅读数',
            'prop': 'readings',
            'width': '60px'
          },
          5: {
            'label': '点赞数',
            'prop': 'likes',
            'width': '60px'
          },
          6: {
            'label': '评论数',
            'prop': 'count',
            'width': '60px'
          },
          7: {
            'label': '所属分类',
            'prop': 'name',
          }
        },
        addField: {

        },
        editField: {}
      }
    }
  }
</script>

<style scoped>

</style>