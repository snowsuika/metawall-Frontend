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
		const { token } = this.$route.query;
		if (token)	this.setToken(token);
		const isExistToken = localStorage.getItem('token');

		if (!isExistToken) {
			this.$router.replace({ name: 'Login' });
		} else {
			this.$router.push({ name: 'Home' });
		};
	},

	methods: {
		...mapMutations({
			setToken: 'set_token'
		})
	}
};
</script>
