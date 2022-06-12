import req from '@/utils/http.js';

export default {
	/********************************************************
	 *  取得個人資料
	 */
	getUserProfile: () => {
		return req('get', '/user/profile');
	},
	/**
	 *  編輯個人資料
	 */
	editUserProfile: (options) => {
		return req('patch', '/user/profile', options);
	},
	/**
	 *  更新密碼
	 */
	updatePassword: (options) => {
		return req('post', '/auth/updatePassword', options);
	},

	/********************************************************
	 *  取得個人追蹤名單
	 */
	getUserFollowers: () => {
		return req('get', '/user/following');
	},
	/**
	 *  追蹤朋友
	 */
	createFollwingUser: (userId) => {
		return req('post', `/user/following/${userId}`);
	},
	/**
	 *  取消追蹤朋友
	 */
	deleteFollwingUser: (userId) => {
		return req('delete', `/user/following/${userId}`);
	},
	/********************************************************
	 *  取得我按讚的文章
	 */
	getLikePosts: () => {
		return req('get', '/user/likeList');
	}
};
