import req from '@/utils/http.js';

export default {
  	/********************************************************
   *  取得個人資料
   */
	getUserProfile: () => {
		return req('get', '/user/profile');
	},
	/**
   *  取消追蹤朋友
   */
	editUserProfile: () => {
		return req('patch', '/user/profile');
	},
	/********************************************************
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
	getLikePosts: (options) => {
		return req('post', '/posts', options);
	},
	/********************************************************
   *  取得個人追蹤名單
   */
	getUserFollowers: (postId, options) => {
		return req('get', '/user/following', options);
	}

};