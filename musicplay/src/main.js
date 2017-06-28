// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import axios from 'axios'
import $ from 'jquery'
import Vuex from 'vuex'
import store from './store/store'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'

Vue.use(Vuex)
Vue.use(VueResource)
Vue.use(VueAwesomeSwiper)
Vue.use(Mint);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
