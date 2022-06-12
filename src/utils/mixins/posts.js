export default {
	/**
  * 貼文 增刪改查
  */
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
			this.$toasted.show(error.message);
			this.isLoading = false;
		}
	},
	async getPost(postId) {
		try {
			const resData = await this.$api.getPost(postId);
			if (!resData || resData.status !== 'success') {
				throw resData.message;
			}
			this.post = resData.data;
			if (this.post.image !== '') this.previewUrl = this.post.image;
		} catch (error) {
			this.$toasted.show(error.message);
		}
	},
	async editPost(postId) {
		try {
			await this.uploadImage();

			const post = {
				content: this.post.content,
				image: this.post.image
			};

			const resData = await this.$api.editPost(postId, post);
			if (!resData || resData.status !== 'success') {
				throw resData.message;
			}
			this.getPosts();
		} catch (error) {
			this.$toasted.show(error.message);
		}
	},
	async deletePost(postId) {
		try {
			const resData = await this.$api.deletePost(postId);
			if (!resData || resData.status !== 'success') {
				throw resData.message;
			}
		} catch (error) {
			this.$toasted.show(error.message);
		}
	},
	/**
   * 評論
    */

	async createComment(postId, comment) {
		try {
			const resData = await this.$api.createPostComment(postId, {
				comment
			});
			if (!resData || resData.status !== 'success') {
				throw resData.message;
			}
		} catch (error) {
			this.$toasted.show(error.message);
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
		} catch (error) {
			this.$toasted.show(error.message);
		}
	}
};
