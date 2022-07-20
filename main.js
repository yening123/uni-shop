import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

App.mpType = 'app'

// 引入全局uView
import uView from 'uview-ui'
Vue.use(uView);

let vuexStore = require("@/store/$u.mixin.js");
Vue.mixin(vuexStore);

import store from '@/store';

// 将store放入Vue对象创建中
const app = new Vue({
	store,
	...App
})


// 在new Vue()后面的原因是，外部JS文件需要引用vue的实例，也即this对象，
// 要等main.js中通过new创建了实例之后才能引用。 在app.$mount()之前的原因是，
// 在Vue挂载this实例(也即初始化App.vue)之前配置请求信息，所以在App.vue中也能正常发出请求。
import httpInterceptor from '@/common/http.interceptor.js'
//  这里需要写在最后，是为了等Vue创建对象完成，引入"app"对象(也即页面的"this"实例)
Vue.use(httpInterceptor, app)

// http接口API集中管理引入部分
import httpApi from '@/common/http.api.js'
Vue.use(httpApi, app)

import utils from '@/common/utils.js'
Vue.use(utils, app)
app.$mount()
