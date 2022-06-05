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
		return req('get', `/posts/${id}`);
	},
	/**
   *  新增貼文
   */
	createPost: (options) => {
		return req('post', '/posts', options);
	},
	/**
   *  編輯貼文
   */
	editPost: (postId, options) => {
		return req('patch', `/posts/${postId}`, options);
	},
	/**
   * 刪除貼文
   */
	deletePost: (params) => {
		return req('delete', '/post', params);
	},
	/********************************************************
   *  新增一則貼文按讚
   */
	createPostLike: (params) => {
		return req('get', '/posts', params);
	},
	/**
   * 刪除一則貼文按讚
   */
	deletePostLike: (params) => {
		return req('get', '/posts', params);
	},
	/********************************************************
   *  新增一則貼文留言
   */
	createPostComment: (params) => {
		return req('get', '/posts', params);
	},
	/**
   * 刪除一則貼文按讚
   */
	deletePostComment: (params) => {
		return req('get', '/posts', params);
	},
	/********************************************************
   *  新增一則貼文留言
   */
	getPersonalPosts: (params) => {
		return req('get', '/posts', params);
	}
};
