import Vue from 'vue';
import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import VueAxios from 'vue-axios';
import router from './router';
import App from './App.vue';
import mixins from '@/utils/mixins/index.js';
import Loading from 'vue-loading-overlay';
import api from './api/index';
import 'vue-loading-overlay/dist/vue-loading.css';
import store from './store/index';
import Toasted from 'vue-toasted';

window.jQuery = $;
window.$ = $;
Vue.component('loading', Loading);

const toastedOptions = {
	type: 'error',
	position: 'bottom-center',
	duration: 3000
};

Vue.use(Toasted, toastedOptions);
Vue.use(VueAxios, axios);
Vue.use(require('vue-moment'));

Vue.prototype.$api = api;

new Vue({
	data: {
		isLoading: true,
		fullPage: true
	},
	mixins,
	router,
	store,
	render: (h) => h(App)
}).$mount('#app');
