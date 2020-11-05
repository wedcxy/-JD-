import axios from 'axios'
import store from './store'
import router from './router'

//进行HTTP全局拦截
//token要放在我们请求的headr上，带回去给后端

export default function setAxios()
{
    //请求拦截
    axios.interceptors.request.use(
        config=>{
            if(store.state.token){
                config.headers.token=store.state.token
            }
            return config
        }
    )
    
    

    //每一次请求都是经过这个，进行判断token是否过期
    axios.interceptors.response.use(
        response=>{
            if(response.status == 200)  //状态码==200就是请求成功
            {
                //减少一层data
                const data=response.data;
                if(data.code == -1)  //code对于-1就是token过期了
                {
                    //登录过期，请重新登录，需要清除本地缓存的token和vueX里面存储的token
                    store.commit('setToken','')
                    localStorage.removeItem('token')
                    //跳转到login页面               //跳转方式有两种push()和replace(),区别replace(),不会留下历史记录，然后返回不会返回到上一次
                    router.replace({path:'/Login'})
                }
                return data
            }
            return response
        }
    )
}