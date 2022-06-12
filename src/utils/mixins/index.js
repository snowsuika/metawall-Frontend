import Vue from 'vue';
import posts from './posts.js';
import image from './image.js';

Vue.mixin({
	methods: {
		...posts,
		...image
	}
});
