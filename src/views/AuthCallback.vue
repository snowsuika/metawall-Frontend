<template>
	<div></div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'AuthCallback',

	data() {
		return {};
	},
	beforeCreate() {},
	created() {
		const { searchParams } = new URL(window.location.href);
		if (searchParams.has('token') && searchParams.get('token')) {
			this.setToken(searchParams.get('token'));
		}
		const isExistToken = localStorage.getItem('token');
		if (!isExistToken) {
			this.$router.replace('/login');
		} else {
			this.$router.push('/home');
		};
	},

	methods: {
		...mapMutations({
			setToken: 'set_token'
		})
	}
};
</script>
