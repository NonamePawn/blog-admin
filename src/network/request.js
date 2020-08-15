import Vue from 'vue'
import axios from "axios"

//配置请求根路径
axios.defaults.baseURL = 'http://tp6.com/index.php/'
//配置请求拦截器
axios.interceptors.request.use(configs => {
  configs.headers.Authorization = window.sessionStorage.getItem('token')
  return configs
})
axios.interceptors.response.use(configs => {
  return configs
})
//将axios挂载到Vue原型上
Vue.prototype.$http = axios