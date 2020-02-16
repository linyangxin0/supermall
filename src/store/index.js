import Vue from 'vue'
import Vuex from 'vuex'

import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex)


const store = new Vuex.Store({
  state:{
    cartList:[]
  },
  mutations,
    // mutations的目的是修改state中的状态
    //mutations中的每个方法尽可能完成的单一功能
  actions
})


export default store
