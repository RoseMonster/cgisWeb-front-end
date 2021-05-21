// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Icon } from 'ant-design-vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios' //引入axios

Vue.use(ElementUI);
Vue.prototype.$axios=axios
Vue.config.productionTip = false

// 设置后端请求地址
axios.defaults.baseURL='http://localhost:8089'

Vue.component(Icon.name,Icon)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
