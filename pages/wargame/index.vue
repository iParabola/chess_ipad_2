<template>
	<view class="xinyi-content">
		<view class="rightBtn">
			<view class="btnView" @click="$refs.showActionDesc.open()">记录明细</view>
			<view class="btnView" @click="getRealTimeScore">实时得分</view>
			<view class="btnView" @click="getJudgeTable">指令录入</view>
			<view class="btnView" @click="getJudgeResult">裁决结果</view>
			<view v-if="isAdmin" class="btnView" @click="getTableScoreFinal">推演得分</view>
			<view class="btnView" @click="getFinalSummary">推演汇总</view>
		</view>
		<!-- <view class="rightTopBtn">
			<view class="btnView" @click="changeView">视角切换</view>
		</view> -->
		<view
			v-if="showChessButtonInfo.visible"
			:style="{ left: showChessButtonInfo.left + 'px', top: showChessButtonInfo.top + 'px' }"
			class="newcontextmenu"
			name="newcontextmenu"
		>
			<view class="score-btn-view">
				<uv-text
					v-if="checkCanAttack()"
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'攻击'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="attack()"
				></uv-text>
				<uv-text
					v-if="game.roundPeriod == 2"
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'移动'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="move()"
				></uv-text>
				<uv-text
					v-if="game.roundPeriod == 2"
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'隐藏'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="hide()"
				></uv-text>
			</view>
		</view>
		<uv-modal
			:showCancelButton="false"
			ref="showSettlement"
			@cancel="game.showSettlement = false"
			@confirm="game.showSettlement = false"
			title="结算"
		>
			<view v-if="game.settlement">
				<div>我方攻击分数:{{ game.settlement.selfAttackScore }}</div>
				<div>我方筛子分数:{{ game.settlement.selfDiceScore }}</div>
				<div>对方攻击分数:{{ game.settlement.targetAttackScore }}</div>
				<div>对方筛子分数:{{ game.settlement.targetDiceScore }}</div>
			</view>
		</uv-modal>
		<uv-modal @confirm="gameOver()" title="结果" ref="showResult">
			<view>
				<div v-if="game.result == 1 && isUser">获胜</div>
				<div v-if="game.result == 2 && isUser">失败</div>
				<div v-if="game.result == 0 && isUser">平局</div>
				<div v-if="!isUser">{{ game.resultStr }}</div>
			</view>
		</uv-modal>
		<uv-modal
			:showCancelButton="true"
			ref="attackConfirm"
			@cancel="attackConfirm = false"
			@confirm="attackPoint()"
			title="确认"
			content="是否攻击该位置"
			width="200rpx"
		></uv-modal>
		<uv-modal
			:showCancelButton="true"
			ref="moveConfirm"
			@cancel="moveConfirm = false"
			@confirm="movePoint()"
			title="确认"
			width="200rpx"
			content="是否移动到该位置"
		></uv-modal>
		<uv-modal :showCancelButton="false" :showConfirmButton="false" ref="showDown" width="200rpx" title="取消棋子">
			<view>
				<u-button @click="cancelPiece()">取消</u-button>
			</view>
		</uv-modal>

		<uv-modal :showCancelButton="false" :showConfirmButton="false" title="棋子选着" ref="showSelPiece">
			<view>
				<div style="display: flex; flex-wrap: wrap; justify-content: flex-start">
					<div
						v-if="!item.isAdd && item.chessPiecesCampId == campId"
						@click="selPiece(item)"
						v-for="(item, index) in game.userPiece"
						style="width: 77upx; height: 77upx"
						:key="index"
					>
						<uv-image
							style="margin-left: 11upx"
							:src="item.chessPiecesCover"
							width="55upx"
							height="55upx"
						></uv-image>
						<div style="text-align: center">{{ item.chessPiecesName }}</div>
					</div>
				</div>
			</view>
		</uv-modal>

		<view class="top__view">
			<xinyi-steps
				:options="stageOptions"
				:active="stageActive"
				arrowRight
				:canClick="true"
				:clickType="'stage'"
				:statusDesc="statusDesc"
				:isAdmin="isAdmin"
				:statusIndex="statusIndex"
			></xinyi-steps>
			<view class="dice-toolbar__veiw">
				<button
					class="stage-over__btn"
					type="primary"
					v-if="game.nowRound == 0 && game.isDeplaoy && isUser"
					@click="endDeployFunc()"
				>
					结束部署
				</button>
				<button
					class="stage-over__btn"
					type="primary"
					v-if="isUser && game.nowRound != 0 && userStageNotSubmit"
					@click="endRoundFunc()"
				>
					提交
				</button>
				<button class="stage-over__btn" type="primary" v-if="isAdmin && roundEnd" @click="judge()">裁决</button>
			</view>
			<view class="avatar-view">
				<uv-avatar :text="avatarText" fontSize="14" bg-color="#7f7f00" color="#ffffff"></uv-avatar>
			</view>
		</view>

		<view class="main__view" :style="cssVars">
			<view class="map__view">
				<vue-draggable-resizable class="map">
					<img class="bg" src="@/static/image/map.jpg" />
					<view class="bgCell">
						<view v-for="(item, index) in mapList" :key="index">
							<view style="display: flex; flex-wrap: nowrap">
								<view
									v-for="(h, idx) in item"
									class="block"
									@click="showOpView($event, h, index, idx)"
									:key="idx"
								>
									<view class="block_border">
										<view class="statusDesc" style="font-size: 4upx">{{ h.statusDesc }}</view>
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
		<!-- <uni-drawer ref="showFinalSummary" mode="right" :width="1200"></uni-drawer> -->
		<final-summary
			ref="finalSummary"
			:dataArray="summaryScoreData"
			:round="chartRound"
			:campData="campList"
		></final-summary>
		<view class="foot-view">
			<xinyi-steps
				:options="roundOptions"
				:active="roundActive"
				:canClick="true"
				:clickType="'round'"
				arrowRight
				:campData="campList"
				@setScore="scoreTableShow"
			></xinyi-steps>
		</view>
		<uni-popup ref="popup" :isMaskClick="false" maskBackgroundColor="rgba(0,0,0,0.2)">
			<view class="dice__veiw">
				<xinyi-dice v-for="(item, index) in diceCount" :key="index" :ref="`dice${index}`"></xinyi-dice>
			</view>
		</uni-popup>
		<!-- <ruleTable ref="popupRule"></ruleTable> -->
		<rule-table ref="popupRule" :dataArray="ruleArray" @maskClick="ruleTableMaskClick"></rule-table>
		<blow-effect-table
			ref="blowEffectTable"
			:dataArray="blowEffectList"
			@maskClick="blowEffectMaskClick"
		></blow-effect-table>
		<rule-result ref="ruleResult" :data="historyList"></rule-result>
		<score-table
			ref="scoreTable"
			:data="campListItem"
			:scoreList="scoreList"
			@submitScore="submitScore"
		></score-table>
		<score-table-final
			ref="scoreTableFinal"
			:scoreList="finalScoreList"
			:data="finalData"
			@submitScore="submitScoreFinal"
		></score-table-final>
		<judge-table ref="judgeTable" :showInfo="judgeTableShowInfo"></judge-table>
	</view>
</template>

<script>
import { sendMsg } from '@/api/websocket.js';
import { queryMapInfo } from '@/api/arbiterMap';
import VueDraggableResizable from 'vue-draggable-resizable-gorkys';
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css';
import {
	queryGameStatus,
	queryChessRound,
	queryPrompt,
	queryVerdictResult,
	queryActionEffect,
	isOwnRound,
	queryAllChessPiecesInfo,
	endDeploy,
	chessPiecesAction,
	deployChessPieces,
	endRound,
	chessPiecesActionNew,
	getRuleList,
	getBlowEffectList,
	chessPiecesActionContinue,
	submitScore,
	queryScoreList,
	getRealTimeScore,
	getSummaryScore,
	getRoundStatus,
	judge
} from '../../api/verdictRecord.js';
import { nextTick } from 'vue';
export default {
	components: {
		VueDraggableResizable
	},
	data() {
		return {
			diceCount: 2,
			diceCountList: [
				{ value: 1, text: '1' },
				{ value: 2, text: '2' }
			],
			game: {
				status: 0,
				chessRound: 1,
				nowRound: 0,
				baseRound: 0,
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
			isAdmin: false,
			historyList: [],
			ruleArray: [],
			blowEffectList: [],
			verdictRule: {},
			diceValue: [],
			showScoreButtonInfo: {
				visible: false,
				top: 0,
				left: 0
			},
			showChessButtonInfo: {
				visible: false,
				top: 0,
				left: 0
			},
			campList: [],
			campListItem: {},
			isUser: false,
			scoreTableHistory: [],
			scoreList: [],
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
			summaryDataArray: [],
			finalData: [],
			finalScoreList: [],
			summaryScoreData: [],
			chessRoundLimit: 0,
			chartRound: 0,
			selectIndex: [],
			selectTargetIndex: [],
			roundStatusList: [],
			statusDesc: '',
			roundEnd: false,
			userStageNotSubmit: false,
			avatarText: '',
			statusIndex: 0,
			judgeTableShowInfo: {}
		};
	},

	onLoad(res) {
		// 注册websocket监听;
		this.onMessage();
		setTimeout(() => {
			this.arrange();
		}, 5);
		this.user = uni.getStorageSync('user');
		this.verdictRecordId = res.verdictRecordId;
		this.campId = res.campId;
		this.isUser = res.isUser == 'true';
		this.queryAllFunc();
		this.queryMapInfoFunc();
		// this.initChessRound();
		setTimeout(() => {
			this.queryUsChessPiecesInfoFunc();
		}, 2121);
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
				'--chessMapPaddingTop': this.map.mapRadius / 4 + 'px',
				'--chessMapWidth': Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius + 'px',
				'--chessMapHeight': Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius + 'px',
				'--chessMapMarginLeft': (Math.cos(((2 * Math.PI) / 360) * 30) * this.map.mapRadius) / 2 + 'px'
			};
		}
	},
	methods: {
		// websocket 接收信息
		onMessage() {
			uni.$on('onMessage', (res) => {
				let jsonRes = JSON.parse(res.data);
				let action = jsonRes.action;
				switch (action) {
					case 'shakeDice':
						this.$refs.popupRule.close();
						let diceArr = jsonRes.data;
						this.shakeDice(diceArr);
						break;
					case 'lookUpTable':
						this.getRuleList();
						break;
					case 'colseTable':
						break;
					case 'takeAction':
						this.queryAllFunc();
						break;
					case 'endRound':
						//更新管理员看到的提交状态
						this.getRoundStatus();
						break;
					case 'judge':
						//裁决结果展示
						let judgeData = jsonRes.data;
						this.judgeShow(judgeData);
						break;
					case 'refresh':
						this.refresh();
						break;
					default:
						break;
				}
			});
		},
		getJudgeTable() {
			this.judgeTableShowInfo = {
				type: 'input',
				verdictRecordId: this.verdictRecordId,
				chessRound: this.roundActive,
				roundPeriod: this.stageActive + 1,
				roundPeriodName: this.stageOptions[this.stageActive].title,
				campId: this.campId
			};
			this.$refs.judgeTable.open();
		},

		getJudgeResult() {
			let index;
			console.log('this.stageActive: ', this.stageActive + 1);
			this.judgeTableShowInfo = {
				type: 'record',
				verdictRecordId: this.verdictRecordId,
				// chessRound: this.roundActive,
				// roundPeriod: this.stageActive + 1,
				campId: this.campId
			};
			this.$refs.judgeTable.open();
		},
		async judge() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				chessRound: this.roundActive,
				roundPeriod: this.stageActive + 1
			};
			let res = await judge(data);
			let resultData = res.data.data;
			console.log('resultData: ', resultData.length);
			if (resultData.length > 0) {
				sendMsg(
					JSON.stringify({
						action: 'judge',
						verdictRecordId: this.verdictRecordId,
						data: resultData
					})
				);
			} else {
				sendMsg(
					JSON.stringify({
						action: 'takeAction',
						verdictRecordId: this.verdictRecordId
					})
				);
			}
		},
		async testAsync() {
			let that = this;
			// this.$refs.popupRule.open();
			for (let i = 0; i < 5; i++) {}
		},
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
		async judgeShow(dataArray) {
			let that = this;
			for (let i = 0; i < dataArray.length; i++) {
				console.log('i: ', i);
				let data = {
					verdictType: 10
				};
				let ruleRes = await getRuleList(data);
				that.ruleArray = ruleRes.data.data;
				console.log('打开规则表');
				that.$refs.popupRule.open();
				await that.sleep(5000);
				console.log('关闭规则表' + i);
				that.$refs.popupRule.close();
				await that.sleep(2000);
				that.shakeDice(dataArray[i].dice);
				await that.sleep(5000);
				that.$refs.popup.close();
				await that.sleep(2000);
				let blowEffectRes = await getBlowEffectList(data);
				this.blowEffectList = blowEffectRes.data.data;
				console.log('打开结果表');
				this.$refs.blowEffectTable.open();
				await that.sleep(5000);
				console.log('关闭结果表' + i);
				that.$refs.blowEffectTable.close();
			}
			sendMsg(
				JSON.stringify({
					action: 'takeAction',
					verdictRecordId: this.verdictRecordId
				})
			);
		},
		getRuleListAsync() {
			return new Promise((resolve, reject) => {
				getRuleList({ verdictType: 10 }).then((res) => {
					resolve(res.data.data);
				});
			});
		},
		async getRuleList() {
			let data = {
				verdictType: 10
			};
			let ruleRes = await getRuleList(data);
			this.ruleArray = ruleRes.data.data;
			console.log('打开规则表');
			this.$refs.popupRule.open();
		},

		async getRoundStatus() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				chessRound: this.roundActive,
				roundPeriod: this.stageActive + 1
			};
			this.roundStatusList = [];
			let result = await getRoundStatus(data);
			this.roundStatusList = result.data.data;
			this.formatterStatusDesc(this.roundStatusList);
		},
		formatterStatusDesc(newVal) {
			if (this.isAdmin) {
				let n = 0;
				for (let i in newVal) {
					if (newVal[i].status == 1) {
						n++;
					}
				}
				if (n == 0) {
					this.statusDesc = '未提交';
					this.roundEnd = false;
				} else if (n == 1) {
					this.statusDesc = '一方已提交';
					this.roundEnd = false;
				} else {
					this.statusDesc = '已提交';
					this.roundEnd = true;
				}
			} else {
				let n = 0;
				for (let i in newVal) {
					if (newVal[i].campId == this.campId && newVal[i].status == 1) {
						n++;
					}
				}
				if (n == 0) {
					this.statusDesc = '未提交';
					this.userStageNotSubmit = true;
				} else if (n == 1) {
					this.statusDesc = '已提交';
					this.userStageNotSubmit = false;
				}
			}
			this.statusIndex = 1;
			console.log('this.statusDesc: ', this.statusDesc);
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
		async getFinalSummary() {
			let queryScoreData = {
				verdictRecordId: this.verdictRecordId
			};
			let res = await getSummaryScore(queryScoreData);
			this.chartRound = this.chessRoundLimit;
			console.log('res: ', res);
			this.summaryScoreData = res.data.data;
			this.$refs.finalSummary.open();
		},
		ruleTableMaskClick() {
			sendMsg(
				JSON.stringify({
					action: 'colseTable',
					verdictRecordId: this.verdictRecordId,
					data: 0
				})
			);
		},
		blowEffectMaskClick() {
			sendMsg(
				JSON.stringify({
					action: 'colseTable',
					verdictRecordId: this.verdictRecordId,
					data: 1
				})
			);
		},
		scoreBtnClose() {
			this.showScoreButtonInfo.visible = false;
		},
		async scoreTableShow(item, index) {
			item.chessRound = this.roundActive;
			this.campListItem = item;
			//查询历史打分结果
			let queryScoreData = {
				verdictRecordId: item.verdictRecordId,
				campId: item.campId,
				chessRound: index
			};
			let scoreListResult = await queryScoreList(queryScoreData);
			this.scoreList = scoreListResult.data.data;
			this.$refs.scoreTable.open();
			this.showScoreButtonInfo.visible = false;
		},
		async submitScore(scoreList) {
			for (let i in scoreList) {
				scoreList[i].campId = this.campListItem.campId;
				scoreList[i].campName = this.campListItem.campName;
				scoreList[i].userId = this.campListItem.userId;
				scoreList[i].userName = this.campListItem.userName;
				scoreList[i].verdictRecordId = this.campListItem.verdictRecordId;
				scoreList[i].chessRound = this.campListItem.chessRound;
			}
			let res = await submitScore(scoreList);
			if (res.data.code == 200) {
				uni.showToast({
					title: '提交成功',
					icon: 'none',
					duration: 1500
				});
				this.$refs.scoreTable.close();
				this.scoreList = [];
			} else {
				uni.showToast({
					title: '提交失败！',
					icon: 'error',
					duration: 1500
				});
			}
			console.log(res);
		},
		async getTableScoreFinal() {
			this.finalData = this.campList;
			//获取推演打分记录
			let queryScoreData = {
				verdictRecordId: this.verdictRecordId,
				typeString: '4,5'
			};
			let scoreListResult = await queryScoreList(queryScoreData);
			this.finalScoreList = scoreListResult.data.data;
			this.$refs.scoreTableFinal.open();
		},
		async submitScoreFinal(scoreList) {
			let res = await submitScore(scoreList);
			if (res.data.code == 200) {
				uni.showToast({
					title: '提交成功',
					icon: 'none',
					duration: 1500
				});
				this.$refs.scoreTableFinal.close();
			} else {
				uni.showToast({
					title: '提交失败！',
					icon: 'error',
					duration: 1500
				});
			}
			console.log(res);
		},

		async refresh() {
			await this.queryUsChessPiecesInfoFunc();
			await this.queryPromptFunc();
		},
		async getBlowEffectList() {
			let data = {
				verdictType: 10
			};
			let blowEffectRes = await getBlowEffectList(data);
			this.blowEffectList = blowEffectRes.data.data;
			console.log('打开结果表');
			this.$refs.blowEffectTable.open();
		},
		cjResult(index) {
			if (this.stageActive == 0 || this.stageActive == 3) {
				this.$refs.ruleResult.open();
			}
		},
		shakeDice(diceArr) {
			console.log('打开骰子');
			this.$refs.popup.open();
			this.$nextTick(() => {
				for (var i = 0; i < this.diceCount; i++) {
					this.$refs[`dice${i}`][0].throwDice(diceArr[i]);
				}
			});
		},
		async initChessRound() {
			let data = {
				id: this.verdictRecordId
			};
			let res = await queryGameStatus(data);
			this.chessRoundLimit = res.data.data.chessRoundLimit;
			this.initialRoundOptions(this.chessRoundLimit);
		},
		initialRoundOptions(round) {
			this.roundOptions = [{ title: '部署阶段' }];
			for (let i = 0; i <= round - 1; i++) {
				this.roundOptions.push({ title: '回   合   ' + Number(i + 1) });
			}
		},
		showOpView(e, val, index, idx) {
			this.showChessButtonInfo.visible = false;
			if (!this.isUser) {
				return;
			}

			if (this.game.nowRound == 0) {
				this.selCellInfo = val;
				if (val.chessPiecesNumber) {
					this.$refs.showDown.open();
				} else {
					this.$refs.showSelPiece.open();
				}
			} else {
				// if (this.game.isOwn) {
				if (
					val.chessPiecesNumber &&
					val.chessPiecesCampId == this.campId &&
					!val.isAction &&
					val.status == 10
				) {
					// this.$refs.showOp.open();
					this.chessClick(e);
					this.selCellInfo = val;
					this.selectIndex = [];
					this.selectIndex.push(index);
					this.selectIndex.push(idx);
				} else {
					if (this.isAttack && val.chessPiecesNumber && val.status != 20) {
						this.targetCellInfo = val;
						this.attackNumber = val.chessPiecesNumber;
						this.$refs.attackConfirm.open();
					}
					if (this.isMove) {
						this.targetCellInfo = val;
						this.$refs.moveConfirm.open();
					}
					this.selectTargetIndex = [];
					this.selectTargetIndex.push(index);
					this.selectTargetIndex.push(idx);
				}
				// }
			}
		},
		chessClick(e) {
			setTimeout(() => {
				let x = e.detail.x; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
				let y = e.detail.y; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
				this.showChessButtonInfo.top = y;
				this.showChessButtonInfo.left = x;
				this.showChessButtonInfo.visible = true;
			}, 100);
		},
		async queryMapInfoFunc() {
			let data = {
				id: this.verdictRecordId
			};
			queryMapInfo(data).then((res) => {
				this.map = res.data.data;
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
						item.style.marginLeft = 66.8 * 0.5 + 'px';
						// parseInt(this.width) * 0.5 + parseInt(this.marginLeftRight) * 0.5 + 0 + 'px';
					}
				}
				offsetTop = item.offsetTop;
			});
		},
		async queryAllFunc() {
			let data = {
				id: this.verdictRecordId
			};
			let rst = await queryVerdictResult(data);
			let resultData = rst.data.data;
			for (var key in resultData) {
				this.game[key] = resultData[key];
			}
			this.roundActive = this.game.chessRound;
			if (this.user.id == this.game.inviterUserId) {
				this.isAdmin = true;
			}
			//格式化campList
			this.formatterCampList();
			this.chessRoundLimit = resultData.chessRoundLimit;
			this.initialRoundOptions(this.chessRoundLimit);
			this.queryChessRoundFunc();
			this.getRoundStatus();
			if (this.game.status < 30) {
				this.game.nowRound = 0;
			} else {
				this.game.nowRound = this.game.chessRound;
			}
			if (this.game.status == 50) {
				let result = this.game.verdictResult;
				this.game.resultStr = '';
				if (result == 20) {
					this.game.result = 0;
					this.game.resultStr = '双方平局';
				} else if (result == 10) {
					if (this.game.firstCampId == this.campId) {
						this.game.result = 1;
					} else {
						this.game.result = 2;
					}
					this.game.resultStr = this.game.firstCampName + '击败了' + this.game.secondCampName;
				} else {
					if (this.game.firstCampId == this.campId) {
						this.game.result = 2;
					} else {
						this.game.result = 1;
					}
					this.game.resultStr = this.game.secondCampName + '击败了' + this.game.firstCampName;
				}
				if (this.isAdmin) {
					this.getTableScoreFinal();
					// this.$refs.scoreTableFinal.open();
				} else {
					this.$refs.showResult.open();
				}
				// this.$refs.showResult.open();
				// this.$refs.showSettlement.open();
			}

			if (this.game.baseRound != this.game.chessRound) {
				this.isAttack = false;
				this.isMove = false;
				let data = {
					chessRound: this.game.chessRound,
					userId: this.user.id,
					verdictRecordId: this.verdictRecordId
				};
				queryActionEffect(data).then((res) => {
					this.game.settlement = res.data.data;
					//this.game.showSettlement = true
					this.game.baseRound = this.game.chessRound;
				});
			}
			// if (this.game.status >= 30) {
			// 	this.isOwnRoundFunc();
			// }

			// if (!this.isUser | !this.game.isOwn) {
			this.queryUsChessPiecesInfoFunc();
			// }
		},
		queryChessRoundFunc() {
			if (this.game.roundPeriod == 1) {
				this.game.roundDesc = '直瞄射击阶段';
				this.stageActive = 0;
			}
			if (this.game.roundPeriod == 2) {
				this.game.roundDesc = '机动阶段';
				this.stageActive = 1;
			}
			if (this.game.roundPeriod == 3) {
				this.game.roundDesc = '压制标记的移除阶段';
				this.stageActive = 2;
			}
			if (this.game.roundPeriod == 4) {
				this.game.roundDesc = '间射击阶段';
				this.stageActive = 3;
			}
			this.queryPromptFunc();
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
			this.campList.push(dataSecond);
			if (this.isAdmin) {
				this.avatarText = '导演';
			} else if (this.user.id == this.game.firstUserId) {
				this.avatarText = this.game.firstCampName;
			} else if (this.user.id == this.game.secondUserId) {
				this.avatarText = this.game.secondCampName;
			}
			console.log('this.user.id: ', this.user.id);
			console.log('this.game.firstUserId: ', this.game.firstUserId);
			console.log('this.game.secondUserId: ', this.game.secondUserId);
		},
		async isOwnRoundFunc() {
			let data = {
				id: this.verdictRecordId,
				userId: this.user.id
			};
			let res = await isOwnRound(data);
			this.game.isOwn = res.data.data;
		},
		async queryUsChessPiecesInfoFunc() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				chessRound: this.game.chessRound,
				roundPeriod: this.stageActive + 1
			};
			let res = '';
			if (this.isUser) {
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
		},
		cancelPiece() {
			let number = this.selCellInfo.chessPiecesNumber;
			this.deployChessPiecesFunc(this.selCellInfo, false);
			this.selCellInfo.chessPiecesNumber = '';
			this.selCellInfo.chessPiecesName = '';
			this.selCellInfo.chessPiecesCover = '';
			this.showDown = false;
			for (let item of this.game.userPiece) {
				if (item.chessPiecesNumber == number) {
					item.isAdd = false;
				}
			}
		},

		endDeployFunc() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				userId: this.user.id
			};
			endDeploy(data).then((res) => {
				if (res.data.code == 200) {
					sendMsg(
						JSON.stringify({
							action: 'takeAction',
							verdictRecordId: this.verdictRecordId
						})
					);
				}
			});
			this.game.isDeplaoy = false;
		},
		attackPoint() {
			this.isAttack = false;
			this.isMove = false;
			this.$refs.moveConfirm.close();
			this.$refs.attackConfirm.close();
			this.chessPiecesActionFunc(this.selCellInfo, this.targetCellInfo, true);
		},
		movePoint() {
			this.isAttack = false;
			this.isMove = false;
			this.$refs.moveConfirm.close();
			this.$refs.attackConfirm.close();
			this.chessPiecesActionFunc(this.selCellInfo, this.targetCellInfo, false);
		},
		attack() {
			this.isAttack = true;
			this.isMove = false;
			this.showChessButtonInfo.visible = false;
		},
		move() {
			this.isAttack = false;
			this.isMove = true;
			this.showChessButtonInfo.visible = false;
		},
		hide() {
			this.isAttack = false;
			this.isMove = false;
			this.showChessButtonInfo.visible = false;
			this.chessPiecesActionFunc(this.selCellInfo, this.selCellInfo, false, true);
		},
		async chessPiecesActionFunc(source, target, isAttack, isHide) {

			let data = {
				actionMode: isAttack ? 20 : 10,
				campId: this.campId,
				chessPiecesNumber: source.chessPiecesNumber,
				selfCoordinate: source.coordinate,
				targetCoordinate: target.coordinate,
				userId: this.user.id,
				verdictRecordId: this.verdictRecordId,
				targetChessPiecesNumber: target.chessPiecesNumber,
				chessRound: this.roundActive,
				roundPeriod: this.stageActive + 1
			};
			isHide && (data.actionMode = 30);

			// if (data.actionMode == 20 && this.game.roundPeriod != 60 && this.game.roundPeriod != 70) {selectTargetIndex
			await chessPiecesActionNew(data);
			if (data.actionMode == 10) {
				this.queryUsChessPiecesInfoFunc();
				sendMsg(
					JSON.stringify({
						action: 'refresh',
						verdictRecordId: this.verdictRecordId
					})
				);
			}

			// let index = this.selectIndex[0];
			// let itemArray = this.mapList[index];
			// let item = itemArray[this.selectIndex[1]];
			// item.isAction = true;
			// this.$set(itemArray, this.selectIndex[1], item);
			// this.$set(this.mapList, index, itemArray);
			await this.queryPromptFunc();
		},

		async queryPromptFunc() {
			let data = {
				// chessRound: this.roundActive,
				id: this.verdictRecordId
				// roundPeriod: this.stageActive + 1
			};

			data.userId = this.user.id;
			let prompt = await queryPrompt(data);
			// let array = prompt.data.data.actionDescList;
			let array = [];
			this.historyList = prompt.data.data.verdictRecordHistoryList;
			for (let i in this.historyList) {
				array.push(this.historyList[i].actionDesc);
			}
			array.filter(function (s) {
				return s && s.trim();
			});
			// array.reverse();
			// for (let i in array) {
			// 	array[i] = array[i].replaceAll(
			// 		'裁决结果',
			// 		'<a style="color:blue" @click="cjResult(' + i + ')" >裁决结果</a>'
			// 	);
			// }
			this.game.actionDescList = array;
		},
		checkCanAttack() {
			//TODO   A表示什么
			// if (
			// 	//this.selCellInfo.chessPiecesTypeName == 'A' &&
			// 	this.game.roundPeriod == 60 ||
			// 	this.game.roundPeriod == 70
			// ) {
			// 	return true;
			// } else
			if (this.game.roundPeriod == 1 || this.game.roundPeriod == 4) {
				return true;
			} else {
				return false;
			}
		},
		gameOver() {
			// clearInterval(this.tmQuery);
			this.$refs.showResult.close();
			// if (this.isUser) {
			// 	uni.navigateTo({
			// 		url: '/pages/mode/select'
			// 	});
			// } else {
			// 	uni.navigateTo({
			// 		url: '/pages/mode/select'
			// 	});
			// }
		},
		selPiece(val) {
			this.selCellInfo.chessPiecesNumber = val.chessPiecesNumber;
			this.selCellInfo.chessPiecesName = val.chessPiecesName;
			this.selCellInfo.chessPiecesCover = val.chessPiecesCover;
			this.selCellInfo.statusDesc = '-';
			this.deployChessPiecesFunc(this.selCellInfo, true);
			val.isAdd = true;
			this.$refs.showSelPiece.close();
		},

		deployChessPiecesFunc(val, isAdd) {
			let data = {
				actionMode: 10,
				campId: this.campId,
				chessPiecesNumber: val.chessPiecesNumber,
				selfCoordinate: 'string',
				targetCoordinate: 'string',
				userId: this.user.id,
				verdictRecordId: this.verdictRecordId
			};
			if (isAdd) {
				data.selfCoordinate = '0000';
				data.targetCoordinate = val.coordinate;
			} else {
				data.selfCoordinate = val.coordinate;
				data.targetCoordinate = '0000';
			}
			deployChessPieces(data);
		},
		async endRoundFunc() {
			let data = {
				id: this.verdictRecordId,
				userId: this.user.id,
				chessRound: this.roundActive,
				roundPeriod: this.stageActive + 1
			};
			await endRound(data);
			sendMsg(
				JSON.stringify({
					action: 'endRound',
					verdictRecordId: this.verdictRecordId
				})
			);
		}
	}
};
</script>

<style lang="scss" scoped>
.top__view {
	display: flex;
	width: 96vw;
	height: 10vh;
	.dice-toolbar__veiw {
		display: flex;
		align-items: center;
		width: 80rpx;
		margin-left: 10rpx;
		button {
			margin-left: 10rpx;
		}
	}

	.avatar-view {
		display: flex;
		align-items: center;
		margin-left: 10rpx;
	}
}
.foot-view {
	display: flex;
	width: 96vw;
	height: 10vh;
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
	right: 0px;
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

.rightTopBtn {
	position: fixed;
	top: 10vh;
	right: 50px;
	z-index: 999;
	text-align: center;

	.btnView {
		background-color: #2979ff;
		color: #ffffff;
		text-align: center;
		margin-top: 2px;
		align-items: center;
		padding: 10px 5px 10px 5px;
	}
}
</style>
