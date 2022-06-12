<template>
	<div class="following-wrap d-flex flex-column">
		<div class="row">
			<div class="col-12 col-md-7">
				<h3 class="title py-3 border bg-white text-center mb-4">
					追蹤名單
				</h3>
				<div
					class="rounded-card card mb-3"
					v-for="item in followings"
					:key="item._id"
				>
					<div class="card-body d-flex align-items-center">
						<img
							:src="
								item.user.photo === ''
									? getPictureUrl('noAvatar.jpeg')
									: item.user.photo
							"
							class="rounded-circle headshot"
						/>
						<div class="d-flex flex-column ms-3">
							<a href="javascript:void(0)" class="fw-bold" @click="$router.push(`/user/${item.user._id}`)">{{ item.user.name }}</a>
							<small class="text-black-50">您已追蹤 {{ item.diffDays }} 天！</small>
						</div>
						<small class="ms-auto"
							>追蹤時間：{{
								item.createdAt | moment('YYYY/M/DD HH:mm')
							}}</small
						>
					</div>
				</div>
			</div>
			<div class="col-12 col-md-5 d-none d-md-block">
				<Sidebar></Sidebar>
			</div>
			<div class="d-md-none">
				<SidebarSm></SidebarSm>
			</div>
		</div>
		<loading :active.sync="isLoading"></loading>
	</div>
</template>

<script>
export default {
	name: 'Following',
	components: {
		Sidebar: () => import('../components/Sidebar.vue'),
		SidebarSm: () => import('../components/SidebarSm.vue')
	},
	data() {
		return {
			isLoading: false,
			followings: []
		};
	},
	created() {
		this.getFollowing();
	},
	methods: {
		async getFollowing() {
			try {
				this.isLoading = true;
				const resData = await this.$api.getUserFollowers();
				if (!resData.data || resData.status !== 'success') {
					throw new Error('取得資料失敗');
				}
				this.followings = resData.data[0].following;

				// 計算已經追蹤的天數
				const diffDays = (date) => 	parseInt(Math.abs(new Date() - new Date(date)) / 1000 / 60 / 60 / 24);

				this.followings.forEach(item => {
					item.diffDays = diffDays(item.createdAt);
				});

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
.following-wrap {
	.title {
		box-shadow: -5px 5px 0 -2px white, -5px 5px 0 0px $black;
	}
	.headshot {
		width: 50px;
		height: 50px;
		border: 2px #000 solid;
	}
}
</style>
