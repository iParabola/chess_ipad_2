<template>
	<view>
		<uni-popup ref="popup" @maskClick="maskClick">
			<view class="rule__view">
				<view class="title">裁决结果表</view>
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td align="center">攻击单位</uni-td>
						<uni-td align="center">目标单位</uni-td>
						<uni-td align="center">裁决结果</uni-td>
					</uni-tr>
					<uni-tr class="row" v-for="(item, index) in data" :key="index">
						<uni-td align="center">{{ item.chessPiecesNumber }}</uni-td>
						<uni-td align="center">{{ item.targetChessPiecesNumber }}</uni-td>
						<uni-td class="col3" align="center">{{ item.attackResult }}</uni-td>
					</uni-tr>
					<!-- 
					<uni-tr class="row">
						<uni-td align="center" id="y_RPG-7_APC">RPG-7</uni-td>
						<uni-td align="center">APC</uni-td>
						<uni-td align="center">9</uni-td>
					</uni-tr> -->
				</uni-table>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'rule-result',
	props: {
		data: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {};
	},
	mounted() {},
	methods: {
		open() {
			this.$refs.popup.open();
			// this.sign();
		},
		close() {
			this.$refs.popup.close();
		},
		maskClick() {
			uni.$emit('maskClick');
		}
	}
};
</script>

<style lang="scss" scoped>
.rule__view {
	width: 40vw;
	// height: 80vh;
	background-color: $uni-bg-color;
	.title {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-weight: bolder;
		background-color: #ea9d00;
		font-size: $uni-font-size-title;
		color: $uni-text-color-inverse;
	}
	td {
		color: black;
	}

	.rowTitle {
		color: #ffffff;
		background-color: #1cade4;
	}
	.row:nth-child(odd) {
		background-color: #cce3f5;
	}
	.row:nth-child(even) {
		background-color: #e7f1fa;
	}

	.col3 {
		color: #f80039;
	}
}
.line {
	position: fixed;
	height: 2px;
	background-color: rgba(255, 0, 0, 0.2);
	animation: stretch-line 1s ease-in-out forwards;
	animation-delay: 1s;
}
@keyframes stretch-line {
	0% {
		width: 0;
	}
	100% {
		width: 75vw; /* 指定直线长度 */
	}
}
.v-line {
	position: fixed;
	width: 2px;
	background-color: rgba(255, 0, 0, 0.2);
	animation: stretch-v-line 1s ease-in-out forwards;
	visibility: hidden;
	animation-delay: 1s;
}
@keyframes stretch-v-line {
	0% {
		height: 0;
	}
	100% {
		height: 70vh; /* 指定直线长度 */
	}
}

.circle {
	position: fixed;
	width: 50px;
	height: 50px;
	border-radius: 100%;
	border: 1px red solid;
	visibility: hidden;
}
</style>
