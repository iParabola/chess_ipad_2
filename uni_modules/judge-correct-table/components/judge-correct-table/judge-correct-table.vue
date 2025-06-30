<template>
	<uni-popup ref="correctPopup" :mask-click="false">
		<view class="rule__view">
			<uni-table border>
				<uni-tr v-for="(rowList, rIndex) in tableData" :key="rIndex">
					<uni-td
						:colspan="item.colspan"
						:rowspan="item.rowspan"
						:class="item.type"
						:align="item.type != 'remark' ? 'center' : 'left'"
						v-for="(item, index) in rowList"
						:key="index"
						:width="item.width"
						@click="selectData(item, index)"
					>
						{{ item.text }}
					</uni-td>
				</uni-tr>
			</uni-table>
			<view class="foot">
				<view style="flex: 1" @click="$refs.correctPopup.close()" class="color-red">关闭</view>
			</view>
		</view>
	</uni-popup>
</template>
<script>
export default {
	name: 'judge-correct-table',
	data() {
		return {
			// 字段类型
			type: '',
			tableData: []
		};
	},
	watch: {},
	props: {
		data: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	methods: {
		open(type) {
			this.type = type;
			switch (type) {
				// 指控
				case 'baseCcLevel':
					this.tableData = this.data.baseCcLevel;
					break;
				case 'ccEffectProbability':
					this.tableData = this.data.ccEffectProbability;
					break;
				case 'trainingLevel':
					this.tableData = this.data.trainingLevel;
					break;
				case 'safetyProtectionLevel':
					this.tableData = this.data.safetyProtectionLevel;
					break;
				// 干扰
				case 'unitStatus':
					this.tableData = this.data.unitStatus;
					break;
				case 'targetAction':
					this.tableData = this.data.targetAction;
					break;
				case 'range':
					this.tableData = this.data.range;
					break;
				case 'style':
					this.tableData = this.data.style;
					break;
				case 'weather':
					this.tableData = this.data.weather;
					break;
				case 'train':
					this.tableData = this.data.train;
					break;
				/**
				 * 干扰
				 * 机动
				 * 打击
				 * 地形修正
				 */
				case 'terrain':
					this.tableData = this.data.terrain;
					break;
				case 'distance':
					this.tableData = this.data.distance;
					break;
				case 'finalLevel':
					this.tableData = this.data.finalLevel;
					break;
				// 打击
				case 'hitRate':
					this.tableData = this.data.hitRate;
					break;
				case 'attackUnitStatus':
					this.tableData = this.data.unitStatus;
					break;
				case 'targetUnitStatus':
					this.tableData = this.data.unitStatus;
					break;
				case 'moveLevel':
					this.tableData = this.data.moveLevel;
					break;
				case 'damageEffect':
					this.tableData = this.data.damageEffect;
					break;
				// 侦察
				case 'investigateUnitStatus':
					this.tableData = this.data.unitStatus;
					break;
				case 'depthLevel':
					this.tableData = this.data.depthLevel;
					break;
				// 通信
				case 'baseLevel':
					this.tableData = this.data.baseLevel;
					break;
				case 'sourceTerrain':
					this.tableData = this.data.terrain;
					break;
				case 'targetTerrain':
					this.tableData = this.data.terrain;
					break;
				case 'sourceStatus':
					this.tableData = this.data.unitStatus;
					break;
				case 'targetStatus':
					this.tableData = this.data.unitStatus;
					break;
				case 'coverPoint':
					this.tableData = this.data.coverPoint;
					break;
				case 'interfereLevel':
					this.tableData = this.data.interfereLevel;
					break;
				case 'connectEffect':
					this.tableData = this.data.connectEffect;
					break;
				default:
					break;
			}
			this.$refs.correctPopup.open();
		},
		selectData(item, index) {
			if (item.dataFlag) {
				this.$emit('selectData', item.value, this.type);
				this.$refs.correctPopup.close();
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.rule__view {
	background-color: $uni-bg-color;

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
