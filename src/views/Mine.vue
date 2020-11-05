<template>
    <div class="Search">
        <img class="headerimg" src="https://xd-video-pc-img.oss-cn-beijing.aliyuncs.com/xdclass_pro/bannner/1901/learn.png" alt="">
        <ul>
            <li v-for="item in minearry" :key="item.label" @click="itemclick(item)" class="mineitm">
                <span class="minetitle">{{item.label}}</span>
                <i class="cubeic-arrow"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    data()
    {
        return{
            minearry:[
                {label:'商品收藏'},
                {label:'我的足迹'},
                {label:'店铺收藏'},
                {label:'我的订单'},
                {label:'退出',type:'exit'}
            ]
        }
    },
    methods:{
        itemclick(item)
        {
            if(item.type=='exit')   //因为只有退出有type属性，所以判断点击了那个属性
            {
                //清除vuex和本地缓存的token数据
                this.$store.commit('settoken','');
                localStorage.removeItem('token');
                this.$router.push({path:'/Login'})
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    .mineitm
        font-size 14px
        text-align left 
        height 50px
        line-height 50px
        padding-left 5%
        border-bottom 1px solid #eee
        .minetitle
            display inline-block
            width 90%
    .headerimg
        height  150px
        width  100%
</style>