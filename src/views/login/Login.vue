<template>
  <div class="login">
    <!--博客登录组件-->
    <blog-login scene="admin"></blog-login>
<!--    <blog-login scene="home"></blog-login>-->
  </div>
</template>

<script>
  import BlogLogin from "../../components/content/BlogLogin";
  export default {
    name: "Login",
    components: {
      BlogLogin
    },
  }

</script>

<style scoped>

</style>