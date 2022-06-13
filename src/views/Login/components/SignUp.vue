<template>
	<div>
		<h2 class="text-center mb-4">註冊</h2>
		<form class="mb-4 pt-2">
			<div class="mb-3 w-100">
				<input type="name" class="form-control rounded-0" placeholder="暱稱" v-model="info.name">
			</div>
			<div class="mb-3 w-100">
				<input type="email" class="form-control rounded-0" placeholder="Email" v-model="info.email">
			</div>
			<div class="mb-3 w-100">
				<input type="password" class="form-control rounded-0" placeholder="密碼" v-model="info.password">
			</div>
      	<div class="mb-3 w-100">
				<input type="password" class="form-control rounded-0" placeholder="再次輸入密碼" v-model="info.confirmPassword">
			</div>
		</form>
        <button type="button" class="btn btn-primary w-100" @click="submitRegister()" :disabled="!formIsFinished">註冊</button>
	<loading :active.sync="isLoading"></loading>
</div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'NavSignUp',
	data() {
		return {
			isLoading: false,
			info: {
				name: '', // 暱稱
				email: '', // 帳號
				password: '', // 密碼
				confirmPassword: '' // 密碼
			},
			errorMessage: {}
		};
	},
	computed: {
		...mapState({
			token: 'token'
		}),
		formIsFinished() {
			return this.info.name && this.info.email && this.info.password;
		}
	},
	mounted() {},
	methods: {
		...mapMutations({
			setToken: 'set_token'
		}),
		async submitRegister() {
			this.isLoading = true;
			axios
				.post(`${process.env.VUE_APP_API_DOMAIN}/auth/register`, this.info)
				.then((res) => {
					this.setToken(res.data.data.token);

					if (!this.token) {
						this.$router.replace({ name: 'Login' });
					} else {
						this.$router.push({ name: 'Home' });
					}
					this.isLoading = false;
				})
				.catch((err) => {
					this.isLoading = false;
					if (err.response.data.message) {
						this.$toasted.show('註冊失敗！' + err.response.data.message);
					} else {
						this.$toasted.show('註冊失敗！' + err.message);
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
