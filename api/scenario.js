import {
	http
} from '@/api/http.js'


export const queryVerdictScenarioVos = (data) => {
	return http.request({
		url: 'armory/queryVerdictScenarioVos',
		method: 'POST',
		data: data
	});
}
export const queryScenarios = () => {
	return http.request({
		url: 'armory/queryScenarios',
		method: 'GET'
	});
}
export const queryScenarioIdByVerdictRecordId = (data) => {
	return http.request({
		url: 'armory/queryScenarioIdByVerdictRecordId',
		method: 'POST',
		data: data
	});
}