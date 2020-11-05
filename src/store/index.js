import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    token: '',
    cartarry: JSON.parse(localStorage.getItem('cartarry')) || [],//存储购物车商品的数组
  },
  mutations: {
    
    //设置vuex的token
    settoken(state, token) {
      state.token = token
    },

    //添加商品到购物车
    tocart(state, tag) {

      //1.判断Vuex里面的购物车内容和新添加购物车内容是否有相同的，返回的内容是那个同样的数据
      let goods = state.cartarry.find(v => v.title == tag.label)

      //2.如果这个商品存在，调用这个vuex函数，商品数量就加1，如果没有这个商品就进行商品数据的添加
      if (goods) {
        //商品存在就数量加1
        goods.cartCount += 1
      } else {
        //商品不存在就添加商品数据
        state.cartarry.push({ title: tag.label, cartCount: 1 })
      }
    },

    //购物车商品数量加一
    cartadd(state, index) {
      state.cartarry[index].cartCount++
    },
    //购物车商品数量减一
    cartremove(state, index) {
      if (state.cartarry[index].cartCount > 1) {
        state.cartarry[index].cartCount--
      } else {
        if (window.confirm('确定从购物车移除商品吗？')) {
          state.cartarry.splice(index, 1)
        }
      }
    },
    //清空购物车
    clearcart(state) {
      state.cartarry = []
    }
  },
  actions: {

  },
  //相当于我们vue 计算属性
  getters: {
    countsum: state => {
      let num = 0
      state.cartarry.forEach(v => {
        num += v.cartCount
      })
      return num
    }
  }
})

//监听每次调用mutations的时候,都会进这个方法，然后我们可以做一些自己想做的处理
store.subscribe((mutations, state) => {
  localStorage.setItem('cartarry', JSON.stringify(state.cartarry))
})
export default store
