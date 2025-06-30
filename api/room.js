import {
	http
} from '@/api/http.js'


// 创建房间号
export const generateInviteCode = (verdictRecordId) => {
	return http.request({
		url: 'armory/generateInviteCode/' + verdictRecordId,
		method: 'GET'
	});
}
export const joinRoom = (inviteCode,type) => {
	return http.request({
		url: 'armory/joinRoom/' + inviteCode+"/"+type,
		method: 'POST'
	});
}

export const queryVerdictRecordByInviteCode = (data) => {
	return http.request({
		url: 'armory/queryVerdictRecordByInviteCode',
		method: 'POST',
		params: data
	});
}



export const queryCampList = (data) => {
	return http.request({
		url: 'armory/queryCampList',
		method: 'POST',
		data
	});
}
export const chooseCamp = (data) => {
	return http.request({
		url: 'armory/chooseCamp',
		method: 'POST',
		data
	});
}
export const startGame = (data) => {
	return http.request({
		url: 'armory/startGame',
		method: 'POST',
		data
	});
}