import {
	http
} from '@/api/http.js'
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */
const test = (data) => {
	return http.request({
		url: 'api/test',
		method: 'POST',
		data
	});
}


export default {
	test
}