<template>
    <div>
        <img class="headerimg" src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png" alt="">
       <cube-form
            :model="model"
            :schema="schema"
            @submit="submitHandler">
       </cube-form>
    </div>
</template>

<script>
export default {
    data(){
        return{
            model:{
                username:'',
                password:''
            },
            schema:{
                fields:[
                    //用户名配置
                    {
                        type:'input',
                        modelKey:'username',
                        label:'用户名',
                        props:{
                            placeholder:'请输入用户名',
                        },
                        rules:{
                            //校验规则
                            required:true,
                            type:'string',
                            min:3,
                            max:15,
                        },
                        trigger: 'blur',
                        messages:{
                            required:'用户名不能为空',
                            min:'用户名不能少于3个字符',
                            max:'用户名不能大于15个字符'
                        }
                    },
                    //密码配置
                    {
                        type:'input',
                        modelKey:'password',
                        label:'密码',
                        props:{
                            placeholder:'请输入密码',
                            type:'password',
                            eye:{
                                open:false,
                            }
                        },
                        rules:{
                            required:true,
                        },
                        trigger:'blur',
                    },
                    {
                        type:'submit',
                        label:'登录'
                    }
                ]
            }
        }
    },
    methods:{
       async submitHandler(e){
            e.preventDefault()
            try{
                const result=await this.$http.get('/api/login',{params:this.model})
                if(result.code=='0'){
                    this.$store.commit('settoken',result.token)
                    window.localStorage.setItem('token',result.token)
                   

                    //判断路由是否带参，带参就去到重定向参数地址，否则就去首页
                    if(this.$route.query.redirect)    //注意这里是$route不是$router
                    {
                        this.$router.replace({path:this.$route.query.redirect})   //如果是点击我的页面因为没有token才重新登录的话，登录之后又跳转回我的页面this.$router.query.redirect就是带着路由地址
                    }else
                    {
                         //跳转到首页
                        this.$router.replace({path:'/botnav/Index'})
                        
                    }

                }else{
                     alert(result.message)
                }
            }catch(err){
                console.log(err)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .headerimg
        height  150px
        width  100%
</style>


