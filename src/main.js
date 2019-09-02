// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import  { ToastPlugin } from 'vux'
import VueClipboard from 'vue-clipboard2'
import router from './router'
import App from './App'
import  { LoadingPlugin } from 'vux'

import "babel-polyfill";

Vue.use(VueClipboard);
Vue.use(LoadingPlugin)
FastClick.attach(document.body)
Vue.use(ToastPlugin)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
