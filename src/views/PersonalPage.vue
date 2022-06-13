<template>
	<div class="personal-wrap d-flex flex-column">
		<div class="row">
			<div class="col-12 col-md-7">
				<div v-if="posts.length !== 0" class="personal-card card mb-4">
					<div
						class="card-header d-flex align-items-center p-0 border-bottom-0"
					>
						<div class="border-end">
							<img
								class="head-pic"
								:src="
									user.photo === ''
										? getPictureUrl('noAvatar.jpeg')
										: user.photo
								"
							/>
						</div>
						<div class="ms-3">
							<h6>{{ user.name }}</h6>
							<small
								>{{
									user.followers && user.followers.length
								}}
								人追蹤</small
							>
						</div>
						<template>
							<button
								v-if="user._id !== userInfo.userId"
								type="button"
								class="btn btn-secondary ms-auto me-3 py-1"
								:class="{
									'btn-secondary': !isFollowing,
									'btn-light': isFollowing,
								}"
								@click="toggleFollowing()"
							>
								<Spinner
									:isSpinnerLoading="isSpinnerLoading"
								></Spinner>
								<span class="ml-3" v-if="!isFollowing"
									>追蹤</span
								>
								<span class="ml-3" v-else>取消追蹤</span>
							</button>
						</template>
					</div>
				</div>
				<!-- 搜尋欄 -->
				<div v-if="posts.length !== 0" class="row mb-3">
					<div class="col-4">
						<select
							name="type"
							class="form-control form-select rounded-0"
							v-model="query.sort"
							@change="getPersonalPosts()"
						>
							<option value="desc">最新貼文</option>
							<option value="asc">最舊貼文</option>
						</select>
					</div>
					<div class="col-8">
						<div class="input-group">
							<input
								type="text"
								class="form-control rounded-0"
								placeholder="搜尋貼文"
								v-model.trim="query.keyword"
								@change="getPersonalPosts()"
								aria-describedby="search"
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
								該用戶尚無貼文！
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
						<div
							v-if="post.user._id === userInfo.userId"
							class="dropdown"
						>
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
										data-bs-toggle="modal"
										data-bs-target="#editPostModal"
										@click="getPost(post._id)"
									>
										編輯貼文
									</button>
								</li>
								<li>
									<button
										class="dropdown-item"
										type="button"
										@click="onDeletePost(post._id)"
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
									class="headshot rounded-circle"
								/>
								<img
									v-else
									:src="post.user.photo"
									class="headshot rounded-circle"
								/>
								<div class="d-flex flex-column ms-3">
									<a
										href="javascript:void(0)"
										class="fw-bold"
										>{{ post.user.name }}</a
									>
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
							<Spinner
								:isSpinnerLoading="isLikeLoading"
							></Spinner>
							<a
								v-if="post.likes.length > 0"
								href="javascript:void(0)"
								class="text-decoration-none"
								@click="togglePostLike(post._id, post.likes)"
							>
								<i
									class="bi bi-hand-thumbs-up text-primary fs-5"
								></i>
								{{ post.likes && post.likes.length }}
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
										userInfo.photo === ''
											? getPictureUrl('noAvatar.jpeg')
											: userInfo.photo
									"
									class="headshot rounded-circle me-2"
								/>
								<div class="input-group">
									<input
										type="text"
										class="form-control rounded-0"
										placeholder="留言..."
										aria-describedby="search"
										v-model="post.comment"
									/>
									<button
										class="btn btn-primary shadow-none rounded-0 px-4"
										type="button"
										@click="
											onCreateComment(
												post._id,
												post.comment
											)
										"
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
													class="headshot rounded-circle"
												/>

												<div
													class="d-flex flex-column ms-3 pt-2"
												>
													<a
														href="javascript:void(0)"
														@click="
															$router.push(
																`/user/${comment.user._id}`
															)
														"
														class="fw-bold"
														>{{
															comment.user.name
														}}</a
													>

													<a
														v-if="
															comment.user._id ===
															userInfo.userId
														"
														href="javascript:void(0)"
														class="position-absolute"
														style="
															top: 10%;
															right: 5%;
														"
														@click="
															onDeleteComment(
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
		</div>
		<!-- Modal -->
		<div
			class="modal fade"
			ref="editPostModal"
			id="editPostModal"
			data-bs-backdrop="static"
			data-bs-keyboard="false"
			aria-labelledby="editPostModal"
			tabindex="-1"
			aria-hidden="true"
		>
			<div class="modal-dialog modal-lg">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="staticBackdropLabel">
							編輯貼文
						</h5>
						<button
							type="button"
							class="btn-close"
							data-bs-dismiss="modal"
							aria-label="Close"
							@click="initPost()"
						></button>
					</div>
					<div class="modal-body">
						<div class="card-body p-4">
							<div v-if="post" class="mb-3">
								<label for="content" class="form-label"
									>貼文內容</label
								>
								<textarea
									class="form-control rounded-0"
									rows="3"
									id="content"
									placeholder="輸入您的貼文內容"
									v-model="post.content"
								></textarea>
							</div>
							<input
								class="d-none"
								ref="uploadImage"
								type="file"
								accept="image/png, image/jpeg"
								@change="previewPicture()"
							/>
							<button
								type="button"
								class="btn bg-black text-white shadow-none py-1 mb-3"
								@click.prevent="$refs.uploadImage.click()"
							>
								上傳圖片
							</button>

							<img
								v-if="previewUrl"
								:src="previewUrl"
								class="border rounded border-dark w-100"
							/>
							<div
								v-if="errorMessage"
								class="text-danger text-center d-block mt-3"
							>
								<small class="d-block">
									{{ errorMessage }}
								</small>
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button
							type="button"
							class="btn btn-secondary"
							data-bs-dismiss="modal"
							@click="initPost()"
						>
							取消
						</button>
						<button
							type="button"
							class="btn btn-primary"
							data-bs-dismiss="modal"
							@click="onEditPost(post._id)"
						>
							編輯貼文
						</button>
					</div>
				</div>
			</div>
		</div>
		<loading :active.sync="isLoading"></loading>
	</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
	name: 'Following',
	components: {
		Sidebar: () => import('../components/Sidebar.vue'),
		SidebarSm: () => import('../components/SidebarSm.vue'),
		Spinner: () => import('../components/common/Spinner.vue')
	},
	computed: mapState([ 'userInfo' ]),
	data() {
		return {
			isLoading: false,
			isSpinnerLoading: false,
			isLikeLoading: false,
			isFollowing: false,
			query: {
				sort: 'desc',
				keyword: ''
			},
			user: {},
			posts: [],
			post: {},
			errorMessage: '',
			postId: '',
			userId: this.$route.params.id || '',
			uploadImg: null,
			previewUrl: null
		};
	},
	watch: {
		'$route.params.id': {
			handler: function(id) {
				this.userId = this.$route.params.id;
				this.getPersonalPosts();
			},
			deep: true,
			immediate: true
		}
	},
	created() {
		this.getPersonalPosts();
	},
	methods: {
		async getPersonalPosts() {
			try {
				this.isLoading = true;
				const resData = await this.$api.getPersonalPosts(this.userId, {
					keyword: this.query.keyword,
					sort: this.query.sort
				});
				this.posts = resData.data.posts;
				this.user = resData.data.userInfo;
				if (this.user.followers.length > 0) {
					this.isFollowing = this.user.followers.some(
						(item) => item.user === this.userInfo.userId
					);
				}
				this.isLoading = false;
			} catch (error) {
				this.isLoading = false;
				this.$toasted.show(error.message);
			}
		},
		onEditPost(postId) {
			this.editPost(postId);
			this.getPersonalPosts();
		},
		onDeletePost(postId) {
			this.deletePost(postId);
			this.getPersonalPosts();
		},
		onCreateComment(postId, comment) {
			this.createComment(postId, comment);
			this.getPersonalPosts();
		},
		onDeleteComment(postId, comment) {
			this.deleteComment(postId, comment);
			this.getPersonalPosts();
		},
		async togglePostLike(postId, likes) {
			try {
				const isExistLike = likes.includes(this.userInfo.userId);
				this.isLikeLoading = true;
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
				this.isLikeLoading = false;
				this.getPersonalPosts();
			} catch (error) {
				this.isLikeLoading = false;
				this.$toasted.show(error.message);
			}
		},
		async toggleFollowing() {
			try {
				this.isSpinnerLoading = true;
				if (!this.isFollowing) {
					await this.$api.createFollwingUser(this.user._id);
				} else {
					await this.$api.deleteFollwingUser(this.user._id);
				}
				this.isSpinnerLoading = false;
				this.getPersonalPosts();
			} catch (error) {
				this.isSpinnerLoading = false;
				this.$toasted.show(error.message);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.personal-wrap {
	.personal-card {
		box-shadow: -5px 5px 0 -2px white, -5px 5px 0 0px $black;
	}
	.head-pic {
		width: 80px;
		height: 80px;
	}
	.headshot {
		border: 2px #000 solid;
		width: 50px;
		height: 50px;
	}
}
.content-image {
	border: 2px #000 solid;
	border-radius: 10px;
}
.message-card {
	background-color: rgba($gray-300, 0.3);
}
</style>
