<template>
	<div id="main-container" class="main-container">
		<TheNavbar></TheNavbar>
		<div class="content px-3 px-md-0 py-3 py-md-5">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
	name: 'Template',
	components: {
		TheNavbar: () => import('@layout/TheNavbar.vue')
	},
	computed: mapState({
		token: 'token'
	}),
	data() {
		return {};
	},
	beforeCreate() {
		const isExistToken = localStorage.getItem('token');
		if (!isExistToken) this.$router.replace('/login');
	},
	created() {
		this.getUserInfo();
	},
	methods: {
		...mapMutations({
			setUserInfo: 'setUserInfo'
		}),
		async getUserInfo() {
			try {
				this.isLoading = true;
				const resData = await this.$api.getUserProfile();
				if (!resData.data || resData.status !== 'success') throw new Error('取得資料失敗');

				const userInfo = {
					userId: resData.data._id,
					name: resData.data.name,
					photo: resData.data.photo
				};

				this.setUserInfo(userInfo);
				this.isLoading = false;
			} catch (error) {
				this.$toasted.show(error.message);
				this.isLoading = false;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	margin-top: $navbar-height;
	margin-bottom: $navbar-height;
	@include window-width;
}
</style>
