<template>
  <div>
    <transition :name="transitionName">    <!--vue.js内置组件 -->
      <router-view class="Router"></router-view>
    </transition>
    <cube-tab-bar  v-model="selectedLabelDefault" :data="tabs" @click="clickHandler" @change="changeHandler" class="botnav"></cube-tab-bar>
    <span class="countsum">{{countsum}}</span>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'   //导入vuex的getters计算属性的辅助函数
export default {
  data() {
    return {
      transitionName:'slide-right',
      selectedLabelDefault: "首页",
      tabs: [
        {
          label: "首页",
          icon: "cubeic-home"
        },
        {
          label: "分类",
          icon: "cubeic-tag"
        },
        {
          label: "搜索",
          icon: "cubeic-search"
        },
        {
          label: "购物车",
          icon: "cubeic-mall"
        },
        {
          label: "我的",
          icon: "cubeic-person"
        }
      ]
    };
  },
  methods: {
    clickHandler(label) {
      // if you clicked home tab, then print 'Home'
      console.log(label);
    },
    changeHandler(label) {   //点击与当前不同才触发
    console.log(label);
      switch (label) {
        case '首页':
          this.$router.push({path:'/Botnav/Index'})
          break;
        case '购物车':
          this.$router.push({path:'/Botnav/Cart'})
          break;
        case '分类':
          this.$router.push({path:'/Botnav/List'})
          break;
        case '搜索':
          this.$router.push({path:'/Botnav/Search'})
          break;
        case '我的':
          this.$router.push({path:'/Botnav/Mine'})
          break;
        default:
          break;
      }
    }
  },
  created()
  {
    //修改默认选择的底部导航条
    switch (this.$route.path) {
      case '/Botnav/Index':
        this.selectedLabelDefault='首页'
        break;
      case '/Botnav/Cart':
        this.selectedLabelDefault='购物车'
        break;
      case '/Botnav/List':
        this.selectedLabelDefault='分类'
        break;
      case '/Botnav/Search':
        this.selectedLabelDefault='搜索'
        break;
      case '/Botnav/Mine':
        this.selectedLabelDefault='我的'
        break;
      default:
        break;
    }
  },
  computed:{      //通过mapGetters辅助函数获取vuex里面的getters里面的数据赋值给countsum
    ...mapGetters({
      countsum:'countsum'
    })
  }
};
</script>

<style lang="stylus">
    .cube-tab-bar.botnav
        position fixed
        bottom 0
        left 0
        z-index 1000
        width 100%
        background #fff
        .cube-tab div
            font-size 16px
            padding-top 3px
        i 
           font-size 20px
    .Router
        position absolute
        width  100%
        transition all 0.8s ease
    .silde-left-enter,.slide-right-leave-active
        opacity 0
        -webkit-transform  translate(100%,0)
        transform  translate(100%,0)
    .slide-left-leave-active,.slide-right-enter
        opacity 0
        -webkit-transform  translate(-100%,0)
        transform  translate(-100%,0)
    .countsum
      position fixed
      bottom 33px
      right  23%
      z-index 1001
      width 18px
      height 18px
      line-height 18px
      border-radius 50%
      font-size 14px
      background red
      color #ffffff
</style>