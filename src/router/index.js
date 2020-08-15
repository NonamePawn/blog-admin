import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login')
const Home = () => import('../views/home/Home')
const Welcome = () => import('../views/home/Welcome')
const Users = () => import('../views/home/users/Users')
const Donate = () => import('../views/home/donate/Donate')
const Category = () => import('../views/home/category/Category')
const Comment = () => import('../views/home/comment/Comment')

Vue.use(VueRouter)

  const routes = [
  {
    path: '',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {path: '/welcome', component: Welcome},
      {path: '/users', component: Users},
      {path: '/donate', component: Donate},
      {path: '/category', component: Category},
      {path: '/comments', component: Comment}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
