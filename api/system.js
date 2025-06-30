import {
	http,
	baseURL,
	getUserTokenStorage
} from '@/api/http.js'
/**
 * 将业务所有接口统一起来便于维护
 * 如果项目很大可以将 url 独立成文件，接口分成不同的模块
 *
 */
export const getDataByDictType = (dictType) => {
	return http.request({
		url: 'system/getDataByDictType/' + dictType,
		method: 'GET'
	});
}

/**
 * 根据参数键名查询参数值
 */
export const getConfigKey = (configKey) => {
	return http.request({
		url: 'system/getConfigKey/' + configKey,
		method: 'GET'
	});
}
/**
 * 根据参数键名查询参数值
 */
export const getOssById = (ossId) => {
	return http.request({
		url: 'system/getOssById/' + ossId,
		method: 'GET'
	});
}

export const upload = (path) => {
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: baseURL + 'system/upload',
			filePath: path,
			name: 'file',
			header: {
				Authorization: getUserTokenStorage()
			},
			success: (uploadFileRes) => {
				console.log(uploadFileRes)
				let jsonRes = JSON.parse(uploadFileRes.data);
				if (jsonRes.code == 200) {
					resolve(jsonRes.data.url);
				} else {
					reject("上传失败");
				}
			},
			fail: (err) => {
				reject(err)
			}
		});
	});
}