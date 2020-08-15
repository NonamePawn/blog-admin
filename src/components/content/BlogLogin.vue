<template>
  <div class="login" :style="'background-image: url('+backgroundImage+');'">
    <!--登录表单-->
    <div class="form" :style="flag ? 'height: 300px' : 'height: 400px'">
      <!--背景图-->
      <img src="" alt="">
      <!--logo图标-->
      <div class="logo">
        <img :src="logoImage" alt="">
      </div>
      <!--登录表单-->
        <el-form
                v-show="flag"
                :class="flag ? 'fade-in' : 'fade-out'"
                style="padding-left: 7%;"
                :model="loginForm"
                ref="loginFormRef"
                :rules="loginFormRules">
          <!--输入框-->
          <el-form-item prop="username" style="width: 90%">
            <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password" style="width: 90%">
            <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <!--操作-->
          <el-form-item class="button">
            <el-button type="primary" @click="login">登录</el-button>
            <el-button type="info" @click="resetLogin()">重置</el-button>
            <el-tag type="warning" style="margin-left: 100px;cursor: pointer" @click="changeForm" v-if="this.scene === 'home'">已注册 -></el-tag>
          </el-form-item>
        </el-form>

      <!--注册表单-->
        <el-form
                v-show="!flag"
                :class="flag ? 'fade-out' : 'fade-in'"
                style="padding-left: 7%;"
                :model="registerForm"
                ref="registerFormRef"
                :rules="registerFormRules">
          <!--输入框-->
          <el-form-item prop="username" style="width: 90%">
            <el-input v-model="registerForm.username" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="password" style="width: 90%">
            <el-input v-model="registerForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
          </el-form-item>
          <el-form-item prop="email" style="width: 90%">
            <el-input v-model="registerForm.email" prefix-icon="el-icon-message" type="email"></el-input>
          </el-form-item>
          <!--操作-->
          <el-form-item class="button">
            <el-button type="success" @click="register">注册</el-button>
            <el-button type="info" @click="resetRegister()">重置</el-button>
            <el-tag type="warning" style="margin-left: 100px;cursor: pointer" @click="changeForm">已有账号 -></el-tag>
          </el-form-item>
        </el-form>
    </div>
    <!--雪花特效-->
    <snow :scene="this.scene"></snow>
  </div>
</template>

<script>
  import Snow from "../../components/common/Snow";

  export default {
    name: "Login",
    components: {
      Snow
    },
    props: {
      scene:{
        type: String,
        default() {
          return 'admin'
        }
      },
    },
    computed: {
      backgroundImage() {
        if (this.scene === 'admin') {
          return 'http://cdn.nonamepawn.cn/admin/img/timg.jfif'
        }else {
          return 'http://cdn.nonamepawn.cn/home/img/backg.jpg'
        }
      },
      logoImage() {
        if (this.scene === 'admin') {
          return 'http://cdn.nonamepawn.cn/admin/img/logo.jpg'
        }else {
          return 'http://cdn.nonamepawn.cn/home/img/logo.jfif'
        }
      },
      flag() {
        return this.isLogin || this.scene === 'admin'
      }
    },
    data() {
      return {
        isLogin: false,
        loginForm: {
          username: '',
          password: ''
        },
        loginFormRules: {
          username:[
            {
              required: true,
              message: "请输入用户名",
              trigger: "blur"},
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符之间",
              trigger: "blur"
            }
          ],
          password:[
            {
              required: true,
              message: "请输入密码",
              trigger: "blur"},
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符之间",
              trigger: "blur"}
          ],
        },
        registerForm: {
          username: '',
          password: '',
          email:''
        },
        registerFormRules: {
          username:[
            {
              required: true,
              message: "请输入用户名",
              trigger: "blur"},
            {
              min: 3,
              max: 20,
              message: "长度在 3 到 20 个字符之间",
              trigger: "blur"
            }
          ],
          password:[
            {
              required: true,
              message: "请输入密码",
              trigger: "blur"},
            {
              min: 6,
              max: 15,
              message: "长度在 6 到 15 个字符之间",
              trigger: "blur"}
          ],
          email:[
            {
              required: true,//是否必填
              message: '请输入邮箱地址',//错误提示信息
              trigger: 'blur'//检验方式（blur为鼠标点击其他地方，）
            },
            {
              type: 'email',//要检验的类型（number，email，date等）
              message: '请输入正确的邮箱地址',
              trigger: ['blur', 'change']
            }
          ]
        },
      }
    },
    methods: {
      //改变表单
      changeForm() {
        this.isLogin = !this.isLogin;
        this.resetRegister()
        this.resetLogin()
      },
      //重置表单
      resetLogin() {
        this.$refs.loginFormRef.resetFields()
      },
      resetRegister() {
        this.$refs.registerFormRef.resetFields()
      },
      //登录验证
      login() {
        this.$refs.loginFormRef.validate( async valid => {
          //验证不通过
          if (!valid) return false;
          //验证通过
          else {
            //发送网络请求
            const {data: result} =  await this.$http.post(this.scene + '/login', this.loginForm)
            //判断请求是否成功
            console.log(result.meta.status );
            if (result.meta.status !== 200) return this.$message.error("登录失败")
            this.$message.success("登录成功")
            //将token保存到客户端的sessionStorage中
            window.sessionStorage.setItem("token", result.data.token)
            //跳转home页面
            await this.$router.push("/home")
          }
        })
      },
      //注册验证
      register() {
        this.$refs.registerFormRef.validate( async valid => {
          //验证不通过
          if (!valid) return false;
          //验证通过
          else {
            //发送网络请求
            const {data: result} =  await this.$http.post(this.scene + '/login', this.registerForm)
            //判断请求是否成功
            console.log(result.meta.status );
            if (result.meta.status !== 200) return this.$message.error("注册失败")
            this.$message.success("注册成功")
            //跳转home页面
            await this.$router.push("/home")
          }
        })
      }
    }
  }
</script>

<style scoped>
  .login {
    width: 100%;
    height: 100vh;
    background-size: 100%;
    opacity: 0.8;
  }

  .logo {
    width: 100%;
    height: 30%;

    position: relative;
  }

  .logo img {
    max-height: 150%;
    max-width: 150%;
    position: absolute;
    left: 50%;
    right: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 10px solid rgba(255, 207, 215, 0.9);
    box-shadow: 0 0 20px rgba(255, 213, 229, 0.9);
  }

  .form {
    transition: 1s;
    width: 400px;
    height: 300px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border-radius: 6px;
    opacity: 0.93;
    box-shadow: 0 0 10px pink;
  }

  .fade-in {
    animation: fade-in 1.5s;
  }

  .fade-out {
    animation: fade-out 1.5s;
  }

  @keyframes fade-in
  {
    from {opacity: 0}
    to {opacity: 1;}
  }

  @keyframes fade-out
  {
    from {opacity: 1}
    to {opacity: 0;}
  }
</style>