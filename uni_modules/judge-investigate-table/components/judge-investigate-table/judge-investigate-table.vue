<template>
	<view>
		<uni-popup ref="popup" :mask-click="false">
			<view class="rule__view">
				<view class="title">侦察裁决</view>
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td :colspan="3" align="center" class="color-light-pink">确定（指令及装备）</uni-td>
						<uni-td :colspan="3" align="center" class="color-light-yellow">判断（指控条件）</uni-td>
						<uni-td :colspan="4" align="center" class="color-light-blue">修正（指控等级）</uni-td>
						<uni-td :colspan="2" align="center" class="color-light-green">裁定（指控结果）</uni-td>
						<uni-td align="center" width="80" class="color-orange" @click="getRandomInt(1, 100)">
							随机值
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" width="100" class="color-light-pink">指令</uni-td>
						<uni-td align="center" class="color-light-pink">装备</uni-td>
						<uni-td align="center" width="180" class="color-white">
							<uni-data-select
								style="width: 100%"
								v-model="info.equipment"
								:localdata="selectDataOptions.investigateEquipmentRange"
							></uni-data-select>
						</uni-td>
						<uni-td :rowspan="2" align="center" class="color-light-yellow">通视判定</uni-td>
						<uni-td align="center" class="color-light-yellow">通信距离</uni-td>
						<uni-td align="center" width="100" class="color-white">
							<uni-data-select
								style="width: 100%"
								v-model="info.visibleDistance"
								:localdata="selectDataOptions.visibleDistanceRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">侦察单位状态修正</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('investigateUnitStatus')"
						>
							{{ info.investigateUnitStatus ? '×' + info.investigateUnitStatus : '' }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">距离修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('distance')">
							{{ info.distance ? '×' + info.distance : '' }}
						</uni-td>
						<uni-td align="center" class="color-light-green">修正后侦察能力值</uni-td>
						<uni-td align="center" width="100" class="color-white">{{ info.correctValue }}</uni-td>
						<uni-td :rowspan="4" align="center" class="random" @click="getRandomInt(1, 100)">
							{{ info.random }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td :rowspan="2" align="center" class="color-white">{{ actionInfo.actionDesc }}</uni-td>
						<uni-td align="center" class="color-light-pink">侦察方式</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								style="width: 100%"
								v-model="info.investigateWay"
								:localdata="selectDataOptions.investigateWayRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-yellow">通视判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								style="width: 100%"
								v-model="info.visibleDetermine"
								:localdata="selectDataOptions.visibleDetermineRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">目标单位状态修正</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('targetUnitStatus')"
						>
							{{ info.targetUnitStatus ? '×' + info.targetUnitStatus : '' }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">气象修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('weather')">
							{{ info.weather ? '×' + info.weather : '' }}
						</uni-td>
						<uni-td align="center" class="color-light-green">情报深等级度</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('depthLevel')">
							{{ info.depthLevel }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" class="color-light-pink">基本侦察能力值</uni-td>
						<uni-td align="center" class="color-white">
							<!-- <input type="digit" v-model="info.baseValue" /> -->
							<uni-easyinput type="digit" v-model="info.baseValue" :clearable="false"></uni-easyinput>
						</uni-td>
						<uni-td :colspan="2" align="center" class="color-light-yellow">装备判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								style="width: 100%"
								v-model="info.canUse"
								:localdata="selectDataOptions.canUseRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">地形修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('terrain')">
							{{ info.terrain ? '×' + info.terrain : '' }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">行动修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('action')">
							{{ info.action ? '×' + info.action : '' }}
						</uni-td>
						<uni-td align="center" class="color-light-green">情报深度</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								style="width: 100%"
								v-model="info.depth"
								:localdata="selectDataOptions.depthRange"
							></uni-data-select>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="foot">
					<view style="flex: 1" class="color-blue" @click="confirmJudge">提交裁决</view>
					<view style="flex: 1" @click="close" class="color-red">关闭</view>
				</view>
			</view>
		</uni-popup>
		<judge-correct-table
			:data="investigateData"
			ref="judgeCorrectTable"
			@selectData="selectData"
		></judge-correct-table>
	</view>
</template>
<script>
import BigNumber from 'bignumber.js';
// import { investigateData } from '@/static/json/judge-investigate-table.js';
// import {
// 	investigateEquipmentRange,
// 	investigateWayRange,
// 	visibleDistanceRange,
// 	visibleDetermineRange,
// 	depthLevelRange,
// 	depthRange,
// 	canUseRange
// } from '@/static/json/judge-select-data.js';
import { confirmJudge } from '@/api/verdictRecord.js';
import { getJson } from '@/api/json.js';
export default {
	name: 'judge-investigate-table',
	data() {
		return {
			investigateData: {},
			selectDataOptions: {},
			// investigateEquipmentRange: investigateEquipmentRange,
			// investigateWayRange: investigateWayRange,
			// visibleDistanceRange: visibleDistanceRange,
			// visibleDetermineRange: visibleDetermineRange,
			// depthLevelRange: depthLevelRange,
			// depthRange: depthRange,
			// canUseRange: canUseRange,
			info: {
				equipment: '',
				investigateWay: '',
				baseValue: '',
				visibleDistance: '',
				visibleDetermine: '',
				canUse: '',
				investigateUnitStatus: '',
				targetUnitStatus: '',
				distance: '',
				weather: '',
				action: '',
				terrain: '',
				correctValue: '',
				depthLevel: '',
				depth: '',
				random: ''
			}
		};
	},
	props: {
		actionInfo: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	async mounted() {
		let data = await getJson('/static/json/judge-investigate-table.json');
		this.investigateData = data;
		let selectDataOptions = await getJson('/static/json/judge-select-data.json');
		this.selectDataOptions = selectDataOptions;
	},
	watch: {
		info: {
			handler(newVal) {
				console.log('获取新数据: ', newVal);
				this.calculate(newVal);
			},
			deep: true
		}
	},
	methods: {
		getRandomInt(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			this.info.random = Math.floor(Math.random() * (max - min + 1)) + min;
		},
		calculate(newVal) {
			if (
				this.info.baseValue !== '' &&
				this.info.investigateUnitStatus !== '' &&
				this.info.targetUnitStatus !== '' &&
				this.info.action !== '' &&
				this.info.distance !== '' &&
				this.info.weather !== '' &&
				this.info.terrain !== ''
			)
				this.info.correctValue = Math.floor(
					BigNumber(this.info.baseValue)
						.times(this.info.investigateUnitStatus)
						.times(this.info.targetUnitStatus)
						.times(this.info.action)
						.times(this.info.distance)
						.times(this.info.weather)
						.times(this.info.terrain)
						.toNumber()
				);
			// Math.floor(
			// 	this.info.baseValue *
			// 		this.info.investigateUnitStatus *
			// 		this.info.targetUnitStatus *
			// 		this.info.action *
			// 		this.info.distance *
			// 		this.info.weather *
			// 		this.info.terrain *
			// 		10
			// ) / 10;
		},
		open() {
			this.$refs.popup.open();
			// this.sign();
		},
		close() {
			this.$refs.popup.close();
		},
		// 选择数据返回
		selectData(value, type) {
			switch (type) {
				case 'investigateUnitStatus':
					this.info.investigateUnitStatus = value;
					break;
				case 'targetUnitStatus':
					this.info.targetUnitStatus = value;
					break;
				case 'distance':
					this.info.distance = value;
					break;
				case 'weather':
					this.info.weather = value;
					break;
				case 'action':
					this.info.action = value;
					break;
				case 'terrain':
					this.info.terrain = value;
					break;
				case 'depthLevel':
					this.info.depthLevel = value;
					break;
				default:
					break;
			}
		},
		confirmJudge() {
			this.actionInfo.actionInfoArray = JSON.stringify(this.info);
			this.actionInfo.attackResult = this.info.depth;
			// this.$emit('confirmJudge', this.info);
			confirmJudge(this.actionInfo).then((res) => {
				if (res.data.code == 200) {
					uni.showToast({
						title: '提交成功！',
						icon: 'none',
						duration: 2000
					});
					setTimeout(() => {
						this.$emit('confirmJudge', res.data.data);
						this.close();
					}, 2000);
				} else {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					});
				}
			});
		}
	}
};
</script>
<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.rule__view {
	background-color: $uni-bg-color;

	.title {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-weight: bolder;
		background-color: #ffffff;
		font-size: $uni-font-size-title;
		color: #000000;
	}

	.foot {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-weight: bolder;
		background-color: #1cade4;
		font-size: $uni-font-size-title;
		color: $uni-text-color-inverse;
		display: flex;
		width: auto;
	}
}
</style>
