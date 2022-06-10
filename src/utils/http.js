/* eslint-disable no-case-declarations */
/**
 * axios 封裝
 */
import axios from 'axios';

// 創建 axios 實例
const instance = axios.create({
	baseURL: process.env.VUE_APP_API_DOMAIN,
	headers: { 'Content-Type': 'application/json' },
	timeout: 20000
});

/**
 * 攔截請求
 */
instance.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	// 會員系統需驗證身份時
	if (token) config.headers.Authorization = `Bearer ${token}`;
	return config;
},
(error) => {
	console.log('攔截請求錯誤', error);
	return Promise.reject(error);
}
);
/**
 * 攔截響應
 */
instance.interceptors.response.use((response) => {
	console.log('response', response);
	return response;
},
(error) => {
	console.log('攔截響應錯誤', error);
	console.log('攔截響應錯誤', error.response);
	if (error.response) {
		switch (error.response.status) {
		case 404:
			console.log('你要找的頁面不存在');
			break;
		case 500:
			console.log('程式發生問題');
			break;
		default:
			console.log(error.message);
		}
	}
	if (!window.navigator.onLine) {
		alert('網路出了點問題，請重新連線後重整網頁');
		return;
	}
	return Promise.reject(error);
}
);

export default async (method, url, data = null, config) => {
	method = method.toLowerCase();
	switch (method) {
	case 'post':
		const postData = await instance.post(url, data, config);
		return postData.data;
	case 'get':
		const getData = await instance.get(url, { params: data });
		return getData.data;
	case 'delete':
		const deleteData = await instance.delete(url, { params: data });
		return deleteData.data;
	case 'put':
		const putData = await instance.put(url, data);
		return putData.data;
	case 'patch':
		const patchData = await instance.patch(url, data);
		return patchData.data;
	default:
		console.log(`未知的 method: ${method}`);
		return false;
	}
};
