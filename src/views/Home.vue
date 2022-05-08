<template>
	<div class="home-wrap d-flex flex-column">
		<div class="row">
			<div class="col-12 col-md-7">
				<!-- 搜尋欄 -->
				<div class="row mb-3">
					<div class="col-4">
						<select
							v-model="query.sort"
							name="type"
							class="form-control form-select rounded-0"
							@change="getPosts()"
						>
							<option value="desc">最新貼文</option>
							<option value="asc">最舊貼文</option>
						</select>
					</div>
					<div class="col-8">
						<div class="input-group">
							<input
								v-model.trim="query.keyword"
								type="text"
								class="form-control rounded-0"
								placeholder="搜尋貼文"
								aria-describedby="search"
								@change="getPosts()"
							/>
							<button
								class="btn btn-primary shadow-none rounded-0 px-3 py-0 fs-5"
								type="button"
							>
								<i class="bi bi-search"></i>
							</button>
						</div>
					</div>
				</div>
				<!-- 貼文 -->
				<template v-if="posts.length === 0">
					<div class="rounded-card card">
						<div class="card-header bg-transparent border-bottom">
							<span
								class="browser-icon bg-danger rounded-circle d-inline-block me-2"
							></span>
							<span
								class="browser-icon bg-secondary rounded-circle d-inline-block me-2"
							></span>
							<span
								class="browser-icon bg-success rounded-circle d-inline-block"
							></span>
						</div>
						<div class="card-body">
							<p class="text-black-50 text-center py-3">
								目前尚無動態，新增一則貼文吧！
							</p>
						</div>
					</div>
				</template>
				<template v-else>
					<div
						class="rounded-card card mb-3"
						v-for="post in posts"
						:key="post._id"
					>
						<div class="card-header bg-transparent pt-3 border-0">
							<div class="d-flex align-items-center">
								<img :src="post.user.photo" class="headshot" />
								<div class="d-flex flex-column ms-3">
									<a href="#" class="fw-bold">{{
										post.user.name
									}}</a>
									<small class="text-black-50">{{ new Date(post.createdAt) | moment('YYYY/M/DD HH:mm') }}</small>
								</div>
							</div>
						</div>
						<div class="card-body">
							<p v-html="post.content" class="mb-3"></p>
							<img
								:src="post.image"
								class="w-100 mb-3 content-image"
								v-if="post.image"
							/>
						</div>
					</div>
				</template>
			</div>
			<div class="col-12 col-md-5 d-none d-md-block">
				<Sidebar></Sidebar>
			</div>
			<div class="d-md-none">
				<SidebarSm></SidebarSm>
			</div>
			<loading :active.sync="isLoading"></loading>
      <notifications position="center" group="post" style="top:30px" />
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home',
	components: {
		Sidebar: () => import('../components/Sidebar.vue'),
		SidebarSm: () => import('../components/SidebarSm.vue')
	},
	data() {
		return {
			isLoading: true,
			query: {
				sort: 'desc',
				keyword: ''
			},
			posts: []
		};
	},
	created() {
		this.getPosts();
	},

	methods: {
		async getPosts() {
			try {
				this.isLoading = true;
				const resData = await this.axios.get(
					'http://localhost:3000/posts',
					{
						params: {
							keyword: this.query.keyword,
							sort: this.query.sort
						}
					}
				);
				if (!resData.data || resData.data.status !== 'success') throw new Error('取得資料失敗');
				this.posts = resData.data.data;
				this.isLoading = false;
			} catch (error) {
				this.isLoading = false;
				this.showNotify('error', '取得貼文失敗');
			}
		},
		showNotify(type, title, text) {
			this.$notify({
				group: 'post',
				type,
				title,
				text
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.home-wrap {
	.headshot {
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border: 2px black solid;
	}
	small {
		font-size: 12px;
	}
	.browser-icon {
		width: 9px;
		height: 9px;
		border: 1px solid $gray-700;
	}
	.sidebar-card {
		.link:hover {
			.info-icon {
				background-color: $primary;
				color: white;
			}
		}
		.info-icon {
			width: 50px;
			height: 50px;
			background-color: #e2edfa;
		}
	}
	.content-image {
		border: 2px #000 solid;
		border-radius: 10px;
	}
	.message-card {
		background-color: rgba($gray-300, 0.3);
	}
}
</style>
