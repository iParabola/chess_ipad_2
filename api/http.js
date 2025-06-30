/**
 * @version 3.0.5
 * @Author lu-ch
 * @Email webwork.s@qq.com
 * 文档: https://www.quanzhan.co/luch-request/
 * github: https://github.com/lei-mu/luch-request
 * DCloud: http://ext.dcloud.net.cn/plugin?id=392
 * HBuilderX: beat-3.0.4 alpha-3.0.4
 */
import Request from 'luch-request'
import {
	refreshToken
} from '@/api/user.js'
import {
	baseIpPort
} from '@/static/json/base-url.js'

// const baseIpPort = "192.168.100.100:8083";
const baseURL = "http://" + baseIpPort + "/api/";
/* 用户端token */
const getUserTokenStorage = () => {
	let token = '';
	try {
		token = "Bearer " + uni.getStorageSync('token');
		// console.log(token);
	} catch (e) {}
	return token
}
/***************************** 用户端 *****************************/
const http = new Request()
http.setConfig((config) => {
	/* 设置全局配置 */
	config.baseURL = baseURL /* 根域名不同 */
	config.header = {
		...config.header
	}
	config.custom = {
		auth: true, // 是否传token
		loading: false // 是否使用loading
	}
	return config;
})


http.interceptors.request.use((config) => {
	/* 请求之前拦截器。可以使用async await 做异步操作 */
	// 加载中
	if (config.custom.loading) {
		uni.showLoading();
	}
	config.header = {
		...config.header
	}
	// 配置orgid
	// config.header.OrgId = getApp().vuex_org_id;
	if (config.custom.auth) {
		config.header.Authorization = getUserTokenStorage();
	}
	/*
 if (!token) { // 如果token不存在，return Promise.reject(config) 会取消本次请求
   return Promise.reject(config)
 }
 */
	// console.log('config: ', config);
	return config;
}, (config) => {
	return Promise.reject(config);
})

http.interceptors.response.use(async (response) => {
	/* 请求之后拦截器。可以使用async await 做异步操作  */
	if (response.data.code == 401) {
		console.error("401,token过期无权限进入。刷新token再次请求");
		// uni.setStorageSync('user', null);
		uni.setStorageSync('token', null);
		let user = uni.getStorageSync('user');

		if (user && user.id) {
			console.log('user: ', user);
			const {
				data: token
			} = await refreshToken(user.id)
			console.log('token: ', token);
			uni.setStorageSync('token', token);
			response.config.header.Authorization = 'Bearer ' + token
			return new Promise(resolve => {
				resolve(http.request(response.config))
			})
		} else {
			uni.setStorageSync('user', null);
			getApp().globalData.isLogin = false;
			uni.showModal({
				title: '提示',
				content: '登录已过期，您需要登录后才能进行后续操作',
				cancelText: '取消', // 取消按钮的文字
				confirmText: "去登录", // 确认按钮的文字
				success(res) {
					if (res.confirm) {
						uni.reLaunch({
							url: '/pages/login/login'
						});
					}
				}
			})
			return Promise.reject(response);
			// console.error("登录过期");
			// uni.reLaunch({
			// 	url: "/pages/login/index"
			// })
			// }
			// 	count = 0
			// 	uni.setStorageSync('user', null);
			// 	setTimeout(() => {
			// 		try {
			// 			let pages = getCurrentPages() // 获取栈实例
			// 			// let currentPage = pages[pages.length - 1].route; // 获取当前页面路由
			// 			let currentPage = pages[pages.length - 1]['$page']['fullPath'] //当前页面路径(带参数)
			// 			if (currentPage.startsWith("pages")) {
			// 				currentPage = "/" + currentPage;
			// 			}
			// 			uni.reLaunch({
			// 				url: currentPage
			// 			})
			// 		} catch (e) {
			// 			//TODO handle the exception
			// 			uni.reLaunch({
			// 				url: '/pages/index/index'
			// 			})
			// 		}

			// 	}, 2000)
		}
	}
	if (response.data.code == 500) {
		// uni.showToast({
		// 	icon: 'error',
		// 	title: '内部服务器出错'
		// })
		uni.showToast({
			icon: 'none',
			title: response.data.msg
		})
	}
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	return response;
}, (response) => { // 请求错误做点什么。可以使用async await 做异步操作
	if (response.config.custom.loading) {
		uni.hideLoading()
	}
	if (response.statusCode == undefined) {
		uni.showToast({
			icon: 'none',
			title: '网络请求失败'
		})
	}
	return Promise.reject(response);
})

export {
	http,
	// baseIpPort,
	baseURL,
	getUserTokenStorage,
}