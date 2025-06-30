import {
	http
} from '@/api/http.js'



export const queryMapInfo = (data) => {
	return http.request({
		url: 'armory/queryMapInfo',
		method: 'POST',
		data: data
	});
}
export const exportOffsetAndCoordinate = (data) => {
	return http.request({
		url: 'armory/exportOffsetAndCoordinate',
		method: 'POST',
		data: data
	});
}