import {
	http
} from '@/api/http.js'


export const queryVerdictChessPiecesVos = (data) => {
	return http.request({
		url: 'armory/queryVerdictChessPiecesVos',
		method: 'POST',
		data: data
	});
}