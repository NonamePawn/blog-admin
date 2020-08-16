import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () => import('../views/login/Login')
const Home = () => import('../views/home/Home')
const Welcome = () => import('../views/home/Welcome')
const Users = () => import('../views/home/users/Users')
const Donate = () => import('../views/home/donate/Donate')
const Category = () => import('../views/home/category/Category')
const Comment = () => import('../views/home/comment/Comment')
const About = () => import('../views/home/about/About')
const Article = () => import('../views/home/article/Article')
const Add = () => import('../views/home/article/Add')
const Edit = () => import('../views/home/article/Edit')

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
      {path: '/comments', component: Comment},
      {path: '/about', component: About},
      {path: '/article', component: Article},
      {path: '/article/add', component: Add},
      {path: '/article/edit', component: Edit}
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
