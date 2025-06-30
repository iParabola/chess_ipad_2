let config = {
	//不需要登录的页面,白名单
	whiteList: ['/pages/login/login', '/pages/login/register', '/pages/login/forget-password',
		'/pages/index/index', '/pages/index/contact', '/pages/index/guide', '/pages/case/list',
		'/pages/case/detail', '/pages/voucher/list', '/pages/voucher/new'
	],
	loginPage: '/pages/login/login'
}

// 1、H5路由拦截,用于拦截用户地址栏输入地址
// #ifdef H5
// let token = uni.getStorageSync('token');
let token = "123456";
let locationUrl = window.location.href.split("/#")[1]
if (!config.whiteList.includes(locationUrl) && (token == '' || token == 'false' || token == null)) {
	uni.showModal({
		title: '提示',
		content: '登录已过期，您需要登录后才能进行后续操作',
		cancelText: '取消', // 取消按钮的文字
		confirmText: "去登录", // 确认按钮的文字
		success(res) {
			if (res.confirm) {
				uni.reLaunch({
					url: config.loginPage
				});
			}
		}
	})
}
// #endif
// #ifndef H5
///2、uniapp跳转页面路由拦截器  navigateBack拦截会失效
let list = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
list.forEach(item => { //用遍历的方式分别为,uni.navigateTo,uni.redirectTo,uni.reLaunch,uni.switchTab这4个路由方法添加拦截器
	uni.addInterceptor(item, {
		invoke(e) { // 调用前拦截
			const token = uni.getStorageSync('token'), //获取用户的token				
				url = e.url.split('?')[0]; //获取要跳转的页面路径（url去掉"?"和"?"后的参数）		
			let notNeed = config.whiteList.includes(url)
			// 如果在whiteList里面就不需要登录
			if (notNeed) {
				return e
			} else {
				if (token == '' || token == 'false' || token == null) {
					uni.showModal({
						title: '提示',
						content: '登录已过期，您需要登录后才能进行后续操作',
						cancelText: '取消', // 取消按钮的文字
						confirmText: "去登录", // 确认按钮的文字
						success(res) {
							if (res.confirm) {
								uni.reLaunch({
									url: config.loginPage
								});
							}
						}
					})
					return false
				} else {
					return e
				}
			}

		},
		fail(err) { // 失败回调拦截 
			console.log(err);
		}
	})
})
// #endif