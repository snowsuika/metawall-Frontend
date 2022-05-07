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
						<button
							type="button"
							class="btn bg-black text-white shadow-none py-1 mb-3"
						>
							上傳圖片
						</button>
						<img
							src="~@/assets/img/post-picture.png"
							class="w-100"
						/>
						<div
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
		<loading :active.sync="isLoading"></loading>
    <notifications position="bottom" group="post" style="bottom:40px"/>
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
				user: '626fe6a466960648d6d6b92b', // 使用者 id 先寫死
				image: '',
				content: ''
			},

			errorMessage: [],
			isLoading: false
		};
	},
	created() {

	},
	methods: {

		async submitPost() {
			try {
				this.isLoading = true;
				const resData = await this.axios.post(
					'http://localhost:3000/posts',
					this.post
				);

				if (!resData) throw new Error('新增貼文失敗');
				if (resData.data.status !== 'success') throw new Error(resData.data.message);

				this.showNotify('success', '新增成功');
				this.isLoading = false;
				this.$router.push('/');
			} catch (error) {
				console.log(error.response);
				this.isLoading = false;
				this.showNotify('error', '新增失敗', error.response.data.message);
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
.post-wrap {
	.title {
		box-shadow: -5px 5px 0 -2px white, -5px 5px 0 0px $black;
	}
	.submit-btn-wrap {
		width: 320px;
	}
}

</style>
