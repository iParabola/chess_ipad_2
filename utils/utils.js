/**
 * 通用js方法封装处理
 * Copyright (c) 2019 ruoyi
 */

// 日期格式化
export function parseTime(time, pattern) {
	if (arguments.length === 0 || !time) {
		return null
	}
	const format = pattern || '{y}-{m}-{d} {h}:{i}:{s}'
	let date
	if (typeof time === 'object') {
		date = time
	} else {
		if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
			time = parseInt(time)
		} else if (typeof time === 'string') {
			time = time.replace(new RegExp(/-/gm), '/').replace('T', ' ').replace(new RegExp(/\.[\d]{3}/gm), '');
		}
		if ((typeof time === 'number') && (time.toString().length === 10)) {
			time = time * 1000
		}
		date = new Date(time)
	}
	const formatObj = {
		y: date.getFullYear(),
		m: date.getMonth() + 1,
		d: date.getDate(),
		h: date.getHours(),
		i: date.getMinutes(),
		s: date.getSeconds(),
		a: date.getDay()
	}
	const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
		let value = formatObj[key]
		// Note: getDay() returns 0 on Sunday
		if (key === 'a') {
			return ['日', '一', '二', '三', '四', '五', '六'][value]
		}
		if (result.length > 0 && value < 10) {
			value = '0' + value
		}
		return value || 0
	})
	return time_str
}

// 表单重置
export function resetForm(refName) {
	if (this.$refs[refName]) {
		this.$refs[refName].resetFields();
	}
}

// 添加日期范围
export function addDateRange(params, dateRange, propName) {
	let search = params;
	search.params = typeof(search.params) === 'object' && search.params !== null && !Array.isArray(search.params) ?
		search.params : {};
	dateRange = Array.isArray(dateRange) ? dateRange : [];
	if (typeof(propName) === 'undefined') {
		search.params['beginTime'] = dateRange[0];
		search.params['endTime'] = dateRange[1];
	} else {
		search.params['begin' + propName] = dateRange[0];
		search.params['end' + propName] = dateRange[1];
	}
	return search;
}

// 回显数据字典
export function selectDictLabel(datas, value) {
	if (value === undefined) {
		return "";
	}
	var actions = [];
	Object.keys(datas).some((key) => {
		if (datas[key].value == ('' + value)) {
			actions.push(datas[key].label);
			return true;
		}
	})
	if (actions.length === 0) {
		actions.push(value);
	}
	return actions.join('');
}

// 回显数据字典（字符串、数组）
export function selectDictLabels(datas, value, separator) {
	if (value === undefined || value.length === 0) {
		return "";
	}
	if (Array.isArray(value)) {
		value = value.join(",");
	}
	var actions = [];
	var currentSeparator = undefined === separator ? "," : separator;
	var temp = value.split(currentSeparator);
	Object.keys(value.split(currentSeparator)).some((val) => {
		var match = false;
		Object.keys(datas).some((key) => {
			if (datas[key].value == ('' + temp[val])) {
				actions.push(datas[key].label + currentSeparator);
				match = true;
			}
		})
		if (!match) {
			actions.push(temp[val] + currentSeparator);
		}
	})
	return actions.join('').substring(0, actions.join('').length - 1);
}

// 字符串格式化(%s )
export function sprintf(str) {
	var args = arguments,
		flag = true,
		i = 1;
	str = str.replace(/%s/g, function() {
		var arg = args[i++];
		if (typeof arg === 'undefined') {
			flag = false;
			return '';
		}
		return arg;
	});
	return flag ? str : '';
}

// 转换字符串，undefined,null等转化为""
export function parseStrEmpty(str) {
	if (!str || str == "undefined" || str == "null") {
		return "";
	}
	return str;
}

// 数据合并
export function mergeRecursive(source, target) {
	for (var p in target) {
		try {
			if (target[p].constructor == Object) {
				source[p] = mergeRecursive(source[p], target[p]);
			} else {
				source[p] = target[p];
			}
		} catch (e) {
			source[p] = target[p];
		}
	}
	return source;
};

/**
 * 构造树型结构数据
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
export function handleTree(data, id, parentId, children) {
	let config = {
		id: id || 'id',
		parentId: parentId || 'parentId',
		childrenList: children || 'children'
	};

	var childrenListMap = {};
	var nodeIds = {};
	var tree = [];

	for (let d of data) {
		let parentId = d[config.parentId];
		if (childrenListMap[parentId] == null) {
			childrenListMap[parentId] = [];
		}
		nodeIds[d[config.id]] = d;
		childrenListMap[parentId].push(d);
	}

	for (let d of data) {
		let parentId = d[config.parentId];
		if (nodeIds[parentId] == null) {
			tree.push(d);
		}
	}

	for (let t of tree) {
		adaptToChildrenList(t);
	}

	function adaptToChildrenList(o) {
		if (childrenListMap[o[config.id]] !== null) {
			o[config.childrenList] = childrenListMap[o[config.id]];
		}
		if (o[config.childrenList]) {
			for (let c of o[config.childrenList]) {
				adaptToChildrenList(c);
			}
		}
	}
	return tree;
}

/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
	let result = ''
	for (const propName of Object.keys(params)) {
		const value = params[propName];
		var part = encodeURIComponent(propName) + "=";
		if (value !== null && value !== "" && typeof(value) !== "undefined") {
			if (typeof value === 'object') {
				for (const key of Object.keys(value)) {
					if (value[key] !== null && value[key] !== "" && typeof(value[key]) !== 'undefined') {
						let params = propName + '[' + key + ']';
						var subPart = encodeURIComponent(params) + "=";
						result += subPart + encodeURIComponent(value[key]) + "&";
					}
				}
			} else {
				result += part + encodeURIComponent(value) + "&";
			}
		}
	}
	return result
}

// 验证是否为blob格式
export function blobValidate(data) {
	return data.type !== 'application/json'
}

/**
 * @param {*} arg1 数字
 * @param {*} arg2 数字
 * @description 两数字相乘 保持精度
 */
export function accMul(arg1, arg2) {
	let m = 0
	const s1 = arg1.toString()
	const s2 = arg2.toString()
	try {
		m += s1.split('.')[1].length
	} catch (e) {}
	try {
		m += s2.split('.')[1].length
	} catch (e) {}
	return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m)
}

/**
 * @param {*} arg1 数字
 * @param {*} arg2 数字
 * @description 两数字相除 保持精度
 */
export function accDiv(arg1, arg2) {
	let t1 = 0
	let t2 = 0
	let r1, r2
	try {
		t1 = arg1.toString().split('.')[1].length
	} catch (e) {}
	try {
		t2 = arg2.toString().split('.')[1].length
	} catch (e) {}
	try {
		r1 = Number(arg1.toString().replace('.', ''))
	} catch (e) {}
	try {
		r2 = Number(arg2.toString().replace('.', ''))
	} catch (e) {}
	let intDiv = r1 / r2
	let pow = Math.pow(10, t2 - t1)
	return accMul(intDiv, pow) // 这里用上面定义好的乘法运算
}
/**
 * @param {Object} birthday 出生日期
 * @description 通过出生日期计算年龄
 */
export function calculateAge(birthday) {
	const ageDifMs = Date.now() - new Date(birthday).getTime();
	const ageDate = new Date(ageDifMs);
	return Math.abs(ageDate.getUTCFullYear() - 1970);
}


export function formatterVipType(user) {
	if (user.vipType == '2') {
		//永久会员
		return 2;
	} else {
		//是VIP
		if (user.vipType == '1') {
			let nowDate = new Date(getNowTime()); //当前时间
			let vipTime = new Date(user.vipTime); //截止时间
			if (nowDate.getTime() > vipTime.getTime()) {
				//会员已过期
				return 3;
			} else {
				return 1;
			}
		} else {
			return 0;
		}
	}
}

function getNowTime() {
	return traversalTime(new Date().getTime());
}

function traversalTime(timestamp) {
	//timestamp(时间戳)是整数，否则要parseInt转换
	let time = new Date(timestamp);
	let y = time.getFullYear();
	let m = time.getMonth() + 1;
	let d = time.getDate();
	let h = time.getHours();
	let mm = time.getMinutes();
	let s = time.getSeconds();
	return (
		y +
		'-' +
		addTimes(m) +
		'-' +
		addTimes(d) +
		' ' +
		addTimes(h) +
		':' +
		addTimes(mm) +
		':' +
		addTimes(s)
	);
}

function addTimes(m) {
	return m < 10 ? '0' + m : m;
}

/**
 * uni 获取图片高度 单位rpx
 * @param {Object} url 图片链接
 */
export async function getImageheight(url) {
	let res = await getImageInfo(url)
	console.log(res);
	let proportion = 690 / res.width;
	let height = proportion * res.height;
	height = height.toFixed(2); //还原图片真实比例。
	return height + 'rpx';
}

function getImageInfo(imgSrc) {
	return new Promise((resolve, reject) => {
		uni.getImageInfo({
			src: imgSrc,
			success: (image) => {
				resolve(image);
				console.log('获取图片成功', image)
			},
			fail: (err) => {
				reject(err);
				console.log('获取图片失败', err)
			}
		});
	});
}

export function formateTimeStamp(timeStamp) {
	var day;
	var hour;
	var min;
	var seconds;

	day = parseInt(timeStamp / (24 * 60 * 60)); // 计算整数天数
	var afterDay = timeStamp - day * 24 * 60 * 60; // 取得算出天数后剩余的秒数
	hour = parseInt(afterDay / (60 * 60)); // 计算整数小时数
	var afterHour = timeStamp - day * 24 * 60 * 60 - hour * 60 * 60; // 取得算出小时数后剩余的秒数
	min = parseInt(afterHour / 60); // 计算整数分
	seconds = parseInt(timeStamp - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60); // 取得算出分后剩余的秒数

	if (day < 10) {
		day = '0' + day;
	}

	if (hour < 10) {
		hour = '0' + hour;
	}

	if (min < 10) {
		min = '0' + min;
	}

	if (seconds < 10) {
		seconds = '0' + seconds;
	}

	const restStamp = {
		day: day,
		hour: hour,
		min: min,
		seconds: seconds
	};
	return restStamp;
}

function isInteger(obj) {
	return obj % 1 === 0
}
//m,n为正整数的分子和分母 约分
export function reductionTo(m, n) {
	if (!isInteger(m) || !isInteger(n)) {
		console.log('m和n必须为整数');
		return;
	} else if (m <= 0 || n <= 0) {
		console.log('m和n必须大于0');
		return;
	}
	var a = m;
	var b = n;
	(a >= b) ? (a = m, b = n) : (a = n, b = m);
	if (m != 1 && n != 1) {
		for (var i = b; i >= 2; i--) {
			if (m % i == 0 && n % i == 0) {
				m = m / i;
				n = n / i;
			}
		}
	}
	return m + ":" + n;
}

// 计算两日期间隔天数
export function calculateDaysBetweenDates(date1, date2) {
	// 获取两个日期对象的时间戳
	let time1 = new Date(date1).getTime();
	let time2 = new Date(date2).getTime();

	// 计算相差的毫秒数
	let diff = Math.abs(time1 - time2);

	// 将毫秒数转换为天数
	let days = Math.floor(diff / (1000 * 60 * 60 * 24));

	return days;
}
/**
 * 通过字符串时间，获取年月日
 * @param {Object} val
 */
export function getPartTime(val) {
	var timearr = val.split(" ");
	return timearr[0];
}