<template>
	<view class="xinyi-content">
		<view class="rightBtn">
			<view class="btnView" @click="$refs.showActionDesc.open()">记录明细</view>
			<view class="btnView" @click="getRealTimeScore">实时得分</view>
			<!-- <view class="btnView" @click="getTableScoreFinal">推演得分</view> -->
			<view class="btnView" @click="getFinalSummary">推演汇总</view>
		</view>
		<uv-modal
			:showCancelButton="false"
			:show="game.showSettlement"
			@cancel="game.showSettlement = false"
			@confirm="game.showSettlement = false"
			title="结算"
		>
			<view>
				<div>我方攻击分数:{{ game.settlement.selfAttackScore }}</div>
				<div>我方筛子分数:{{ game.settlement.selfDiceScore }}</div>
				<div>对方攻击分数:{{ game.settlement.targetAttackScore }}</div>
				<div>对方筛子分数:{{ game.settlement.targetDiceScore }}</div>
			</view>
		</uv-modal>
		<uv-modal :show="game.showResult" @confirm="gameOver()" title="结果">
			<view>
				<div v-if="game.result == 1 && game.isUser">获胜</div>
				<div v-if="game.result == 2 && game.isUser">失败</div>
				<div v-if="game.result == 0 && game.isUser">平局</div>
				<div v-if="!game.isUser">{{ game.resultStr }}</div>
			</view>
		</uv-modal>

		<uv-modal :showCancelButton="false" :showConfirmButton="false" :show="showDown" title="取消棋子">
			<view>
				<u-button @click="cancelPiece()">取消</u-button>
			</view>
		</uv-modal>

		<view class="top__view">
			<xinyi-steps :options="stageOptions" :active="stageActive" arrowRight @change="stageChange"></xinyi-steps>
		</view>
		<button
			class="stage-over__btn"
			type="primary"
			v-if="game.nowRound == 1 && game.isDeplaoy && game.isUser"
			@click="endDeployFunc()"
		>
			结束部署
		</button>

		<view class="main__view" :style="cssVars">
			<view class="map__view">
				<vue-draggable-resizable class="map">
					<img class="bg" src="@/static/image/map.jpg" />
					<view class="bgCell">
						<view v-for="(item, index) in mapList" :key="index">
							<view style="display: flex; flex-wrap: nowrap">
								<view v-for="(h, idx) in item" class="block" @click="showOpView(h)" :key="idx">
									<view v-if="h.status != 20" class="block_border">
										<view style="font-size: 4upx">{{ h.statusDesc }}</view>
										<img class="chessImage" v-if="h.chessPiecesCover" :src="h.chessPiecesCover" />
										<view style="font-size: 4upx">
											{{ h.chessPiecesNumber }}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</vue-draggable-resizable>
			</view>
		</view>
		<uni-drawer ref="showActionDesc" mode="right" :width="400">
			<view class="scroll-view" style="padding-right: 30px">
				<scroll-view class="scroll-view-box" scroll-y="true" style="height: 80vh">
					<uni-card v-for="(item, index) in game.actionDescList" :key="index">
						<view @click="cjResult(index)" v-html="item"></view>
					</uni-card>
				</scroll-view>
			</view>
		</uni-drawer>
		<uni-drawer ref="showRealTimeScore" mode="right" :width="400">
			<view class="scroll-view" style="padding-right: 30px">
				<uni-table border>
					<uni-tr class="rowTitle">
						<uni-td align="center">{{ realTimeScore.firstCampName }}</uni-td>
						<uni-td align="center">阵营</uni-td>
						<uni-td align="center">{{ realTimeScore.secondCampName }}</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center">{{ realTimeScore.firstScoretype1 }}</uni-td>
						<uni-td align="center">指挥口令规范性</uni-td>
						<uni-td align="center">{{ realTimeScore.secondScoretype1 }}</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center">{{ realTimeScore.firstScoretype2 }}</uni-td>
						<uni-td align="center">指挥要素完备性</uni-td>
						<uni-td align="center">{{ realTimeScore.secondScoretype2 }}</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center">{{ realTimeScore.firstScoretype3 }}</uni-td>
						<uni-td align="center">打击效果</uni-td>
						<uni-td align="center">{{ realTimeScore.secondScoretype3 }}</uni-td>
					</uni-tr>
					<uni-tr class="rowTitle">
						<uni-td align="center">{{ realTimeScore.firstScoretypeTotal }}</uni-td>
						<uni-td align="center">总分</uni-td>
						<uni-td align="center">{{ realTimeScore.secondScoretypeTotal }}</uni-td>
					</uni-tr>
				</uni-table>
			</view>
		</uni-drawer>
		<xinyi-steps :options="roundOptions" :active="roundActive" @change="roundChange"></xinyi-steps>
		<uni-popup ref="popup">
			<view class="dice__veiw">
				<xinyi-dice ref="d"></xinyi-dice>
				<xinyi-dice ref="d2"></xinyi-dice>
			</view>
		</uni-popup>
		<rule-table ref="popupRule" :dataArray="ruleArray"></rule-table>
		<blow-effect-table ref="blowEffectTable" :dataArray="blowEffectList"></blow-effect-table>
		<rule-result ref="ruleResult" :data="historyList"></rule-result>
		<final-summary
			ref="finalSummary"
			:dataArray="summaryScoreData"
			:round="chartRound"
			:campData="campList"
		></final-summary>
	</view>
</template>

<script>
import { queryMapInfo } from '../../api/arbiterMap.js';
import {
	endDeploy,
	getBlowEffectList,
	getRuleList,
	queryAllChessPiecesInfo,
	queryChessRecordByRound,
	queryGameStatus,
	queryPrompt,
	getRealTimeScore,
	getSummaryScore
} from '../../api/verdictRecord.js';
import VueDraggableResizable from 'vue-draggable-resizable-gorkys';
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css';

export default {
	components: {
		VueDraggableResizable
	},
	data() {
		return {
			value: 1,
			range: [
				{ value: 0, text: '1' },
				{ value: 1, text: '2' },
				{ value: 2, text: '3' }
			],
			game: {
				status: 0,
				chessRound: 1,
				nowRound: 0,
				baseRound: 1,
				userPiece: '',
				isDeplaoy: true,
				isOwn: false,
				isUser: false,
				showSettlement: false,
				settlement: '',
				showResult: false,
				result: 0,
				resultStr: '',
				allRound: 0,
				roundPeriod: '',
				roundDesc: '',
				actionDescList: []
			},
			map: {},

			attackConfirm: false,
			attackNumber: '',
			moveConfirm: false,
			verdictRecordId: '',
			campId: '',
			mapLongTmp: 1,
			mapWidthTmp: 1,
			boxWith: 66,
			mapLong: 1,
			mapWidth: 1,
			showOp: false,
			showDown: false,
			showSelPiece: false,
			selCellInfo: '',
			targetCellInfo: '',
			tmQuery: '',
			isMove: false,
			isAttack: false,
			legendList: [
				{
					name: '1212'
				}
			],
			mapList: [],
			user: {},
			roundOptions: [],
			stageOptions: [
				{ title: '直瞄射击阶段' },
				{ title: '机动阶段' },
				{ title: '解除压制阶段' },
				{ title: '间瞄射击阶段' }
			],
			roundActive: 0,
			stageActive: 0,
			stageParam: '10,20',
			historyList: [],
			ruleArray: [],
			blowEffectList: [],
			realTimeScore: {
				firstCampName: '',
				firstScoretype1: 0,
				firstScoretype2: 0,
				firstScoretype3: 0,
				firstScoretypeTotal: 0,
				secondCampName: '',
				secondScoretype1: 0,
				secondScoretype2: 0,
				secondScoretype3: 0,
				secondScoretypeTotal: 0
			},
			campList: [],
			chartRound: 0,
			summaryScoreData: []
		};
	},

	onLoad(res) {
		this.user = uni.getStorageSync('user');
		setTimeout(() => {
			this.arrange();
		}, 5);
		this.verdictRecordId = res.id;
		this.campId = res.camp;
		this.game.isUser = res.isuser == 'true';
		this.queryMapInfoFunc();
		setTimeout(() => {
			this.init();
		}, 123);
	},
	computed: {
		cssVars() {
			return {
				'--mapTop': this.map.mapTop + 'px',
				'--mapLeft': this.map.mapLeft + 'px',
				'--mapWidth': this.map.mapWidth + 'px',
				'--mapHeight': this.map.mapHeight + 'px',
				'--marginTop': -this.map.mapRadius / 2 + 'px',
				'--cellWidth': Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius * 2 + 'px',
				'--cellHeight': this.map.mapRadius * 2 + 'px',
				'--chessMapPaddingTop': this.map.mapRadius / 2.5 + 'px',
				'--chessMapWidth': Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius + 'px',
				'--chessMapHeight': Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius + 'px',
				'--chessMapMarginLeft': (Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius) / 2 + 'px'
			};
		}
	},
	onReady() {},
	methods: {
		async init() {
			//复盘进入页面默认第一回合的第一阶段
			//获取该记录回合数
			let data = {
				id: this.verdictRecordId
			};
			let res = await queryGameStatus(data);
			let resultData = res.data.data;
			for (var key in resultData) {
				this.game[key] = resultData[key];
			}
			this.game.status = res.data.data.status;
			this.game.chessRound = res.data.data.chessRound;
			this.initialRoundOptions(this.game.chessRound);
			this.queryEachAction();
			this.formatterCampList();
			// this.getRuleList();
		},
		async getRuleList() {
			let data = {
				verdictType: 10
			};
			let ruleRes = await getRuleList(data);
			console.log('ruleRes: ', ruleRes);
			this.ruleArray = ruleRes.data.data;
			this.$refs.popupRule.open();
			let blowEffectRes = await getBlowEffectList(data);
			this.blowEffectList = blowEffectRes.data.data;
			// this.$refs.blowEffectTable.open();
		},

		async queryEachAction() {
			let data = {
				chessRound: this.roundActive + 1,
				id: this.verdictRecordId,
				type: 'record',
				stageParam: this.stageParam
			};
			// let res = await queryEachAction(data);
			// console.log('res1111: ', res);
			let prompt = await queryPrompt(data);
			console.log('prompt: ', prompt);
			let array = prompt.data.data.actionDescList;
			this.historyList = prompt.data.data.verdictRecordHistoryList;
			for (let i in this.historyList) {
				array.push(this.historyList[i].actionDesc);
			}
			array.filter(function (s) {
				return s && s.trim();
			});
			array.reverse();
			// for (let i in array) {
			// 	array[i] = array[i].replaceAll(
			// 		'裁决结果',
			// 		'<a style="color:blue" @click="cjResult(' + i + ')" >裁决结果</a>'
			// 	);
			// 	console.log('s: ', array[i]);
			// }
			this.game.actionDescList = array.reverse();
		},
		cjResult(index) {
			if (this.stageActive == 0 || this.stageActive == 3) {
				this.$refs.ruleResult.open();
			}
		},
		async queryChessRecordByRound() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				chessRound: this.roundActive + 1,
				stageParam: this.stageParam
			};

			let res = await queryChessRecordByRound(data);
			console.log('res.data.data: ', res.data.data);
			for (let itemk of this.mapList) {
				for (let h of itemk) {
					h.chessPiecesNumber = '';
					h.chessPiecesName = '';
					h.chessPiecesCover = '';
					h.chessPiecesCampId = '';
					h.statusDesc = '';
					h.status = 10;
				}
			}

			for (let item of res.data.data) {
				item.isAdd = false;
				item.canMove = true;
				item.isDie = false;
				for (let itemk of this.mapList)
					for (let h of itemk) {
						if (h.coordinate == item.targetCoordinate) {
							let jsonArray = JSON.parse(item.chessPiecesInfo);
							let sItem = {};
							for (let i in jsonArray) {
								if (jsonArray[i].chessPiecesNumber == item.chessPiecesNumber) {
									sItem = jsonArray[i];
								}
							}

							h.chessPiecesNumber = item.chessPiecesNumber;
							h.chessPiecesName = item.chessPiecesName;
							h.chessPiecesCover = item.chessPiecesCover;
							h.chessPiecesCampId = item.campId;
							h.chessPiecesTypeName = item.chessPiecesTypeName;
							h.statusDesc = sItem.statusDesc;
							h.isAction = item.isAction;
							h.status = item.status;
							item.isAdd = true;

							break;
						}
					}
			}
		},

		initialRoundOptions(round) {
			this.roundOptions = [];
			for (let i = 0; i <= round - 1; i++) {
				this.roundOptions.push({ title: '回合' + Number(i + 1) });
			}
		},
		stageChange(index) {
			console.log('index: ', index);
			if (this.stageActive != index) {
				this.stageActive = index;
				this.formateStageParam();
				this.queryEachAction();
				this.queryChessRecordByRound();
			}
		},
		roundChange(index) {
			console.log('index: ', index);
			if (this.roundActive != index) {
				this.roundActive = index;
				this.queryEachAction();
				this.queryChessRecordByRound();
			}
		},
		formateStageParam() {
			if (this.stageActive == 0) {
				this.stageParam = '10,20';
			} else if (this.stageActive == 1) {
				this.stageParam = '30,40';
			} else if (this.stageActive == 2) {
				this.stageParam = '50';
			} else if (this.stageActive == 3) {
				this.stageParam = '60,70';
			}
		},
		dice() {
			this.$refs.popup.open();
			this.$nextTick(() => {
				this.$refs.d.throwDice();
				this.$refs.d2.throwDice();
			});
		},
		showOpView(val) {
			console.log('val: ', val);
			if (!this.game.isUser) {
				return;
			}

			if (this.game.nowRound == 1) {
				this.selCellInfo = val;
				if (val.chessPiecesNumber) {
					this.showDown = true;
				} else {
					this.showSelPiece = true;
				}
			} else {
				if (this.game.isOwn) {
					if (
						val.chessPiecesNumber &&
						val.chessPiecesCampId == this.campId &&
						!val.isAction &&
						val.status == 10
					) {
						this.showOp = true;
						this.selCellInfo = val;
					} else {
						if (this.isAttack && val.chessPiecesNumber && val.status != 20) {
							this.targetCellInfo = val;
							this.attackNumber = val.chessPiecesNumber;
							this.attackConfirm = true;
						}
						if (this.isMove) {
							this.targetCellInfo = val;
							this.moveConfirm = true;
						}
					}
				}
			}
		},
		async queryMapInfoFunc() {
			let data = {
				id: this.verdictRecordId
			};
			queryMapInfo(data).then((res) => {
				this.map = res.data.data;
				console.log('this.map.maps: ', this.map);
				let RoundList = [
					{
						actionList: [
							{
								pieceList: [],
								tips: ''
							}
						],
						tips: ''
					}
				];
				this.gen();
			});
		},
		gen() {
			this.mapLong = this.map.longitudinalDimension;
			this.mapWidth = this.map.transverseDimension;

			this.mapList = [];
			for (let i = 0; i < this.mapLong; i++) {
				this.mapList.push([]);
				for (let j = 0; j < this.mapWidth; j++) {
					let data = {
						coordinate:
							(this.mapLong - i).toString().padStart(2, '0') + (j + 1).toString().padStart(2, '0'),
						chessPiecesNumber: '',
						chessPiecesName: '',
						chessPiecesCover: ''
					};
					this.mapList[i].push(data);
				}
			}
			setTimeout(() => {
				this.arrange();
				this.queryChessRecordByRound();
			}, 5);
		},
		arrange() {
			let offsetTop = 0;
			let lineIndex = 0;
			document.querySelectorAll('.block').forEach((item) => {
				item.style.marginLeft = '0px';
				if (offsetTop !== item.offsetTop) {
					++lineIndex;
					if (lineIndex % 2 === 0) {
						item.style.marginLeft = Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius + 'px';
						// parseInt(this.width) * 0.5 + parseInt(this.marginLeftRight) * 0.5 + 0 + 'px';
					}
				}
				offsetTop = item.offsetTop;
			});
		},

		async queryUsChessPiecesInfoFunc() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				chessRound: this.game.chessRound
			};
			let res = '';
			if (this.game.isUser) {
				data.campId = this.campId;
				res = await queryAllChessPiecesInfo(data);
			} else {
				res = await queryAllChessPiecesInfo(data);
			}

			for (let itemk of this.mapList)
				for (let h of itemk) {
					h.chessPiecesNumber = '';
					h.chessPiecesName = '';
					h.chessPiecesCover = '';
					h.chessPiecesCampId = '';
					h.statusDesc = '';
					h.status = 10;
				}
			this.game.userPiece = [];
			for (let item of res.data.data) {
				item.isAdd = false;
				item.canMove = true;
				item.isDie = false;
				this.game.userPiece.push(item);
				for (let itemk of this.mapList)
					for (let h of itemk) {
						if (h.coordinate == item.coordinate) {
							h.chessPiecesNumber = item.chessPiecesNumber;
							h.chessPiecesName = item.chessPiecesName;
							h.chessPiecesCover = item.chessPiecesCover;
							h.chessPiecesCampId = item.chessPiecesCampId;
							h.chessPiecesTypeName = item.chessPiecesTypeName;
							h.statusDesc = item.statusDesc;
							h.isAction = item.isAction;
							h.status = item.status;
							item.isAdd = true;
							break;
						}
					}
			}
			console.log('maplist===', this.mapList);
		},
		endDeployFunc() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				userId: this.user.id
			};
			endDeploy(data);
			this.game.isDeplaoy = false;
		},
		async getRealTimeScore() {
			let queryScoreData = {
				verdictRecordId: this.verdictRecordId
			};
			let scoreListResult = await getRealTimeScore(queryScoreData);
			let realTimeScoreList = scoreListResult.data.data;
			console.log('realTimeScoreList: ', realTimeScoreList);
			this.realTimeScore.firstScoretypeTotal = 0;
			this.realTimeScore.secondScoretypeTotal = 0;
			this.realTimeScore.firstCampName = this.campList[0].campName;
			this.realTimeScore.secondCampName = this.campList[1].campName;
			for (var i in realTimeScoreList) {
				if (this.campList[0].campId == realTimeScoreList[i].campId) {
					if (realTimeScoreList[i].type == 1) {
						this.realTimeScore.firstScoretype1 = realTimeScoreList[i].score;
					} else if (realTimeScoreList[i].type == 2) {
						this.realTimeScore.firstScoretype2 = realTimeScoreList[i].score;
					} else if (realTimeScoreList[i].type == 3) {
						this.realTimeScore.firstScoretype3 = realTimeScoreList[i].score;
					}
					this.realTimeScore.firstScoretypeTotal += realTimeScoreList[i].score;
				} else {
					if (realTimeScoreList[i].type == 1) {
						this.realTimeScore.secondScoretype1 = realTimeScoreList[i].score;
					} else if (realTimeScoreList[i].type == 2) {
						this.realTimeScore.secondScoretype2 = realTimeScoreList[i].score;
					} else if (realTimeScoreList[i].type == 3) {
						this.realTimeScore.secondScoretype3 = realTimeScoreList[i].score;
					}
					this.realTimeScore.secondScoretypeTotal += realTimeScoreList[i].score;
				}
			}
			this.$refs.showRealTimeScore.open();
		},
		formatterCampList() {
			this.campList = [];
			let dataFirst = {
				campId: this.game.firstCampId,
				campName: this.game.firstCampName,
				userId: this.game.firstUserId,
				userName: this.game.firstUserName,
				verdictRecordId: this.verdictRecordId
			};
			this.campList.push(dataFirst);
			let dataSecond = {
				campId: this.game.secondCampId,
				campName: this.game.secondCampName,
				userId: this.game.secondUserId,
				userName: this.game.secondUserName,
				verdictRecordId: this.verdictRecordId
			};
			console.log('dataSecond: ', dataSecond);
			this.campList.push(dataSecond);
		},
		async getFinalSummary() {
			let queryScoreData = {
				verdictRecordId: this.verdictRecordId
			};
			let res = await getSummaryScore(queryScoreData);
			this.chartRound = this.chessRoundLimit;
			console.log('res: ', res);
			this.summaryScoreData = res.data.data;
			this.$refs.finalSummary.open();
		}
	}
};
</script>

<style lang="scss">
.top__view {
	display: flex;
	width: 96vw;
	height: 10vh;
	.dice-toolbar__veiw {
		display: flex;
		align-items: center;
		width: 200rpx;
		margin-left: 10rpx;
		button {
			margin-left: 10rpx;
		}
	}
}
.foot-view {
	width: 96vw;
	height: 10vh;
	line-height: 10vh;
	align-items: center;
	// margin-top: 20px;
}
.stage-over__btn {
	width: 740rpx;
}

.main__view {
	height: 80vh;
	z-index: 990;
}

.dice__veiw {
	display: flex;
}
.map__view {
	background-color: #fff;
	width: 100vw;
	height: 80vh;
	// margin: 2vh 0 2vh 0;
	overflow: scroll;
	display: inline-block;
}

.bg {
	position: absolute;
	width: var(--mapWidth);
	height: var(--mapHeight);
	margin-top: var(--marginTop);
}

.bgCell {
	position: absolute;
	top: var(--mapTop);
	left: var(--mapLeft);
}

.map {
	position: relative;
}

.block {
	width: var(--cellWidth);
	height: var(--cellHeight);
	margin-right: 0px;
	margin-top: var(--marginTop);
	clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: rgba(85, 255, 255, 0);
	flex-shrink: 0;
	// border: #10292f solid 1px;
	// background-color: #fefefe;
	// opacity: 0.5;

	.block_border {
		position: relative;
		width: var(--cellWidth);
		height: var(--cellHeight);
		// line-height: var(--cellHeight);
		background: rgba(0, 0, 0, 0);
		clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
		display: table-cell;
		text-align: center;
		border: #10292f solid 1px;
		// padding-top: var(--chessMapPaddingTop);
	}

	.statusDesc {
		margin-top: var(--chessMapPaddingTop);
	}

	.chessImage {
		width: var(--chessMapWidth);
		height: var(--chessMapHeight);
		// margin-left: var(--chessMapMarginLeft);
	}
}

.newcontextmenu {
	position: absolute;
	width: 100px;
	border-radius: 10px;
	z-index: 1000;

	// .score-btn-view {
	// 	text-align: center;
	// 	background-color: #10292f;
	// 	width: 100%;
	// 	padding: 10px 10px 10px 10px;
	// 	cursor: pointer;
	// }

	// .score-btn-view:last-child {
	// 	border-top: #fff solid 1px;
	// 	border-bottom-left-radius: 10px;
	// 	border-bottom-right-radius: 10px;
	// }
}

.score-btn-view {
	text-align: center;
	background-color: #10292f;
	width: 100%;
	padding: 10px 10px 10px 10px;
	cursor: pointer;
}

.close-score-btn-view {
	position: relative;
}
.close-score-btn-view::after {
	content: 'x';
	position: absolute;
	top: -10px;
	right: -25px;
	width: 20px;
	height: 20px;
	border-radius: 50%;
	background-color: #10292f;
	color: white;
	text-align: center;
	line-height: 20px;
	cursor: pointer;
}

.rightBtn {
	position: fixed;
	top: 200px;
	right: 20px;
	z-index: 999;
	text-align: center;

	.btnView {
		writing-mode: vertical-rl;
		background-color: #2979ff;
		color: #ffffff;
		text-align: center;
		margin-top: 2px;
		align-items: center;
		padding: 10px 5px 10px 5px;
	}
}
</style>
