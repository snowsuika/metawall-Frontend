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
									class="headshot"
								/>
								<img
									v-else
									:src="post.user.photo"
									class="headshot"
								/>
								<div class="d-flex flex-column ms-3">
									<a
										href="javascript:void(0)"
										@click="
											$router.push(
												`/user/${post.user._id}`
											)
										"
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
									class="headshot me-2"
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
										@click="onCreateComment(post._id,post.comment)"
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
import { mapState } from 'vuex';

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
			posts: [],
			post: {},
			errorMessage: '',
			uploadImg: null,
			previewUrl: null
		};
	},
	created() {
		this.getPosts();
	},
	computed: mapState([ 'userInfo' ]),
	methods: {
		initPost() {
			this.post = '';
			this.errorMessage = '';
			this.uploadImg = null;
			this.previewUrl = null;
		},

		async togglePostLike(postId, likes) {
			try {
				const isExistLike = likes.includes(this.userInfo.userId);

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
		onEditPost(postId) {
			this.editPost(postId);
			this.getPosts();
		},
		onDeletePost(postId) {
			this.deletePost(postId);
			this.getPosts();
		},
		onCreateComment(postId, comment) {
      	this.createComment(postId, comment);
			this.getPosts();
		},
		onDeleteComment(postId, comment) {
			this.deleteComment(postId, comment);
			this.getPosts();
		},
		async previewPicture() {
			if (this.$refs.uploadImage.files.length === 0) return;
			this.uploadImg = this.$refs.uploadImage.files[0];

			// 確認檔案尺寸是否超過 1 MB
			if (this.uploadImg.size / 1024 / 1024 > 1) {
				this.errorMessage = '圖片檔案過大，僅限 1mb 以下檔案';
				return;
			}

			const getBase64Url = () => {
				return new Promise((resolve) => {
					const reader = new FileReader();
					reader.readAsDataURL(this.uploadImg);
					reader.onload = function(e) {
						resolve(e.target.result);
					};
				});
			};

			this.previewUrl = await getBase64Url();
		},
		async uploadImage() {
			return new Promise((resolve, reject) => {
				this.isLoading = true;
				if (!this.uploadImg) return resolve();
				const { token } = this.$store.state;
				this.isLoading = true;

				var formdata = new FormData();
				formdata.append('image', this.uploadImg);
				formdata.append('type', '');

				this.axios({
					method: 'post',
					url: `${process.env.VUE_APP_API_DOMAIN}/uploadImage`,
					data: formdata,
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${token}`
					}
				})
					.then((res) => {
						if (res.data.status === 'success') {
							this.post.image = res.data.data.imgUrl;
							this.isLoading = false;
							resolve(res.data.data.imgUrl);
						}
					})
					.catch((err) => {
						this.$toasted.show(err.response.data.message);
						this.isLoading = false;
						reject(err);
					});
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
