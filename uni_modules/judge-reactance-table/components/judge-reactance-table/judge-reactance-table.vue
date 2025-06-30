<template>
	<view>
		<uni-popup ref="popup" :mask-click="false">
			<view class="rule__view">
				<view class="title">通信干扰裁决表</view>
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td align="center" :colspan="3" class="color-light-pink">确定（指令及装备）</uni-td>
						<uni-td align="center" :colspan="3" class="color-light-yellow">判断（干扰条件）</uni-td>
						<uni-td align="center" :colspan="4" class="color-light-blue">修正（干扰等级）</uni-td>
						<uni-td align="center" :colspan="2" class="color-light-green">裁定（干扰结果）</uni-td>
						<uni-td align="center" width="80" class="color-orange" @click="getRandomInt(1, 100)">
							随机值
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" width="100" class="color-light-pink">指令</uni-td>
						<uni-td align="center" width="150" class="color-light-pink">装备</uni-td>
						<uni-td align="center" width="80" class="color-light-pink">装备默认干扰等级</uni-td>
						<uni-td align="center" :rowspan="3" class="color-light-yellow">通视判定</uni-td>
						<uni-td align="center" class="color-light-yellow">通视距离</uni-td>
						<uni-td align="center" width="100" class="color-white">
							<!-- <input type="digit" v-model="info.visibleDistance" /> -->
							<uni-easyinput
								type="digit"
								v-model="info.visibleDistance"
								:clearable="false"
							></uni-easyinput>
						</uni-td>
						<uni-td align="center" class="color-light-blue">单位状态修正</uni-td>
						<uni-td
							align="center"
							width="60"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('unitStatus')"
						>
							{{ info.unitStatus }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">目标行动修正</uni-td>
						<uni-td
							align="center"
							width="60"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('targetAction')"
						>
							{{ info.targetAction }}
						</uni-td>
						<uni-td align="center" width="70" :rowspan="2" class="color-light-green">修正后干扰等级</uni-td>
						<uni-td align="center" width="60" :rowspan="2" class="color-white">
							{{ info.finalValue }}
						</uni-td>
						<uni-td :rowspan="5" align="center" class="random" @click="getRandomInt(1, 100)">
							{{ info.random }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" width="100" :rowspan="4">
							{{ actionInfo.actionDesc }}
						</uni-td>
						<uni-td align="center" :rowspan="4" class="color-white">
							<uni-data-select
								placement="top"
								v-model="info.equipment"
								:localdata="selectDataOptions.equipmentRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" :rowspan="4">
							<!-- <input type="digit" v-model="info.baseValue" /> -->
							<uni-easyinput type="digit" v-model="info.baseValue" :clearable="false"></uni-easyinput>
						</uni-td>
						<uni-td align="center" class="color-light-yellow">辐射源距离</uni-td>
						<uni-td align="center" class="color-white">
							<!-- <input type="digit" v-model="info.radiationDistance" /> -->
							<uni-easyinput
								type="digit"
								v-model="info.radiationDistance"
								:clearable="false"
							></uni-easyinput>
						</uni-td>
						<uni-td align="center" class="color-light-blue">作用范围修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('range')">
							{{ info.range }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">抗干扰样式修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('style')">
							{{ info.style }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" class="color-light-yellow">是否通视</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								v-model="info.isVisible"
								:localdata="selectDataOptions.visibleDetermineRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">气象修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('weather')">
							{{ info.weather }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">训练水平修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('train')">
							{{ info.train }}
						</uni-td>
						<uni-td align="center" :rowspan="2" class="color-light-green">最终抗干扰等级</uni-td>
						<uni-td
							align="center"
							:rowspan="2"
							class="color-white"
							@click="$refs.judgeCorrectTable.open('finalLevel')"
						>
							{{ info.finalLevel }}
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" colspan="2" class="color-light-yellow">频段覆盖判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								v-model="info.coverage"
								:localdata="selectDataOptions.rangeRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">地物修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('terrain')">
							{{ info.terrain }}
						</uni-td>
						<uni-td align="center" class="color-light-blue">多机干扰修正</uni-td>
						<uni-td align="center" class="color-white">
							<!-- <input type="digit" v-model="info.multi" /> -->
							<uni-easyinput type="digit" v-model="info.multi" :clearable="false"></uni-easyinput>
						</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center" colspan="2" class="color-light-yellow">方向覆盖判定</uni-td>
						<uni-td align="center" class="color-white">
							<uni-data-select
								placement="top"
								v-model="info.direction"
								:localdata="selectDataOptions.rangeRange"
							></uni-data-select>
						</uni-td>
						<uni-td align="center" class="color-light-blue">干扰距离修正</uni-td>
						<uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('distance')">
							{{ info.distance }}
						</uni-td>
						<uni-td></uni-td>
						<uni-td></uni-td>
						<uni-td></uni-td>
						<uni-td></uni-td>
					</uni-tr>
				</uni-table>
				<view class="foot">
					<view style="flex: 1" class="color-blue" @click="confirmJudge">确认裁决</view>
					<view style="flex: 1" @click="close" class="color-red">关闭</view>
				</view>
			</view>
		</uni-popup>
		<judge-correct-table
			:data="reactanceData"
			ref="judgeCorrectTable"
			@selectData="selectData"
		></judge-correct-table>
	</view>
</template>
<script>
import BigNumber from 'bignumber.js';
// import { visibleDetermineRange, rangeRange, equipmentRange } from '@/static/json/judge-select-data.js';
// import { reactanceData } from '@/static/json/judge-reactance-table.js';
import {confirmJudge} from '@/api/verdictRecord.js';
import {getJson} from '@/api/json.js';

export default {
	name: 'judge-reactance-table',
	data() {
		return {
			reactanceData: {},
			selectDataOptions: {},
			// equipmentRange: equipmentRange,
			// visibleRange: visibleDetermineRange,
			// rangeRange: rangeRange,
			info: {
				equipment: '',
				baseValue: '',
				radiationDistance: '',
				visibleDistance: '',
				unitStatus: '',
				targetAction: '',
				finalValue: '',
				range: '',
				style: '',
				isVisible: '',
				weather: '',
				train: '',
				finalLevel: '',
				coverage: '',
				terrain: '',
				multi: '',
				direction: '',
				distance: '',
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
    this.reactanceData = await getJson('/static/json/judge-reactance-table.json');

    this.selectDataOptions = await getJson('/static/json/judge-select-data.json');
	},
	watch: {
		info: {
			handler(newVal) {
				console.log('获取新数据: ', newVal);
				this.calculate(newVal);
				// this.formatterDepth(newVal);
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
				this.info.multi !== '' &&
				this.info.unitStatus !== '' &&
				this.info.range !== '' &&
				this.info.weather !== '' &&
				this.info.terrain !== '' &&
				this.info.distance !== '' &&
				this.info.targetAction !== '' &&
				this.info.style !== '' &&
				this.info.train !== ''
			) {
				this.info.finalValue = BigNumber(this.info.baseValue)
					.plus(this.info.multi)
					.plus(this.info.unitStatus)
					.plus(this.info.range)
					.plus(this.info.weather)
					.plus(this.info.terrain)
					.plus(this.info.distance)
					.plus(this.info.targetAction)
					.plus(this.info.style)
					.plus(this.info.train)
					.toNumber();
			}

			// Number(this.info.baseValue) +
			// Number(this.info.multi) +
			// this.info.unitStatus +
			// this.info.range +
			// this.info.weather +
			// this.info.terrain +
			// this.info.distance +
			// this.info.targetAction +
			// this.info.style +
			// this.info.train;
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
				case 'unitStatus':
					this.info.unitStatus = value;
					break;
				case 'targetAction':
					this.info.targetAction = value;
					break;
				case 'range':
					this.info.range = value;
					break;
				case 'style':
					this.info.style = value;
					break;
				case 'weather':
					this.info.weather = value;
					break;
				case 'train':
					this.info.train = value;
					break;
				case 'terrain':
					this.info.terrain = value;
					break;
				case 'distance':
					this.info.distance = value;
					break;
				case 'finalLevel':
					this.info.finalLevel = value;
					break;
				default:
					break;
			}
		},
		confirmJudge() {
			this.actionInfo.actionInfoArray = JSON.stringify(this.info);
			this.actionInfo.attackResult = this.info.finalLevel;
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
