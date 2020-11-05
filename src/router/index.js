import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import Index from '@/views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/Login'
  },
  {
    path: '/Register',
    name: 'Register',
    component: Register
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/botnav',  //底部导航页面
    name: 'botnav',
    component:() => import('@/views/Botnav.vue'),  //注意：1.二级路由是懒加载，父级路由也必须是懒加载  2.二级路由的path里面是不需要添加'/'的
    children:[
      {
        path: 'index',  //首页
        name: 'index',
        component: () => import('@/views/Index.vue')
      },
      {
        path: 'list',   //分类
        name: 'list',
        component: () => import('@/views/List.vue')
      },
      {
        path: 'search',  //搜索
        name: 'search',
        component: () => import('@/views/Search.vue')
      },
      {
        path: 'cart',    //购物车
        name: 'cart',
        meta:{
          requireAuth:true,//当有这个字段的时候，我们就认为他这个路由页面是要有登录权限的
        },
        component: () => import('@/views/Cart.vue')
      },
      {
        path: 'mine',    //我的
        name: 'mine',
        meta:{
          requireAuth:true,//当有这个字段的时候，我们就认为他这个路由页面是要有登录权限的
        },
        component: () => import('@/views/Mine.vue')
      },
    ]
  },
  {
    path:'/Index',
    name:Index,
    component:() => import('../views/Index.vue')
    // history
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
