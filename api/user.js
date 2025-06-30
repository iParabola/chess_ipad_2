import {
	http
} from '@/api/http.js'


/**
 * 注册
 */
export const register = (data) => {
	return http.request({
		url: 'user/register',
		method: 'POST',
		data
	});
}
/**
 * 登录
 */
export const login = (data) => {
	return http.request({
		url: 'user/login',
		method: 'POST',
		data
	});
}

// 刷新token
export const refreshToken = (userId) => {
	return http.request({
		url: 'user/refreshToken/' + userId,
		method: 'POST'
	})
}