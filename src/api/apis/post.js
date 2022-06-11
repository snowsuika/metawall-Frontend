import req from '@/utils/http.js';

export default {
	/********************************************************
   *  取得所有貼文
   */
	getPosts: (params) => {
		return req('get', '/posts', params);
	},
	/**
   *  取得單一貼文
   */
	getPost: (id) => {
		return req('get', `/post/${id}`);
	},
	/**
   *  新增貼文
   */
	createPost: (options) => {
		return req('post', '/post', options);
	},
	/**
   *  編輯貼文
   */
	editPost: (postId, options) => {
		return req('patch', `/post/${postId}`, options);
	},
	/**
   * 刪除貼文
   */
	deletePost: (postId) => {
		return req('delete', `/post/${postId}`);
	},
	/********************************************************
   *  新增一則貼文按讚
   */
	createPostLike: (id) => {
		return req('post', `/post/${id}/like`);
	},
	/**
   * 刪除一則貼文按讚
   */
	deletePostLike: (id) => {
		return req('delete', `/post/${id}/like`);
	},
	/********************************************************
   *  新增一則貼文留言
   */
	createPostComment: (postId, body) => {
		return req('post', `/post/${postId}/comment`, body);
	},
	/**
   * 刪除一則貼文按讚
   */
	deletePostComment: (postId, commentId) => {
		return req('delete', `/post/${postId}/comment/${commentId}`);
	},

	/********************************************************
   *  新增一則貼文留言
   */
	getPersonalPosts: (params) => {
		return req('get', '/posts', params);
	}
};
