<template>
	<div class="post-wrap d-flex flex-column">
		<div class="row">
			<div class="col-12 col-md-7">
				<h3 class="title py-3 border bg-white text-center mb-4">
					張貼動態
				</h3>
				<div class="rounded-card card">
					<div class="card-body p-4">
						<div class="mb-3">
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
						<div class="submit-btn-wrap mx-auto">
							<button
								type="button"
								class="btn btn-secondary w-100 mt-3"
								:disabled="!post.content"
								@click="submitPost()"
							>
								送出貼文
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
		</div>
		<loading :active.sync="isLoading" :is-full-page="true"></loading>
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
			post: {
				user: this.$store.state.userInfo.userId,
				image: '',
				content: ''
			},

			errorMessage: '',
			isLoading: false,
			uploadImg: null,
			previewUrl: null
		};
	},
	created() {
	},
	methods: {
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
				}).then(res => {
					if (res.data.status === 'success') {
						this.post.image = res.data.data.imgUrl;
						resolve(res.data.data.imgUrl);
					}
				}).catch(err => {
					this.$toasted.show(err.response.data.message);
					this.isLoading = false;
					reject(err);
				});
			});
		},
		async submitPost() {
			try {
				this.isLoading = true;
				await this.uploadImage();
				const resData = await this.$api.createPost(this.post);
				if (!resData.data || resData.status !== 'success') { throw new Error('新增貼文失敗'); }
				this.isLoading = false;
				this.$router.push('/');
			} catch (error) {
				this.isLoading = false;
			}
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
		}
	}
};
</script>

<style lang="scss" scoped>
.post-wrap {
	.title {
		box-shadow: -5px 5px 0 -2px white, -5px 5px 0 0px $black;
	}
	.submit-btn-wrap {
		width: 320px;
	}
}
</style>
