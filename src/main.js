import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";

import FastClick from 'fastclick'
import toast from 'components/common/toast'

Vue.config.productionTip = false

//new一个事件总线实例
Vue.prototype.$bus=new Vue()

//安装toast插件
Vue.use(toast)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')


//解决移动端300秒延迟
FastClick.attach(document.body)
