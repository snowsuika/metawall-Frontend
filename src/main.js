import Vue from 'vue';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import App from './App.vue';
import Loading from 'vue-loading-overlay';

window.jQuery = $;
window.$ = $;
Vue.component('loading', Loading);

Vue.use(VueAxios, axios);
axios.defaults.withCredentials = true;

new Vue({
	data: {
		isLoading: true,
		fullPage: true
	},
	router,
	render: (h) => h(App)
}).$mount('#app');
