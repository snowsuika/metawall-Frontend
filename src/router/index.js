import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
	{
		name: 'Login',
		path: '/login',
		component: () => import('@/views/Login/Index')
	},
	{
		name: 'AuthCallback',
		path: '/callback',
		component: () => import('@/views/AuthCallback')
	},
	{
		name: 'Layout',
		path: '/',
		component: () => import('@/views/Index'),
		children: [

			{
				name: 'Home',
				path: '/',
				component: () => import('@/views/Home')
			},

			{
				name: 'Following',
				path: '/following',
				component: () => import('@/views/Following')
			},
			{
				name: 'Account',
				path: '/account',
				component: () => import('@/views/Account')
			},
			{
				name: 'Post',
				path: '/post',
				component: () => import('@/views/Post')
			},
			{
				name: 'ThumbsUp',
				path: '/thumbs-up',
				component: () => import('@/views/ThumbsUp')
			},
			{
				name: 'PersonalPage',
				path: '/user/:id',
				component: () => import('@/views/PersonalPage')
			}

		]
	},
	{
		path: '*',
		redirect: '/'
	}
];

const router = new VueRouter({
	mode: 'hash',
	base: '/metawall',
	routes
});

export default router;
