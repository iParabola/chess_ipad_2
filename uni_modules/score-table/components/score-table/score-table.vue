<template>
	<view>
		<uni-popup ref="popup" :mask-click="false">
			<view class="rule__view">
				<view class="title">回合打分</view>
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td align="center">内容</uni-td>
						<uni-td align="center">评分标准</uni-td>
						<uni-td align="center">得分</uni-td>
					</uni-tr>

					<uni-tr class="row" v-for="(item, index) in questions" :key="index">
						<uni-td class="col1" align="center">{{ item.content }}</uni-td>
						<uni-td align="center">
							<scroll-view style="max-height: 200px" scroll-y>
								<view v-html="item.standard"></view>
							</scroll-view>
						</uni-td>
						<uni-td align="center" style="min-width: 80px">
							<input
								type="number"
								v-model="item.score"
								:disabled="item.type == 3"
								placeholder="请输入分数"
							/>
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="foot">
					<view v-if="scoreList.length <= 1" style="flex: 1" @click="submitScore">提交打分</view>
					<view style="background-color: #ea9d00; flex: 1" @click="close">关闭</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'score-table',
	props: {
		data: {
			type: Object,
			default() {
				return {};
			}
		},
		scoreList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	watch: {
		scoreList: {
			handler(newVal) {
				console.log('newVal: ', newVal);
				this.questions = [
					{
						content: '指挥口令规范性（100分）',
						standard: '严格按照军语和条令条例用语表达',
						score: undefined,
						type: 1
					},
					{
						content: '指挥要素完备性（100分）',
						standard: '包含时间地点人员动作',
						score: undefined,
						type: 2
					},
					// {
					// 	content: '打击效果',
					// 	standard: '',
					// 	score: 0,
					// 	type: 3
					// }
				];
				if (newVal.length == 1) {
					if (newVal[0].type == 1) {
             this.questions[0] = newVal[0];
          }
          else {
             this.questions[1] = newVal[0];
          }
				}
				if (newVal.length == 2) {
					//替换非打击效果
					this.questions[0] = newVal[0];
					this.questions[1] = newVal[1];
				}
				if (newVal.length == 3) {
					this.questions = newVal;
				}
			}
		}
	},
	data() {
		return {
			questions: [
				{
					content: '指挥口令规范性（100分）',
					standard: '严格按照军语和条令条例用语表达',
					score: undefined,
					type: 1
				},
				{
					content: '指挥要素完备性（100分）',
					standard: '包含时间地点人员动作',
					score: undefined,
					type: 2
				},
				// {
				// 	content: '打击效果',
				// 	standard: '',
				// 	score: 0,
				// 	type: 3
				// }
			]
		};
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
		submitScore() {
			for (let i in this.questions) {
				if (!this.questions[i].score && i != 2) {
					return uni.showToast({
						title: '请补全分数在提交！',
						icon: 'none',
						duration: 1500
					});
				}
			}
			this.$emit('submitScore', this.questions.slice(0, this.questions.length - 1));
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

	.col1 {
		color: #ffffff;
		background-color: #1cade4;
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