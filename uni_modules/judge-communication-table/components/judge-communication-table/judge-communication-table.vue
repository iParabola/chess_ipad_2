<template>
	<view>
		<uni-popup ref="popup" :mask-click="false">
			<view class="rule__view">
				<view class="title">通信效果裁决表</view>
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td align="center" class="color-light-pink" :colspan="2">确定（指令及装备）</uni-td>
						<uni-td align="center" class="color-light-yellow" :colspan="3">判断（通信条件）</uni-td>
						<uni-td align="center" class="color-light-blue" :colspan="4">修正（通信等级）</uni-td>
						<uni-td align="center" class="color-light-green" :colspan="2">裁定（通联结果）</uni-td>
						<uni-td align="center" width="80" class="color-orange" @click="getRandomInt(2, 12)">
							随机值
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" class="color-light-pink" width="100">指令</uni-td>
						<uni-td align="center" class="color-light-pink" width="180">装备</uni-td>
						<uni-td :rowspan="2" align="center" class="color-light-yellow">通视判定</uni-td>
						<uni-td align="center" class="color-light-yellow">通视距离</uni-td>
						<uni-td align="center" class="color-white" width="100">
							<uni-data-select
								v-model="info.visibleDistance"
								:localdata="selectDataOptions.visibleDistanceRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">基础通信等级判定</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('baseLevel')">
							{{ info.baseLevel }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">状态修正（本算子）</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('sourceStatus')"
						>
							{{ info.sourceStatus }}
						</uni-td>
						<uni-td :rowspan="2" align="center" class="color-light-green">最终通信等级裁决</uni-td>
						<uni-td :rowspan="2" align="center" class="color-white">{{ info.finalLevel }}</uni-td>
						<uni-td :rowspan="4" align="center" class="random" @click="getRandomInt(2, 12)">
							{{ info.random }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td :rowspan="3" align="center" class="color-white">
							{{ actionInfo.actionDesc }}
						</uni-td>
						<uni-td :rowspan="3" align="center" class="color-white">
							<uni-data-select
								placement="top"
								v-model="info.equipment"
								:localdata="selectDataOptions.communicationEquipmenRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-yellow">通视判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								v-model="info.visibleDetermine"
								:localdata="selectDataOptions.visibleDetermineRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">地形修正（本算子）</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('sourceTerrain')"
						>
							{{ info.sourceTerrain }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">状态修正（目标算子）</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('targetStatus')"
						>
							{{ info.targetStatus }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td :colspan="2" align="center" class="color-light-yellow">发现判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								v-model="info.discoveryStatus"
								:localdata="selectDataOptions.discoveryStatusRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">地形修正（目标算子）</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('targetTerrain')"
						>
							{{ info.targetTerrain }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">遮蔽点修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('coverPoint')">
							{{ info.coverPoint }}
						</uni-td>
						<uni-td :rowspan="2" align="center" class="color-light-green">通联效果</uni-td>
						<uni-td
							:rowspan="2"
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('connectEffect')"
						>
							{{ info.connectEffect }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td :colspan="2" align="center" class="color-light-yellow">装备判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								v-model="info.canUse"
								:localdata="selectDataOptions.canUseRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">干扰等级修正</uni-td>
						<uni-td
							align="center"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('interfereLevel')"
						>
							{{ info.interfereLevel }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">随机数修正</uni-td>
						<uni-td align="center" class="color-white">
							{{ info.randomLevel }}
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="foot">
					<view style="flex: 1" class="color-blue" @click="confirmJudge">确认裁决</view>
					<view style="flex: 1" @click="close" class="color-red">关闭</view>
				</view>
			</view>
		</uni-popup>
		<judge-correct-table
			:data="communicationData"
			ref="judgeCorrectTable"
			@selectData="selectData"
		></judge-correct-table>
	</view>
</template>
<script>
import BigNumber from 'bignumber.js';
// import { communicationData } from '@/static/json/judge-communication-table.js';
// import {
// 	investigateEquipmentRange,
// 	visibleDistanceRange,
// 	visibleDetermineRange,
// 	discoveryStatusRange,
// 	canUseRange,
// 	communicationEquipmenRange
// } from '@/static/json/judge-select-data.js';
import {confirmJudge} from '@/api/verdictRecord.js';
import {getJson} from '@/api/json.js';

export default {
	name: 'judge-communication-table',
	data() {
		return {
			communicationData: {},
			selectDataOptions: {},
			// canUseRange: canUseRange,
			// visibleDetermineRange: visibleDetermineRange,
			// visibleDistanceRange: visibleDistanceRange,
			// discoveryStatusRange: discoveryStatusRange,
			// equipmenRange: communicationEquipmenRange,
			info: {
				equipment: '',
				baseLevel: '',
				visibleDistance: '',
				visibleDetermine: '',
				discoveryStatus: '',
				canUse: '',
				sourceTerrain: '',
				targetTerrain: '',
				interfereLevel: '',
				sourceStatus: '',
				targetStatus: '',
				coverPoint: '',
				finalLevel: '',
				connectEffect: '',
				randomLevel: '',
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
    this.communicationData = await getJson('/static/json/judge-communication-table.json');
    this.selectDataOptions = await getJson('/static/json/judge-select-data.json');
	},
	watch: {
		info: {
			handler(newVal) {
				this.calculateInfo(newVal);
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
		calculateInfo(newVal) {
			if (
				this.info.sourceTerrain !== '' &&
				this.info.targetTerrain !== '' &&
				this.info.interfereLevel !== '' &&
				this.info.targetStatus !== ''
			) {
				this.info.randomLevel = BigNumber(this.info.sourceTerrain)
					.plus(this.info.targetTerrain)
					.plus(this.info.interfereLevel)
					.plus(this.info.targetStatus)
					.toNumber();
				// this.info.randomLevel =
				// 	this.info.sourceTerrain + this.info.targetTerrain + this.info.interfereLevel + this.info.targetStatus;
			}
			if (this.info.coverPoint !== '' && this.info.baseLevel !== '') {
				this.info.finalLevel = BigNumber(this.info.coverPoint).plus(this.info.baseLevel).toNumber();
				// this.info.finalLevel = this.info.coverPoint + this.info.baseLevel;
			}
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
				case 'baseLevel':
					this.info.baseLevel = value;
					break;
				case 'sourceTerrain':
					this.info.sourceTerrain = value;
					break;
				case 'targetTerrain':
					this.info.targetTerrain = value;
					break;
				case 'sourceStatus':
					this.info.sourceStatus = value;
					break;
				case 'targetStatus':
					this.info.targetStatus = value;
					break;
				case 'coverPoint':
					this.info.coverPoint = value;
					break;
				case 'interfereLevel':
					this.info.interfereLevel = value;
					break;
				case 'connectEffect':
					this.info.connectEffect = value;
					break;
				default:
					break;
			}
		},
		confirmJudge() {
			this.actionInfo.actionInfoArray = JSON.stringify(this.info);
			this.actionInfo.attackResult = this.info.connectEffect;
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
	text-align: center;

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
