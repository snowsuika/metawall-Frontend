import Vue from 'vue';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import App from './App.vue';
import Loading from 'vue-loading-overlay';
import Notifications from 'vue-notification';
import api from './api/index';
import 'vue-loading-overlay/dist/vue-loading.css';

window.jQuery = $;
window.$ = $;
Vue.component('loading', Loading);

Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));
Vue.use(Notifications);

Vue.prototype.$api = api; // 将api挂载到vue的原型上

new Vue({
	data: {
		isLoading: true,
		fullPage: true
	},
	router,
	render: (h) => h(App)
}).$mount('#app');
