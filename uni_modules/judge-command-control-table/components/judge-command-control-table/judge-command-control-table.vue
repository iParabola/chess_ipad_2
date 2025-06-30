<template>
	<view>
		<uni-popup ref="popup" :mask-click="false">
			<view class="rule__view">
				<view class="title">指控效果裁决</view>
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td :colspan="2" align="center" class="color-light-pink">确定（指令及装备）</uni-td>
						<uni-td :colspan="3" align="center" class="color-light-yellow">判断（指控条件）</uni-td>
						<uni-td :colspan="4" align="center" class="color-light-blue">修正（指控等级）</uni-td>
						<uni-td :colspan="2" align="center" class="color-light-green">裁定（指控结果）</uni-td>
						<uni-td align="center" width="80" class="color-orange" @click="getRandomInt(1, 100)">
							随机值
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" width="100" class="color-light-pink">指令</uni-td>
						<uni-td align="center" width="150" class="color-light-pink">装备</uni-td>
						<uni-td :rowspan="2" align="center" class="color-light-yellow">通视判定</uni-td>
						<uni-td align="center" class="color-light-yellow">通信距离</uni-td>
						<uni-td align="center" width="140" class="color-white">
							<uni-data-select
								style="width: 100%"
								v-model="info.visibleDistance"
								:localdata="selectDataOptions.visibleDistanceRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" width="100" class="color-light-blue">基础指控等级</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('baseCcLevel')">
							{{ info.baseCcLevel }}
						</uni-td>
						<uni-td align="center" width="100" class="color-light-blue">指控效果概率（%）</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('ccEffectProbability')"
						>
							{{ info.ccEffectProbability }}
						</uni-td>
						<uni-td :rowspan="4" align="center" width="80" class="color-light-green">指控效果</uni-td>
						<uni-td :rowspan="4" align="center" width="110" class="color-white">
							<uni-data-select
								style="width: 100%"
								placement="top"
								v-model="info.taskStatus"
								:localdata="selectDataOptions.taskStatusRange"
							></uni-data-select>
						</uni-td>
						<uni-td :rowspan="4" align="center" class="random" @click="getRandomInt(1, 100)">
							{{ info.random }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td :rowspan="3" width="100" align="center" class="color-white">
							{{ actionInfo.actionDesc }}
						</uni-td>
						<uni-td :rowspan="3" align="center" class="color-white">
							<uni-data-select
								style="width: 100%"
								placement="top"
								v-model="info.equipment"
								:localdata="selectDataOptions.equipmentRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-yellow">通视判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								style="width: 100%"
								v-model="info.visibleDetermine"
								:localdata="selectDataOptions.visibleDetermineRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">训练水平修正</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('trainingLevel')"
						>
							{{ info.trainingLevel ? '×' + info.trainingLevel : '' }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">安全防护等级修正</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('safetyProtectionLevel')"
						>
							{{ info.safetyProtectionLevel ? '×' + info.safetyProtectionLevel : '' }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td :colspan="2" align="center" class="color-light-yellow">发现判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								style="width: 100%"
								v-model="info.discoveryStatus"
								:localdata="selectDataOptions.discoveryStatusRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">最终指控效果概率（%）</uni-td>
						<uni-td :colspan="3" align="center" class="color-white">{{ info.correctValue }}</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td :colspan="2" align="center" class="color-light-yellow">装备判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								style="width: 100%"
								v-model="info.canUse"
								:localdata="selectDataOptions.canUseRange"
							></uni-data-select>
						</uni-td>
						<uni-td :colspan="4" align="center" class="color-white"></uni-td>
					</uni-tr>
				</uni-table>
				<view class="foot">
					<view style="flex: 1" class="color-blue" @click="confirmJudge">提交裁决</view>
					<view style="flex: 1" @click="close" class="color-red">关闭</view>
				</view>
			</view>
		</uni-popup>
		<judge-correct-table
			:data="commandControlData"
			ref="judgeCorrectTable"
			@selectData="selectData"
		></judge-correct-table>
	</view>
</template>
<script>
import BigNumber from 'bignumber.js';
// import { commandControlData } from '@/static/json/judge-command-control-table.js';
// import {
// 	canUseRange,
// 	visibleDetermineRange,
// 	visibleDistanceRange,
// 	discoveryStatusRange,
// 	taskStatusRange,
// 	ccEquipmentRange
// } from '@/static/json/judge-select-data.js';
import {confirmJudge} from '@/api/verdictRecord.js';
import {getJson} from '@/api/json.js';

export default {
	name: 'judge-command-control-table',
	data() {
		return {
			commandControlData: {},
			selectDataOptions: {},
			// canUseRange: canUseRange,
			// visibleDetermineRange: visibleDetermineRange,
			// visibleDistanceRange: visibleDistanceRange,
			// discoveryStatusRange: discoveryStatusRange,
			// taskStatusRange: taskStatusRange,
			// equipmentRange: ccEquipmentRange,
			info: {
				canUse: '',
				visibleDetermine: '',
				taskStatus: '',
				discoveryStatus: '',
				equipment: '',
				baseCcLevel: '',
				ccEffectProbability: '',
				trainingLevel: '',
				safetyProtectionLevel: '',
				random: ''
			}
		};
	},
	async mounted() {
    this.commandControlData = await getJson('/static/json/judge-command-control-table.json');

    this.selectDataOptions = await getJson('/static/json/judge-select-data.json');
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
	props: {
		actionInfo: {
			type: Object,
			default() {
				return {};
			}
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
				this.info.ccEffectProbability !== '' &&
				this.info.trainingLevel !== '' &&
				this.info.safetyProtectionLevel !== ''
			) {
				this.info.correctValue = Math.floor(
					BigNumber(this.info.ccEffectProbability)
						.times(this.info.trainingLevel)
						.times(this.info.safetyProtectionLevel)
						.toNumber()
				);
			}
			// this.info.ccEffectProbability * this.info.trainingLevel * this.info.safetyProtectionLevel
		},
		open() {
			this.$refs.popup.open();
		},
		close() {
			this.$refs.popup.close();
		},
		// 选择数据返回
		selectData(value, type) {
			switch (type) {
				case 'baseCcLevel':
					this.info.baseCcLevel = value;
					break;
				case 'ccEffectProbability':
					this.info.ccEffectProbability = value;
					break;
				case 'trainingLevel':
					this.info.trainingLevel = value;
					break;
				case 'safetyProtectionLevel':
					this.info.safetyProtectionLevel = value;
					break;
				default:
					break;
			}
		},
		confirmJudge() {
			this.actionInfo.actionInfoArray = JSON.stringify(this.info);
			this.actionInfo.attackResult = this.info.taskStatus;
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
