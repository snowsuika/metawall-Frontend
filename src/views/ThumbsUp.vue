<template>
	<div class="following-wrap d-flex flex-column">
		<div class="row">
			<div class="col-12 col-md-7">
				<h3 class="title py-3 border bg-white text-center mb-4">
					我按讚的貼文
				</h3>
				<div
					class="rounded-card card mb-3"
					v-for="item in likePosts"
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
							<router-link
								:to="{ path: `/user/${item.user._id}` }"
								class="fw-bold"
							>
								{{ item.user.name }}
							</router-link>

							<small class="text-black-50"
								>發文時間：{{
									item.createdAt | moment('YYYY/M/DD HH:mm')
								}}</small
							>
						</div>
						<div
							class="d-flex align-items-center ms-auto me-3"
							@click="cancelLike(item._id)"
						>
							<a
								href="javascirpt:void(0)"
								class="d-flex flex-column align-items-center me-4"
							>
								<i
									class="bi bi-hand-thumbs-up text-primary fs-5"
								></i>
								<small class="text-black fw-bold">取消</small>
							</a>
							<router-link
								:to="{ path: `/user/${item._id}` }"
								class="d-flex flex-column align-items-center"
							>
								<i
									class="bi bi-arrow-right-circle text-black fs-5"
								></i>
								<small class="text-black fw-bold">查看</small>
							</router-link>
						</div>
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
			likePosts: []
		};
	},
	created() {
		this.getlikePosts();
	},
	methods: {
		async getlikePosts() {
			try {
				this.isLoading = true;
				const resData = await this.$api.getLikePosts();

				if (!resData.data || resData.status !== 'success') {
					throw new Error('取得資料失敗');
				}
				this.likePosts = resData.data;

				this.isLoading = false;
			} catch (error) {
				this.$toasted.show(error.message);
				this.isLoading = false;
			}
		},
		async cancelLike(postId) {
			try {
				await this.$api.deletePostLike(postId);
				this.getlikePosts();
			} catch (error) {
				this.$toasted.show(error.message);
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
		border: 2px #000 solid;
		width: 50px;
		height: 50px;
	}
}
</style>
