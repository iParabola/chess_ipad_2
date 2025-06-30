<template>
	<view>
		<uni-popup ref="popup" :mask-click="false">
			<view class="rule__view">
				<view class="title">裁决结果表</view>
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td align="center">内容</uni-td>
						<uni-td align="center">评分标准</uni-td>
						<uni-td align="center" v-for="(item, index) in data" :key="index">
							{{ item.campName }}得分
						</uni-td>
						<!-- <uni-td align="center">得分</uni-td> -->
					</uni-tr>

					<uni-tr class="row">
						<uni-td class="col1" align="center">{{ questions[0].content }}</uni-td>
						<uni-td align="center">
							<view>{{ questions[0].standard }}</view>
						</uni-td>
						<uni-td align="center" style="min-width: 80px">
							<input type="number" v-model="scoreInfo.scoreCampOneQuestionOne" placeholder="请输入分数" />
						</uni-td>
						<uni-td align="center" style="min-width: 80px">
							<input type="number" v-model="scoreInfo.scoreCampTwoQuestionOne" placeholder="请输入分数" />
						</uni-td>
					</uni-tr>
					<uni-tr class="row">
						<uni-td class="col1" align="center">{{ questions[1].content }}</uni-td>
						<uni-td align="center">
							<view>{{ questions[1].standard }}</view>
						</uni-td>
						<uni-td align="center" style="min-width: 80px">
							<input type="number" v-model="scoreInfo.scoreCampOneQuestionTwo" placeholder="请输入分数" />
						</uni-td>
						<uni-td align="center" style="min-width: 80px">
							<input type="number" v-model="scoreInfo.scoreCampTwoQuestionTwo" placeholder="请输入分数" />
						</uni-td>
					</uni-tr>
				</uni-table>
				<view class="foot">
					<view v-if="scoreList.length <= 0" style="flex: 1" @click="submitScore">提交打分</view>
					<view style="background-color: #ea9d00; flex: 1" @click="close">关闭</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
export default {
	name: 'score-table-final',
	props: {
		data: {
			type: Array,
			default() {
				return [];
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
				this.formatterData(newVal);
			}
		}
	},
	data() {
		return {
			questions: [
				{
					content: '指标一',
					standard: '指标一的打分标准',
					score: undefined,
					type: 4
				},
				{
					content: '指标二',
					standard: '指标二的打分标准',
					score: undefined,
					type: 5
				}
			],
			scoreInfo: {
				scoreCampOneQuestionOne: undefined,
				scoreCampOneQuestionTwo: undefined,
				scoreCampTwoQuestionOne: undefined,
				scoreCampTwoQuestionTwo: undefined
			}
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
		formatterData(newVal) {
			for (let i in newVal) {
				if (this.data[0].campId == newVal[i].campId) {
					if (newVal[i].type == 4) {
						this.scoreInfo.scoreCampOneQuestionOne = newVal[i].score;
					} else {
						this.scoreInfo.scoreCampOneQuestionTwo = newVal[i].score;
					}
				} else {
					if (newVal[i].type == 4) {
						this.scoreInfo.scoreCampTwoQuestionOne = newVal[i].score;
					} else {
						this.scoreInfo.scoreCampTwoQuestionTwo = newVal[i].score;
					}
				}
			}
		},
		submitScore() {
			for (let i in this.data) {
				if (
					this.scoreInfo.scoreCampOneQuestionOne == undefined ||
					this.scoreInfo.scoreCampOneQuestionTwo == undefined ||
					this.scoreInfo.scoreCampTwoQuestionOne == undefined ||
					this.scoreInfo.scoreCampTwoQuestionTwo == undefined
				) {
					return uni.showToast({
						title: '请补全分数在提交！',
						icon: 'none',
						duration: 1500
					});
				}
			}
			let tempQ = this.data[0].questions;
			this.questions[0].score = this.scoreInfo.scoreCampOneQuestionOne;
			this.questions[1].score = this.scoreInfo.scoreCampOneQuestionTwo;
			this.$set(this.data[0], 'questions', this.questions);
			this.questions[0].score = this.scoreInfo.scoreCampTwoQuestionOne;
			this.questions[1].score = this.scoreInfo.scoreCampTwoQuestionTwo;
			this.$set(this.data[1], 'questions', this.questions);
			let newArray = [];
			for (var i in this.data) {
				for (var j in this.questions) {
					let tempData = {};
					tempData.content = this.questions[j].content;
					tempData.standard = this.questions[j].standard;
					tempData.type = this.questions[j].type;
					tempData.verdictRecordId = this.data[i].verdictRecordId;
					tempData.userId = this.data[i].userId;
					tempData.campId = this.data[i].campId;
					tempData.userName = this.data[i].userName;
					tempData.campName = this.data[i].campName;
					if (i == 0 && j == 0) {
						tempData.score = this.scoreInfo.scoreCampOneQuestionOne;
					}
					if (i == 0 && j == 1) {
						tempData.score = this.scoreInfo.scoreCampOneQuestionTwo;
					}
					if (i == 1 && j == 0) {
						tempData.score = this.scoreInfo.scoreCampTwoQuestionOne;
					}
					if (i == 1 && j == 1) {
						tempData.score = this.scoreInfo.scoreCampTwoQuestionTwo;
					}
					newArray.push(tempData);
				}
			}
			this.$emit('submitScore', newArray);
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
