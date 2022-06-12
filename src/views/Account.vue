<template>
	<div class="account-wrap d-flex flex-column">
		<div class="row">
			<div class="col-12 col-md-7">
				<h3 class="title py-3 border bg-white text-center mb-4">
					修改個人資料
				</h3>
				<ul
					class="ms-2 nav nav-tabs border-0"
					id="myTab"
					role="tablist"
				>
					<li class="nav-item">
						<button
							class="nav-link border px-4 active"
							id="edit-name-tab"
							data-bs-toggle="tab"
							data-bs-target="#edit-name"
							type="button"
							aria-controls="edit-name"
							aria-selected="true"
						>
							暱稱修改
						</button>
					</li>
					<li class="nav-item">
						<button
							class="nav-link border px-4"
							id="edit-password-tab"
							data-bs-toggle="tab"
							data-bs-target="#edit-password"
							type="button"
							aria-controls="edit-password"
							aria-selected="false"
						>
							重設密碼
						</button>
					</li>
				</ul>
				<div class="tab-content rounded-card card">
					<!-- 暱稱修改 -->
					<div
						class="tab-pane fade show active"
						id="edit-name"
						aria-labelledby="edit-name-tab"
					>
						<div
							class="card-body p-4 d-flex flex-column align-items-center"
						>
							<img
								:src="
									previewUrl == null
										? getPictureUrl('noAvatar.jpeg')
										: previewUrl
								"
								class="headshot rounded-circle d-block mb-3"
								style="
									object-fit: cover;
									border: 2px #000 solid;
								"
							/>
							<input
								class="d-none"
								ref="uploadImage"
								type="file"
								accept="image/png, image/jpeg"
								@change="previewPicture()"
							/>
							<button
								type="button"
								class="btn bg-black text-white rounded-0 shadow-none px-4 py-2"
								@click.prevent="$refs.uploadImage.click()"
							>
								上傳大頭照
							</button>
							<form class="mt-3">
								<div class="mb-3">
									<label for="name" class="form-label"
										>暱稱</label
									>
									<input
										type="text"
										class="form-control rounded-0"
										id="name"
										placeholder="請輸入暱稱"
										v-model="userInfo.name"
									/>
								</div>
								<div class="mb-3">
									<label for="sex" class="form-label"
										>性別</label
									>
									<div>
										<div
											class="form-check form-check-inline"
										>
											<input
												class="form-check-input"
												type="radio"
												id="female"
												value="female"
												v-model="userInfo.sex"
											/>
											<label
												class="form-check-label"
												for="female"
												>女性</label
											>
										</div>
										<div
											class="form-check form-check-inline"
										>
											<input
												class="form-check-input"
												type="radio"
												id="male"
												value="male"
												v-model="userInfo.sex"
											/>
											<label
												class="form-check-label"
												for="male"
												>男性</label
											>
										</div>
									</div>
								</div>
								<!-- <div
									v-if="errorMessage"
									class="text-danger text-center d-block mt-3"
								>
									<small
										v-for="(item, index) in errorMessage"
										:key="`error_${index}`"
										class="d-block"
									>
										{{ item }}
									</small>
								</div> -->
								<button
									type="button"
									class="btn btn-secondary w-100 mt-3"
									@click="editProfile()"
								>
									送出更新
								</button>
							</form>
						</div>
					</div>
					<!-- 重設密碼 -->
					<div
						class="tab-pane fade"
						id="edit-password"
						aria-labelledby="edit-password-tab"
					>
						<div
							class="card-body p-4 d-flex flex-column align-items-center"
						>
							<form>
								<div class="mb-3">
									<label for="password" class="form-label"
										>輸入新密碼</label
									>
									<input
										type="password"
										class="form-control rounded-0"
										id="password"
										placeholder="請輸入新密碼"
										v-model="passwordInfo.password"
									/>
								</div>
								<div class="mb-3">
									<label
										for="confirmPassword"
										class="form-label"
										>再次輸入</label
									>
									<input
										type="password"
										class="form-control rounded-0"
										id="confirmPassword"
										placeholder="再次輸入輸入新密碼"
										v-model="passwordInfo.confirmPassword"
									/>
								</div>
								<button
									type="button"
									class="btn btn-secondary w-100 mt-3"
									@click="updatePassword()"
									:disabled="!formIsFinished"
								>
									重設密碼
								</button>
							</form>
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
import { mapMutations } from 'vuex';

export default {
	name: 'Following',
	components: {
		Sidebar: () => import('../components/Sidebar.vue'),
		SidebarSm: () => import('../components/SidebarSm.vue')
	},
	data() {
		return {
			isLoading: false,
			userInfo: {
				name: '',
				sex: '',
				photo: ''
			},
			passwordInfo: {
				password: '',
				confirmPassword: ''
			},
			errorMessage: [],
			uploadImg: null,
			previewUrl: null
		};
	},
	computed: {
		formIsFinished() {
			return (
				this.passwordInfo.password && this.passwordInfo.confirmPassword
			);
		}
	},
	created() {
		this.getProfile();
	},
	methods: {
		...mapMutations({
			setUserInfo: 'setUserInfo'
		}),
		async getProfile() {
			try {
				this.isLoading = true;
				const resData = await this.$api.getUserProfile();
				if (!resData.data || resData.status !== 'success') {
					throw new Error('取得資料失敗');
				}

				const { name, sex, photo } = resData.data;
				this.userInfo = {
					name,
					sex,
					photo
				};

				if (photo !== '') this.previewUrl = photo;

				this.isLoading = false;
			} catch (error) {
				this.$toasted.show(error.message);
				this.isLoading = false;
			}
		},
		async editProfile() {
			try {
				this.isLoading = true;
				await this.uploadImage();

				const resData = await this.$api.editUserProfile(this.userInfo);
				if (!resData || resData.status !== 'success') {
					throw resData.message;
				}

				this.setUserInfo(this.userInfo);
				this.isLoading = false;
				this.getProfile();
			} catch (error) {
				this.isLoading = false;
				this.$toasted.show(error.message);
			}
		},
		async uploadImage() {
			return new Promise((resolve, reject) => {
				this.isLoading = true;
				if (!this.uploadImg) return resolve();
				const { token } = this.$store.state;
				this.isLoading = true;

				var formdata = new FormData();
				formdata.append('image', this.uploadImg);
				formdata.append('type', 'avatar');

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
							this.userInfo.photo = res.data.data.imgUrl;
							this.isLoading = false;
							resolve(res.data.data.imgUrl);
						}
					})
					.catch((err) => {
						this.isLoading = false;
						reject(err.response);
					});
			});
		},
		async previewPicture() {
			if (this.$refs.uploadImage.files.length === 0) return;
			this.uploadImg = this.$refs.uploadImage.files[0];
			this._imageFormatCheck(this.uploadImg);
			if (this.errorMessage.length > 0) return;

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
		_imageFormatCheck(file) {
			// 確認檔案尺寸是否超過 1 MB
			if (file.size / 1024 / 1024 > 1) { this.errorMessage.push('圖片檔案過大，僅限 1mb 以下檔案'); }

			// TODO: 確認頭像是否符合 1:1 ，解析度 300 像素以上
		},
		async updatePassword() {
			try {
				this.isLoading = true;

				const resData = await this.$api.updatePassword(
					this.passwordInfo
				);
				if (!resData || resData.status !== 'success') {
					throw resData.message;
				}

				this.passwordInfo = {};
				this.isLoading = false;
			} catch (error) {
				this.isLoading = false;
				this.$toasted.show('更新失敗，' + error.message);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.account-wrap {
	.title {
		box-shadow: -5px 5px 0 -2px white, -5px 5px 0 0px $black;
	}
	.nav-link {
		background-color: white;
		color: $black;
		&.active {
			background-color: $black;
			color: white;
		}
	}
	.headshot {
		width: 105px;
		height: 105px;
	}
	form {
		width: 320px;
	}
}
</style>
