<template>
	<div class="text-center">
		<h2 class="mb-4">到元宇宙展開全新社交圈</h2>
		<form class="mb-4 pt-2">
			<div class="mb-3 w-100">
				<input
					type="email"
					class="form-control rounded-0"
					placeholder="Email"
					v-model="info.email"
				/>
			</div>
			<div class="mb-3 w-100">
				<input
					type="password"
					class="form-control rounded-0"
					placeholder="Password"
					v-model="info.password"
				/>
			</div>
		</form>
		<small v-if="errorMessage" class="text-danger d-block mb-3">{{
			errorMessage
		}}</small>
		<button
			type="button"
			class="btn btn-primary w-100"
			@click="submitLogin()"
			:disabled="!formIsFinished"
		>
			登入
		</button>
	</div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'NavLogin',
	data() {
		return {
			info: {
				email: '', // 帳號
				password: '' // 密碼
			},
			errorMessage: ''
		};
	},
	computed: {
		...mapState({
			token: 'token'
		}),
		formIsFinished() {
			return this.info.email && this.info.password;
		}
	},
	created() {},
	mounted() {},
	methods: {
		...mapMutations({
			setToken: 'set_token'
		}),
		async submitLogin() {
			this.isLoading = true;
			axios
				.post(`${process.env.VUE_APP_API_DOMAIN}/auth/login`, this.info)
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
						this.$toasted.show(err.response.data.message);
					} else {
						this.$toasted.show(err.message);
					}
				});
		}
	}
};
</script>

<style lang="scss" scoped></style>
