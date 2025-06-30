import {
	getDataByDictType
} from '@/api/system.js'

// 字典管理
export const dict = async (dictType) => {
	let dictData = getApp().globalData[dictType];
	if (!dictData) {
		let res = await getDataByDictType(dictType);
		if (res.data.code == 200) {
			let data = res.data.data;
			getApp().globalData[dictType] = data;
			return data;
		}
	} else {
		console.log("全局变量")
		return dictData;
	}
}
/**
 * 获取字典文本
 * @param {string}  = [value] 类型状态值
 * @param {string}  = [dictData] 字典类型
 */
export const getDictLabelByValue = (value, dictData) => {
	let label = "";
	if (dictData) {
		dictData.forEach((dictItem, index) => {
			if (dictItem.dictValue == value) {
				label = dictItem.dictLabel;
			}
		})
	}
	return label;
}