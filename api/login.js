import api from '@/api/index.js'
import Vue from 'vue'
// const xinyiSetSession = uniCloud.importObject('xinyi-set-session');
// 登录
const login = () => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			title: '登录中...',
			mask: true,
			duration: 10000
		});
		uni.login({
			success(res) {
				if (res.code) {
					console.log(res.code)
					// 微信小程序登录
					wxmpLogin(res.code, resolve, reject);
				} else {
					reject('微信登录失败' + res.errMsg);
				}
			},
			fail(err) {
				reject('微信登录失败' + err);
			}
		});
	})

}

// 微信小程序登录
const wxmpLogin = (code, resolve, reject) => {
	//微信小程序登录
	api.wxmpLogin(code).then((res) => {
		if (res.data.code == 200) {
			let data = res.data.data;
			// 存储信息到uniCloud用于uniAd
			// setSession(data);
			let token = data.token;
			uni.setStorageSync('token', token);
			// 获取用户信息
			getUserInfo(resolve, reject);
		} else {
			reject('微信授权登录失败' + res.errMsg);
		}
	}).catch((err) => {
		reject('微信授权登录失败' + err);
	})
}

const setSession = (data, reject) => {
	let openid = data.openid;
	let session_key = data.session_key;
	if (openid != null && openid != '') {
		// 存储openid、session_key至unicloud
		// session_key过期时间暂定30天，token过期小于此数
		// todo 使用uniAd refreshToken时 重新获取session_key
		xinyiSetSession
			.setSession(openid, session_key)
			.then(async (res) => {
				// #ifdef MP-WEIXIN
				// 调用自有服务、云函数进行微信登录或以其他方式获取openid
				await uniCloud.initSecureNetworkByWeixin({
					openid: openid
				});
				// #endif
			})
			.catch((err) => {
				reject('存储对话信息失败！' + err.errMsg)
			});
	}
}

// 获取用户信息
const getUserInfo = (resolve, reject) => {
	api.getUserInfo().then((res) => {
		if (res.data.code == 200) {
			let user = res.data.data;
			uni.setStorageSync('user', user);
			uni.showToast({
				icon: 'none',
				title: '登录成功'
			});
			resolve(user);
			Vue.prototype.$isResolve();
			console.info("登录成功！");
		} else {
			reject('登录失败，获取用户信息失败' + res);
		}
	}).catch((err) => {
		reject('登录失败，获取用户信息错误' + err);
	});
}

// 判断登录状态
const isLogin = () => {
	let user = uni.getStorageSync('user');
	if (!user) {
		login();
	}
}

export default {
	login,
	isLogin
}