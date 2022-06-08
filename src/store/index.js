import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		token: localStorage.getItem('token') || '',
		userInfo: ''
	},
	mutations: {
		set_token(state, token) {
			state.token = token;
			localStorage.setItem('token', token);
		},
		del_token(state) {
			state.token = '';
			localStorage.removeItem('token');
			localStorage.removeItem('userInfo');
		},
		setUserInfo(state, userInfo) {
			state.userInfo = userInfo;
		}
	}
});
