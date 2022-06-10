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
							class="form-control form-select rounded-0 cursor-pointer"
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
						<div class="dropdown">
							<a
								d="dropdownMenu2"
								data-bs-toggle="dropdown"
								aria-expanded="false"
								href="javascript:void(0)"
								class="position-absolute"
								style="top: 15px; right: 15px"
							>
								<i class="bi bi-three-dots-vertical"></i>
							</a>

							<ul
								class="dropdown-menu"
								aria-labelledby="dropdownMenu2"
							>
								<li>
									<button
										class="dropdown-item"
										type="button"
										@click="editPost(post._id)"
									>
										編輯貼文
									</button>
								</li>
								<li>
									<button
										class="dropdown-item"
										type="button"
										@click="
											deletePost(post._id)
										"
									>
										刪除貼文
									</button>
								</li>
							</ul>
						</div>

						<div class="card-header bg-transparent pt-3 border-0">
							<div class="d-flex align-items-center">
								<img
									v-if="post.user.photo === ''"
									:src="getPictureUrl('noAvatar.jpeg')"
									class="headshot"
								/>
								<img
									v-else
									:src="post.user.photo"
									class="headshot"
								/>
								<div class="d-flex flex-column ms-3">
									<a href="#" class="fw-bold">{{
										post.user.name
									}}</a>
									<small class="text-black-50">{{
										new Date(post.createdAt)
											| moment('YYYY/M/DD HH:mm')
									}}</small>
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

							<a
								v-if="post.likes.length > 0"
								href="javascript:void(0)"
								class="text-decoration-none"
								@click="togglePostLike(post._id, post.likes)"
							>
								<i
									class="bi bi-hand-thumbs-up text-primary fs-5"
								></i>
								{{ post.likes.length }}
							</a>
							<a
								v-else
								href="javascript:void(0)"
								class="text-decoration-none text-black-50"
								@click="togglePostLike(post._id, post.likes)"
							>
								<i class="bi bi-hand-thumbs-up fs-5"></i>
								成為第一個按讚的朋友
							</a>
							<div class="d-flex align-items-center mt-3">
								<img
									:src="
										$store.state.userInfo.photo === ''
											? getPictureUrl('noAvatar.jpeg')
											: $store.state.userInfo.photo
									"
									class="headshot me-2"
								/>
								<div class="input-group">
									<input
										type="text"
										class="form-control rounded-0"
										placeholder="留言..."
										aria-describedby="search"
										v-model="comment"
									/>
									<button
										class="btn btn-primary shadow-none rounded-0 px-4"
										type="button"
										@click="createComment(post._id)"
									>
										留言
									</button>
								</div>
							</div>
							<!-- 用戶回覆 -->
							<ul v-if="post.comments.length > 0" class="mt-3">
								<li
									v-for="comment in post.comments"
									:key="comment._id"
									class="mb-3"
								>
									<div class="message-card card border-0">
										<div class="card-body">
											<div class="d-flex">
												<img
													:src="
														comment.user.photo ===
														''
															? getPictureUrl(
																	'noAvatar.jpeg'
															  )
															: comment.user.photo
													"
													class="headshot"
												/>

												<div
													class="d-flex flex-column ms-3 pt-2"
												>
													<a
														href="#"
														class="fw-bold"
														>{{
															comment.user.name
														}}</a
													>

													<a
														v-if="
															comment.user._id ===
															userId
														"
														href="javascript:void(0)"
														class="position-absolute"
														style="
															top: 10%;
															right: 5%;
														"
														@click="
															deleteComment(
																post._id,
																comment._id
															)
														"
													>
														<i
															class="bi bi-trash3"
														></i>
													</a>
													<small
														class="text-black-50"
														>{{
															comment.createdAt
																| moment(
																	'YYYY/M/DD HH:mm'
																)
														}}</small
													>
													<p class="mt-2">
														{{ comment.comment }}
													</p>
												</div>
											</div>
										</div>
									</div>
								</li>
							</ul>
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
			userId: this.$store.state.userInfo.userId || '',
			isLoading: true,
			query: {
				sort: 'desc',
				keyword: ''
			},
			posts: [],
			comment: ''
		};
	},
	created() {
		this.getPosts();
	},

	methods: {
		async getPosts() {
			try {
				this.isLoading = true;
				const resData = await this.$api.getPosts({
					keyword: this.query.keyword,
					sort: this.query.sort
				});

				if (!resData.data || resData.status !== 'success') {
					throw new Error('取得資料失敗');
				}
				this.posts = resData.data;
				this.isLoading = false;
			} catch (error) {
				console.log(error);
				this.isLoading = false;
			}
		},
		async editPost() {},
		async deletePost() {},

		async togglePostLike(postId, likes) {
			try {
				const isExistLike = likes.includes(this.userId);

				if (!isExistLike) {
					const resData = await this.$api.createPostLike(postId);
					if (!resData || resData.status !== 'success') {
						throw resData.message;
					}
				} else {
					const resData = await this.$api.deletePostLike(postId);
					if (!resData || resData.status !== 'success') {
						throw resData.message;
					}
				}

				this.getPosts();
			} catch (error) {
				this.$toasted.show(error);
			}
		},
		async createComment(postId) {
			try {
				const resData = await this.$api.createPostComment(postId, {
					comment: this.comment
				});
				if (!resData || resData.status !== 'success') {
					throw resData.message;
				}
				this.getPosts();
				this.comment = '';
			} catch (error) {
				this.$toasted.show(error);
			}
		},
		async deleteComment(postId, commentId) {
			try {
				const resData = await this.$api.deletePostComment(
					postId,
					commentId
				);
				if (!resData || resData.status !== 'success') {
					throw resData.message;
				}
				this.getPosts();
			} catch (error) {
				this.$toasted.show(error);
			}
		},
		getPictureUrl(path) {
			return require(`@/assets/img/${path}`);
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
		object-fit: cover;
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
