<template>
  <div class="panelsbox">
    <cube-scroll class="leftpanels">
        <ul>
            <li v-for="(list,index) in tabslabel" :key="index" @click="selectlist(index)" :class="list.active?'active':''">
                {{list.label}}
            </li>
        </ul>
    </cube-scroll>
    <cube-scroll class="rightpanels">
        <ul>
            <li v-for="(tag,index) in tags" :key="index" >
                <img :src="tag.image" alt="">
                <p>{{tag.label}}<i class="cubeic-add" @click="addtocart($event,tag)"></i></p>
            </li>
        </ul>
    </cube-scroll>
   <div class="ball-wrap">
       <transition @before-enter="beforeEnter" @enter="enter" @afterEnter="afterEnter">
           <div class="ball">
               <div class="inner">
                   <i class="cubeic-add"></i>
               </div>
           </div>
       </transition>
   </div>
  </div>
</template>

<script>
export default {
    data()
    {
        return{
            tags:[],   //分类右边的数据
            tabslabel:[  //分类列表数据
                {label:'热门推荐',active:true},
                {label:'手机数码',active:false},
                {label:'家用电器',active:false},
                {label:'家用空调',active:false},
                {label:'电脑产品',active:false},
                {label:'计生情趣',active:false},
                {label:'美妆护肤',active:false},
                {label:'口红',active:false},
                {label:'手袋',active:false},
                {label:'金银财宝',active:false},
                {label:'电脑产品',active:false},
                {label:'计生情趣',active:false},
                {label:'美妆护肤',active:false},
                {label:'口红',active:false},
                {label:'手袋',active:false},
                {label:'金银财宝',active:false},
            ]
        }
    },
    methods:{
        //点击选择分类
        selectlist(index)
        {
            //遍历tabslabel数组进行active样式的添加
            this.tabslabel.forEach((val,ind)=>{
                if(index==ind)
                {
                    val.active=true
                }else
                {
                    val.active=false
                }
            })

            //根据点击分类的index，进行请求不同的数据
            this.getclassify(index)
        },

        //获取分类数据
       async getclassify(index)
        {
            const result=await this.$http.get('/api/classify',{params:{type:index}})
            this.tags=result.data
        },

        //添加商品到达购物车
        addtocart(e,tag)
        {
            this.$store.commit('tocart',tag)
        }
    },
    created()
    {
        //获取默认的分类数据
        this.getclassify(0)
    },
    mounted()  
    {
        //设置滚动条高度随显示屏高度变化而变化

        // //1.获取两个css的dom元素
        const leftpanels=document.querySelector('.leftpanels')
        const rightpanels=document.querySelector('.rightpanels')  
        
        // //2.获取显示屏可视化高度
        const bodyheight=document.documentElement.clientHeight

        // //3.设置分类两边的高度，并且需要减去底部导航条的57px
        leftpanels.style.height=bodyheight-57+'px'
        rightpanels.style.height=bodyheight-57+'px'
    }
};
</script>

<style lang="stylus" scoped>
    .panelsbox
        display flex
        .leftpanels
            width 30%
            li
                height 50px
                line-height 50px
                border-bottom 1px solid #fff
                color #333
                background #f8f8f8
                font-size  14px
            .active
                background #fff
                color #e93b3d
        .rightpanels
            width 70%
            ul
                display flex
                flex-wrap  wrap
                li
                    width 50%
                    justify-content center
                    align-items center
                    font-size 15px
                    img 
                        width 80px
                        height  80px
                    .cubeic-add
                        font-size 18px
</style>