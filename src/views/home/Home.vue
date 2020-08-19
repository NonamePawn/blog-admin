<template>
  <!--头部区域-->
  <el-container class="home">
    <el-header class="header">
      <div>
        <img src="http://cdn.nonamepawn.cn/admin/img/logo.png" alt="">
        <span>后台管理系统</span>
      </div>
      <el-button @click="exit">退出</el-button>
    </el-header>

    <!--页面主体区域-->
    <el-container>
      <!--侧边栏区域-->
      <el-aside class="aside" :width="isCollapse ? '64px' : '200px'">
        <el-button type="info" @click="Collapse" style="width: 100%; letter-spacing: 0.1em">|||</el-button>
        <!--菜单区域-->
        <el-menu
                background-color="#333744"
                text-color="#fff"
                active-text-color="#4098FF"
                unique-opened
                style="border: 0"
                :collapse="isCollapse"
                :collapse-transition="false"
                router>
          <!--一级菜单-->
          <el-submenu :index="item.id + '' " v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="icons[item.id]"></i>
              <span>{{item.name}}</span>
            </template>
            <!--二级菜单-->
            <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id">
              <template>
                <i class="el-icon-menu"></i>
                <span>{{subItem.name}}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <!--右侧内容主体区域-->
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import {Index} from "../../network/home";

  export default {
    name: "Home",
    data() {
      return {
        isCollapse: false,
        icons:{
          '1': 'el-icon-user-solid',
          '3': 'el-icon-s-grid',
          '5': 'el-icon-s-fold',
          '7': 'el-icon-s-comment',
          '9': 'el-icon-s-finance',
          '10': 'el-icon-s-cooperation',
          '12': 'el-icon-s-data',
        },
        menuList: []
      }
    },
    async created() {
      // 获取菜单数据
      let result = await Index(this,'manager','获取路径', {}, false);
      this.menuList = result.data
    },
    methods: {
      exit() {
        window.sessionStorage.clear()
        this.$router.push('/login')
      },
      Collapse() {
        this.isCollapse = !this.isCollapse
      }
    }
  }
</script>

<style scoped>
  .home {
    height: 100%;
  }
  .header {
    background-color: #40474c;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    font-size: 20px;
  }
  .header div {
    display: flex;
    align-items: center;
  }
  .header img {
    width: 9%;
    margin-right: 10px;
  }
  .aside {
    transition: .2s;
    background-color: #3e4252;
  }
  .main {
    height: calc(100vh - 60px);
  }
</style>