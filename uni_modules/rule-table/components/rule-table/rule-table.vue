<template>
	<view>
		<uni-popup ref="popup" @maskClick="maskClick">
			<view class="rule__view">
				<view class="title">苏军反装甲火力登记表</view>
				<uni-table border>
					<uni-tr class="firstRow">
						<uni-td align="center" :id="'x_' + item" v-for="(item, index) in rowFirst" :key="index">
							{{ item }}
						</uni-td>
					</uni-tr>

					<uni-tr class="row" v-for="(item, index) in dataArray" :key="index">
						<uni-td align="center" :id="'y_' + item.selfWeaponName + '_' + item.targetWeaponName">
							{{ item.selfWeaponName }}
						</uni-td>
						<uni-td align="center">{{ item.targetWeaponName }}</uni-td>
						<uni-td align="center" v-for="(eitem, eindex) in item.attackScores.split(',')" :key="eindex">
							{{ eitem }}
						</uni-td>
					</uni-tr>
				</uni-table>
				<view id="line" class="line"></view>
				<view id="v-line" class="v-line"></view>
				<view id="circle_x" class="circle"></view>
				<view id="circle_y" class="circle"></view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'rule-table',
	data() {
		return {
			rowFirst: [
				'装备',
				'距离(cm)/目标',
				'≤2',
				'≤4',
				'≤6',
				'≤8',
				'≤10',
				'≤12',
				'≤14',
				'≤16',
				'≤18',
				'≤20',
				'≤30',
				'≤40',
				'≤60',
				'≤80',
				'≤100',
				'≤120'
			]
		};
	},
	props: {
		dataArray: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	mounted() {},
	methods: {
		open() {
			this.$refs.popup.open();
			this.sign();
		},
		close() {
			this.$refs.popup.close();
		},
		maskClick() {
			uni.$emit('maskClick');
		},
		sign() {
			this.$nextTick(() => {
				setTimeout(function () {
					const element = document.getElementById('x_≤8'); // 获取指定元素
					const rect = element.getBoundingClientRect(); // 获取元素的位置信息
					const x = rect.left; // 元素左边界相对于浏览器窗口的左边界的距离
					const y = rect.top; // 元素上边界相对于浏览器窗口的上边界的距离
					console.log(`坐标：(${x}, ${y})`);

					const element2 = document.getElementById('y_RPG-7_APC'); // 获取指定元素
					const rect2 = element2.getBoundingClientRect(); // 获取元素的位置信息
					const x2 = rect2.left; // 元素左边界相对于浏览器窗口的左边界的距离
					const y2 = rect2.top; // 元素上边界相对于浏览器窗口的上边界的距离
					console.log(`坐标：(${x2}, ${y2})`);

					const vline = document.getElementById('v-line'); // 获取指定元素
					vline.style.top = y + rect.height / 2 + 'px';
					vline.style.left = x + rect.width / 2 + 'px';
					vline.style.visibility = 'visible';

					const line = document.getElementById('line'); // 获取指定元素
					line.style.top = y2 + rect2.height / 2 + 'px';
					line.style.left = x2 + rect2.width / 2 + 'px';
					line.style.visibility = 'visible';

					const circle = document.getElementById('circle_x'); // 获取指定元素
					circle.style.left = x - (50 - rect.width) / 2 + 'px';
					circle.style.top = y - (50 - rect.height) / 2 + 'px';
					circle.style.visibility = 'visible';

					const circle2 = document.getElementById('circle_y'); // 获取指定元素
					circle2.style.left = x2 - (50 - rect2.width) / 2 + 'px';
					circle2.style.top = y2 - (50 - rect2.height) / 2 + 'px';
					circle2.style.visibility = 'visible';
				}, 500);
			});
		}
	}
};
</script>

<style lang="scss" scoped>
.rule__view {
	width: 80vw;
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
	.firstRow {
		background-color: #a8cf8d;
	}
	.row:nth-child(odd) {
		background-color: #90ade1;
	}
	.row:nth-child(even) {
		background-color: #ffffff;
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
