import {
	http
} from '@/api/http.js'


export const queryArmoryList = (data) => {
	return http.request({
		url: 'armory/queryArmoryList',
		method: 'GET',
		data: data
	});
}
export const queryArmoryDetail = (data) => {
	return http.request({
		url: 'armory/queryArmoryDetail',
		method: 'POST',
		data: data
	});
}