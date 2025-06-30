import {
	accMul,
	accDiv
} from '@/utils/utils.js'
import {
	getDictLabelByValue
} from '@/api/dict.js'
export const filters = {
	// 格式化金钱（分→元，保留两位小数）
	formatMoney: value => {
		if (value == undefined) {
			return 0;
		}
		return accDiv(value, 100).toFixed(2);
	},
	// 格式化发货类型标签
	formatShipTagType: value => {
		if (value == '0') {
			return 'success';
		}
		if (value == '1') {
			return 'primary';
		}
		if (value == '2') {
			return 'warning';
		}
	},
	// 格式化订单状态标签
	formatOrderStatus: value => {
		if (value == '0') {
			// 未付款
			return 'error';
		}
		if (value == '1') {
			// 已付款
			return 'success';
		}
		if (value == '2') {
			// 已退款
			return 'warning';
		}
		if (value == '3') {
			// 退款中
			return 'primary';
		}
	},
	// 格式化字典文字
	formatText: (value, dictData) => {
		if (value && value != '请选择') {
			let shipmentTypeText = getDictLabelByValue(value, dictData);
			return shipmentTypeText;
		} else {
			return value;
		}

	},
	// 格式化素材id为数量
	formatMaterialIds: ids => {
		if (ids && ids != '请选择') {
			return ids.split(",").length + '个';
		} else {
			return ids;
		}
	},
	// 格式化设备id为数量
	formatEquipmentIds: ids => {
		if (ids && ids != '请选择') {
			return ids.split(",").length + '台';
		} else {
			return ids;
		}
	},
	// 补全0
	padZero: num => {
		if (num) {
			return num.toString().padStart(4, '0');
		}
	},
	formatSecondsToHMS: seconds => {
		return new Date(seconds * 1000).toISOString().substr(11, 8);
	}
}