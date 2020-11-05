import Vue from 'vue'
import './cube-ui'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import axios from 'axios'
import setAxios from './setaxios.js'

Vue.config.productionTip = false

//执行setAxios拦截器函数
setAxios()

//进行vue原形挂载
Vue.prototype.$http=axios


//路由守卫
router.beforeEach((to,from,next)=>{
  //无论是刷新还是路由跳转，第一个进入的就是这个路由前置构子函数

  //1.因为刷新会导致vuex里面的token消失，所以这里需要给vueX里面的token进行重新赋值
  store.commit('settoken',localStorage.getItem('token'))

  //2.因为只有购物车和我的页面拥有meta配置
  if(to.meta.requireAuth)
  {
    //3.如果有token就可以访问购物车和我的页面
    if(store.state.token)
    {
       next()
    }else   //4.没有就跳转到登录页面进行token的重新赋值
    {
      next({
        path:'/Login',
        query:{redirect:to.fullPath}   //带上参数给登录页面进行重新跳转到购物车页面
      })
    }
  }else
  {
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
