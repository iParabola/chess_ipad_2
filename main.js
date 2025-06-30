import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'

import '@/utils/interceptor.js'
import {
	filters
} from '@/utils/filters.js'
import {
	baseOssIpPort
} from '@/static/json/base-url.js'
import {
	parseTime,
	resetForm,
	addDateRange,
	selectDictLabel,
	selectDictLabels,
	handleTree,
	accMul,
	accDiv,
	calculateAge,
	formatterVipType,
	formateTimeStamp,
	reductionTo,
	calculateDaysBetweenDates,
	getPartTime
} from "@/utils/utils.js";
import vdr from 'vue-draggable-resizable-gorkys'
// 导入默认样式
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
Vue.component('vdr', vdr)
// 定义全局自定义过滤器
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})
// 解决中onLaunch异步方法与onLoad执行顺序问题
Vue.prototype.$onLaunched = new Promise((resolve) => {
	Vue.prototype.$isResolve = resolve
})

Vue.config.productionTip = false
Vue.prototype.parseTime = parseTime
Vue.prototype.resetForm = resetForm
Vue.prototype.addDateRange = addDateRange
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.selectDictLabels = selectDictLabels
Vue.prototype.handleTree = handleTree
Vue.prototype.accMul = accMul
Vue.prototype.accDiv = accDiv;
Vue.prototype.formatterVipType = formatterVipType
Vue.prototype.calculateAge = calculateAge;
Vue.prototype.formateTimeStamp = formateTimeStamp;
Vue.prototype.reductionTo = reductionTo;
Vue.prototype.calculateDaysBetweenDates = calculateDaysBetweenDates;
Vue.prototype.getPartTime = getPartTime;
Vue.prototype.baseOssIpPort = baseOssIpPort;

Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif