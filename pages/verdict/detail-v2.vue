<template>
	<view class="xinyi-content">
    <view class="rightBtn">
      <!--			<view class="btnView" @click="showActionDescFunc">记录明细</view>-->
      <!--			<view class="btnView" @click="getRealTimeScore">实时得分</view>-->
<!--      <view v-if="userType !== 'admin'" class="btnView" @click="getJudgeTable">指令录入</view>-->
      <view class="btnView" @click="getJudgeResult">裁决结果</view>
      <view class="btnView" @click="getScore">最后得分</view>
      <!--			<view v-if="userType === 'admin'" class="btnView" @click="getTableScoreFinal">推演得分</view>-->
      			<view class="btnView" @click="getFinalSummary">推演汇总</view>
    </view>

		<view class="middleBtn">
			<view class="btnView" v-if="isMove" @click="moveStop">移动结束</view>
			<view class="btnView" v-if="nextStageFlag" @click="nextStage">下一回合</view>
		</view>
    <view class="top">
      <view class="top-head">
        <image src="/static/image/wargame/火力.svg" style="width: 15%; height: 7vh;"></image>
        <view style="height: 7vh; line-height: 7vh; font-size: 25px; color: #4cf5e3;">火力战</view>
        <view style="height: 7vh; line-height: 8vh; font-size: 18px; color: white; margin-left: 10px">手工兵棋裁决——火力战系统</view>
      </view>
      <view class="top-middle">
        <div class="react-left ml-3">
          <span class="text">历史复盘</span>
        </div>
      </view>
      <view class="top-tail">
        <div class="react-right">
          <span class="react-after"></span>
          <span style="width: 40%; margin-left: 10%" class="text">
            <view class="top-tail-action" hover-class="hover-top-tail-action">
              房间号：{{gameScore.inviteCode}}
            </view>
          </span>
          <span>
          </span>
          <span style="width: 50%;" class="text">导演 : {{user.userName}}</span>
        </div>
      </view>
    </view>
<!--		<view class="top__view">-->
<!--			<xinyi-steps-->
<!--				:options="stageOptions"-->
<!--				:active="stageActive"-->
<!--				arrowRight-->
<!--				:canClick="true"-->
<!--				:statusDesc="statusDesc"-->
<!--				@change="stageChange"-->
<!--				:isAdmin="userType === 'admin'"-->
<!--				:statusIndex="statusIndex"-->
<!--			></xinyi-steps>-->
<!--			<view class="dice-toolbar__veiw">-->
<!--				<button-->
<!--					class="stage-over__btn"-->
<!--					type="primary"-->
<!--					v-if="game.nowRound === 0 && game.isDeplaoy && userType === 'user'"-->
<!--					@click="endDeployFunc()"-->
<!--				>-->
<!--					结束部署-->
<!--				</button>-->
<!--				<button-->
<!--					class="stage-over__btn"-->
<!--					type="primary"-->
<!--					v-if="userType === 'user' && game.nowRound !== 0 && userStageNotSubmit"-->
<!--					@click="endRoundFunc()"-->
<!--				>-->
<!--					提交-->
<!--				</button>-->
<!--				<button class="stage-over__btn" type="primary" v-if="userType === 'judge' && roundEnd" @click="judge()">-->
<!--					裁决-->
<!--				</button>-->
<!--			</view>-->
<!--&lt;!&ndash;			<view class="avatar-view">&ndash;&gt;-->
<!--&lt;!&ndash;				<uv-avatar :text="avatarText" size="60" fontSize="20" bg-color="#7f7f00" color="#ffffff"></uv-avatar>&ndash;&gt;-->
<!--&lt;!&ndash;				<view>{{ avatarDesc }}</view>&ndash;&gt;-->
<!--&lt;!&ndash;			</view>&ndash;&gt;-->
<!--		</view>-->

    <NjustFinishScore ref="njustScore" :user-type="userType" :game="gameScore" :verdict-record-id="verdictRecordId"></NjustFinishScore>


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
			ref="scoutConfirm"
			@cancel="scoutConfirm = false"
			@confirm="scoutPoint()"
			title="确认"
			content="是否侦察该位置"
			width="200rpx"
		></uv-modal>
		<uv-modal
			:showCancelButton="true"
			ref="reactanceConfirm"
			@cancel="reactanceConfirm = false"
			@confirm="reactancePoint()"
			title="确认"
			content="是否干扰该位置"
			width="200rpx"
		></uv-modal>

		<uv-modal
			:showCancelButton="true"
			ref="communicationConfirm"
			@cancel="communicationConfirm = false"
			@confirm="communicationPoint()"
			title="确认"
			content="是否与此点位进行通信？"
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
    <view class="foot-view1">
      <xinyi-steps
          :options="stageOptions"
          :active="stageActive"
          arrowRight
          :canClick="true"
          :statusDesc="statusDesc"
          @change="stageChange"
          :isAdmin="userType === 'admin'"
          :statusIndex="statusIndex"
      ></xinyi-steps>
    </view>
		<view class="foot-view2">
			<xinyi-steps
				:options="roundOptions"
				:active="roundActive"
				:canClick="true"
				:clickType="'record'"
				arrowRight
				:campData="campList"
				@setScore="scoreTableShow"
				@change="roundChange"
			></xinyi-steps>
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
		<score-table
			ref="scoreTable"
			:data="campListItem"
			:scoreList="scoreList"
			@submitScore="submitScore"
		></score-table>
		<judge-table
			ref="judgeTable"
			:showInfo="judgeTableShowInfo"
			:stageOptions="stageOptions"
			@judgeComplete="judgeComplete"
		></judge-table>
		<score-table-final
			ref="scoreTableFinal"
			:scoreList="finalScoreList"
			:data="finalData"
			@submitScore="submitScoreFinal"
		></score-table-final>
		<final-summary
			ref="finalSummary"
			:dataArray="summaryScoreData"
			:round="chartRound"
			:campData="campList"
		></final-summary>
		<uv-modal :showCancelButton="false" :showConfirmButton="false" title="棋子选着" ref="showSelPiece">
			<view>
				<div style="display: flex; flex-wrap: wrap; justify-content: flex-start">
					<div
						v-if="!item.isAdd && item.chessPiecesCampId === campId"
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
		<view
			v-if="showChessButtonInfo.visible"
			:style="{ left: showChessButtonInfo.left + 'px', top: showChessButtonInfo.top + 'px', zIndex: 1001 }"
			class="newcontextmenu"
			name="newcontextmenu"
		>
			<view class="score-btn-view">
				<!-- <uv-text
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'攻击'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="attack()"
				></uv-text> -->
				<uv-text
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'机动'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="move()"
				></uv-text>
				<uv-text
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'侦察'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="scout()"
				></uv-text>
				<uv-text
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'通信'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="communication()"
				></uv-text>
				<uv-text
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'打击'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="attack()"
				></uv-text>
				<uv-text
					prefixIcon="empty-history"
					iconStyle="font-size: 19px"
					:text="'干扰'"
					color="#ffffff"
					:size="18"
					:iconStyle="{ color: '#ffffff', size: 18 }"
					@click="reactance()"
				></uv-text>
			</view>
		</view>
		<view
			v-if="showChessListInfo.visible"
			:style="{ left: showChessListInfo.left + 'px', top: showChessListInfo.top + 'px', width: '200px' }"
			class="newcontextmenu"
			name="newcontextmenu"
		>
			<view class="score-btn-view">
				<view
					class="chess-view"
					v-for="(item, index) in pointChessList"
					:key="index"
					@click="showChessAction($event, item)"
				>
					{{ item.chessPiecesName + '-' + item.chessPiecesNumber }}
				</view>
			</view>
		</view>
		<rule-table ref="popupRule" :dataArray="ruleArray"></rule-table>
		<uni-popup ref="popup" :isMaskClick="false" maskBackgroundColor="rgba(0,0,0,0.2)">
			<view class="dice__veiw">
				<xinyi-dice v-for="(item, index) in diceCount" :key="index" :ref="`dice${index}`"></xinyi-dice>
			</view>
		</uni-popup>
		<blow-effect-table
			ref="blowEffectTable"
			:dataArray="blowEffectList"
			@maskClick="blowEffectMaskClick"
		></blow-effect-table>
		<view id="map"></view>
	</view>
</template>


<script>
import NjustFinishScore from "@/uni_modules/njust-finish-score/njust-finish-score.vue";

let vector;
import 'ol/ol.css';
import 'ol-ext/dist/ol-ext.css';
import 'ol-games/dist/ol-games.css';
import { Map, View, Collection } from 'ol';
import Draw from 'ol/interaction/Draw.js';
import HexGrid from 'ol-ext/render/HexGrid.js';
import FlowLine from 'ol-ext/style/FlowLine.js';
import HexMap from 'ol-games/source/HexMap.js';
import Feature from 'ol/Feature.js';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import { OSM, Vector as VectorSource, StadiaMaps as StadiaMapsSource } from 'ol/source.js';
import {
	Layer,
	Tile as TileLayer,
	Vector as VectorLayer,
	VectorImage as VectorImageLayer,
	Image as ImageLayer
} from 'ol/layer.js';
import { defaults as defaultControls } from 'ol/control';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import Overlay from 'ol/Overlay.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';
import Icon from 'ol/style/Icon.js';
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';
import {
  getMapCoordinate,
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
  judge,
  getMapChessImage,
  nextStage,
  queryChessRecordByRound, getMap, getSummaryScoreNew
} from '@/api/verdictRecord';
import { sendMsg } from '@/api/websocket.js';
import { getOssById } from '@/api/system.js';
export default {
  components: {NjustFinishScore},
	data() {
		return {
			mapInfo: {
				row: 99,
				col: 130
			},
			coordinateMap: {},
			imageArray: ['village', 'wood', 'bridge', 'city', 'shrub'],
			imageMap: undefined,
			statusImageArray:["ATTACK_MID","ATTACK_MODERATE","ATTACK_SEVERE","REACTANCE_MID","REACTANCE_MODERATE","REACTANCE_SEVERE","SCOUT_CONFIRM","SCOUT_FIND","SCOUT_RECOGNITION"],
			verdictRecordId: '',
			campId: '',
			user: {},
			game: {
				status: 0,
				chessRound: 1,
				nowRound: 0,
				baseRound: 0,
				userPiece: '',
				isDeplaoy: true,
				isOwn: false,
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
      gameScore: {},
			roundActive: 0,
			stageActive: 0,
			userType: '',
			isAdmin: false,
			chessRoundLimit: 0,
			campList: [],
			avatarText: '',
			avatarDesc: '',
			roundOptions: [],
			stageOptions: [],
			historyList: [],
			roundStatusList: [],
			selectIndex: [],
			selectTargetIndex: [],
			statusDesc: '',
			roundEnd: false,
			userStageNotSubmit: false,
			statusIndex: -1,
			judgeTableShowInfo: {},
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
			showScoreButtonInfo: {
				visible: false,
				top: 0,
				left: 0
			},
			campListItem: {},
			scoreList: [],
			summaryDataArray: [],
			finalData: [],
			finalScoreList: [],
			summaryScoreData: [],
			chartRound: 0,
			selCellInfo: {},
			targetCellInfo: {},
			mapChessArray: [],
			pointOffset: [],
			hex: {},
			mapChessMap: {},
			mapChessImageMap: {},
			showChessButtonInfo: {
				visible: false,
				top: 0,
				left: 0
			},
			showChessListInfo: {
				visible: false,
				top: 0,
				left: 0
			},
			pointChessList: [],
			ruleArray: [],
			diceCount: 2,
			blowEffectList: [],
			showActionDescFlag: false,
			showRealTimeScoreFlag: false,
			stageStatusActive: 0,
			chessMoveArray: [],
			isMove: false,
			isAttack: false,
			isScout: false,
			isReactance:false,
			nextStageFlag: false,
			scoutConfirm: false,
			reactanceConfirm:false,
			isCommunication: false,
			communicationConfirm: false,
			flowLineArr: [] // 画箭头存储点集合
		};
	},
	onLoad(res) {
		this.user = uni.getStorageSync('user');
		this.verdictRecordId = res.id;
		this.campId = res.campId;
		this.init();
	},
	methods: {
		async init() {
      uni.showLoading({
        title: "地图数据加载中..."
      })
      let data = {
        verdictRecordId: this.verdictRecordId
      };
      console.log(data)
      getMap(data).then((res)=>{
        console.log(res)
        this.mapInfo.row = res.data.data.longitudinalDimension;
        this.mapInfo.col = res.data.data.transverseDimension;
      });
      let gameData = {
        id: this.verdictRecordId
      }
      this.gameScore = (await queryVerdictResult(gameData)).data.data;
      console.log('this.gameScore', this.gameScore)

      let res = await getMapCoordinate(data);
      console.log("coordinateMap", res)
      this.coordinateMap = res.data.data;
      let chessImageData = {
        verdictRecordId: this.verdictRecordId
      };
      let chessImageRes = await getMapChessImage(chessImageData);
      this.mapChessImageMap = chessImageRes.data.data;
      console.log('this.mapChessImageMap: ', this.mapChessImageMap);
      await this.initImage();
      this.queryChessRecordByRound();

		},
		roundChange(index) {
			console.log('index: ', index);
			if (this.roundActive !== index) {
				this.roundActive = index;
				// this.queryEachAction();
				this.queryChessRecordByRound();
			}
		},
		stageChange(index) {
			if (this.stageActive !== index) {
				this.stageActive = index;
				// this.queryEachAction();
				this.queryChessRecordByRound();
			}
		},
		async queryChessRecordByRound() {
      uni.hideLoading()
			let data = {
				verdictRecordId: this.verdictRecordId,
				chessRound: this.roundActive + 1,
				roundPeriod: this.stageActive + 1
			};

			let res = await queryChessRecordByRound(data);
			let array = res.data.data;
      // console.log("suoyoushuju:",res)
			if(array.length > 0){
				let last = array[0];
				let chessInfoArray = JSON.parse(last.chessPiecesInfo);
				this.formatterAllChessPiecesInfo(chessInfoArray);
				// console.log('chessInfoArray: ',chessInfoArray);
			}else{
				this.formatterAllChessPiecesInfo([]);
			}
			console.log('res.data.data: ', res.data.data);
		},
		async initImage() {
			let that = this;
			that.imageMap = new Map();
			for (name of that.imageArray) {
				let src = '/static/image/terrain/' + name + '.png';
				await that.loadImage(src).then(function (img) {
					that.imageMap.set(name, img);
				});
			}
			for (var key in this.mapChessImageMap) {
				let value = this.mapChessImageMap[key];
				let oss = await getOssById(value);
				let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
				await that.loadImage(coverUrl).then(function (img) {
					that.imageMap.set(key, img);
				});
			}
			for (name of that.statusImageArray) {
				let src = '/static/image/status/' + name + '.png';
				await that.loadImage(src).then(function (img) {
					that.imageMap.set(name, img);
				});
			}

			that.initMap();
		},
		loadImage(src) {
			return new Promise(function (resolve, reject) {
				var img = new Image();
				img.src = src; // 设置图片的src，开始加载图片
				img.onload = function () {
					resolve(img); // 图片加载完成，将img对象传递给resolve
				};
				img.onerror = function () {
					reject(new Error('Image load failed')); // 图片加载失败，reject带上错误信息
				};
			});
		},
		initMap() {
			let that = this;
			// Layers
			var layers = [
				// new TileLayer({ preload: Infinity, source: new OSM() })
			];
			// Popup
			// The map
			var map = new Map({
				target: 'map',
				view: new View({
					minZoom: 13,
					maxZoom: 17,
					zoom: 15,
					center: [13240200, 3767000],
					enableRotation: false
				}),
				layers: layers,
				controls: defaultControls({
					zoom: false,
					rotate: false,
					attribution: false
				})
			});
			this.queryAllFunc();
			this.queryChessRecordByRound()
			// var grid = new HexGrid({ size: 4000, origin: map.getView().getCenter(), row: 39, col: 54 });
			var grid = new HexGrid({
				size: 200,
				origin: map.getView().getCenter(),
				row: this.mapInfo.row,
				col: this.mapInfo.col,
				coordinateMap: this.coordinateMap,
				imageMap: this.imageMap
			});
			var hex = new HexMap({ hexGrid: grid });
			this.hex = hex;
			map.addLayer(new ImageLayer({ source: hex }));

			var text = false;
			// hex.set('text', text);
			hex.set('text', 'offset'); // axial cube offset
			hex.showCoordiantes('offset');
			// grid.setLayout('flat');
			// grid.setSize($(4000);

			var flowStyle = new FlowLine({
				color: 'red',
				color2: 'red',
				width: 8,
				width2: 8,
				_acolor: 'red',
				arrow: 1
			});
			function getStyle(feature, res) {
				/* ol < 7 need a style to make the feature selectable
				return [ defaultStyle, flowStyle ];
				*/
				return flowStyle;
			}
			 vector = new VectorImageLayer({
				source: new VectorSource({ features: new Collection() }),
				style: getStyle
			});
			map.addLayer(vector);

			// Styles
			var greenStyle = new Style({
				fill: new Fill({ color: 'rgba(0,255,0,0.2)' }),
				stroke: new Stroke({ color: 'green', width: 1.25 })
			});
			var blueStyle = new Style({
				fill: new Fill({ color: 'rgba(0,0,255,0.2)' }),
				stroke: new Stroke({ color: 'blue', width: 1.25 })
			});
			var redStyle = new Style({
				fill: new Fill({ color: 'rgba(255,0,0,0.2)' }),
				stroke: new Stroke({ color: 'red', width: 1.25 })
			});

			var current = [];
			var start = false;

		},
		drawRoad(data){
			if((this.userType === "admin" || this.campId === data.campId) && this.user.id !== data.userId){
				var feature= vector.getSource().getFeatureById(data.chessNumber)
				if(feature){
					vector.getSource().removeFeature(feature);
				}
				var flowStyle = new FlowLine({
					color: 'red',
					color2: 'red',
					width: 8,
					width2: 8,
					_acolor: 'red',
					arrow: 1
				});
				var l = new Feature({
					geometry: new LineString(data.array),
					style: flowStyle,
					type: 'LineString'
				});
				l.setId(data.chessNumber);
				vector.getSource().addFeature(l);
			}

		},


		showChessAction(e, item) {
			this.selCellInfo = item;
			setTimeout(() => {
				let x = e.detail.x; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
				let y = e.detail.y; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
				this.showChessButtonInfo.top = y;
				this.showChessButtonInfo.left = x;
				this.showChessButtonInfo.visible = true;
			}, 100);
		},
		chessClick(e, type) {
			if (type === 'action') {
				setTimeout(() => {
					let x = e.originalEvent.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
					let y = e.originalEvent.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
					this.showChessButtonInfo.top = y;
					this.showChessButtonInfo.left = x;
					this.showChessButtonInfo.visible = true;
				}, 100);
			} else if (type === 'chess') {
				setTimeout(() => {
					let x = e.originalEvent.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
					let y = e.originalEvent.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
					this.showChessListInfo.top = y;
					this.showChessListInfo.left = x;
					this.showChessListInfo.visible = true;
				}, 100);
			}
		},
		attack() {
			this.isAttack = true;
			this.isMove = false;
			this.showChessButtonInfo.visible = false;
			this.showChessListInfo.visible = false;
		},
		reactance(){
			this.isReactance = true
			this.showChessButtonInfo.visible = false;
			this.showChessListInfo.visible = false;
		},
		move() {
			this.isAttack = false;
			this.isMove = true;
			this.showChessButtonInfo.visible = false;
			this.showChessListInfo.visible = false;
			// this.flowLineArr
		},
		scout() {
			this.isScout = true;
			this.showChessButtonInfo.visible = false;
			this.showChessListInfo.visible = false;
		},
		communication() {
			this.isCommunication = true;
			this.showChessButtonInfo.visible = false;
			this.showChessListInfo.visible = false;
			uni.showToast({
				title: '请点击通信点位！',
				icon: 'none',
				duration: 1500
			});
		},

		getChessByOffset(offset) {
			let selectArray = [];
			for (let item of this.mapChessArray) {
				if (item.offset === offset) {
					selectArray.push(item.info);
				}
			}
			return selectArray;
		},
		async queryAllFunc() {
			let data = {
				id: this.verdictRecordId
			};
			let rst = await queryVerdictResult(data);

			let resultData = rst.data.data;
			console.log('resultData: ',resultData);
			for (var key in resultData) {
				this.game[key] = resultData[key];
			}
      console.log('this.game', this.game)
			// this.roundActive = this.game.chessRound;
			//格式化用户
			// this.formatterUser();
			//格式化campList
			this.formatterCampList();
			this.chessRoundLimit = resultData.chessRoundLimit;
			this.initialRoundOptions(this.chessRoundLimit);
			// this.getRoundStatus();
			if (this.game.status < 30) {
				this.game.nowRound = 0;
			} else {
				this.game.nowRound = this.game.chessRound;
			}
			// this.queryUsChessPiecesInfoFunc();
		},
		formatterUser() {
			if (this.user.id === this.game.inviterUserId) {
				this.userType = 'admin';
				this.avatarText = '导演';
			}
			if (this.user.id === this.game.firstUserId || this.user.id === this.game.secondUserId) {
				this.userType = 'user';
				if (this.user.id === this.game.firstUserId) {
					this.avatarText = this.game.firstCampName;
				} else if (this.user.id === this.game.secondUserId) {
					this.avatarText = this.game.secondCampName;
				}
				this.avatarDesc = '操作员';
			}
			if (this.user.id === this.game.firstJudgeUserId || this.user.id === this.game.secondJudgeUserId) {
				this.userType = 'judge';
				if (this.user.id === this.game.firstJudgeUserId) {
					this.avatarText = this.game.firstCampName;
				} else if (this.user.id === this.game.secondJudgeUserId) {
					this.avatarText = this.game.secondCampName;
				}
				this.avatarDesc = '裁决员';
			}
      if (this.user.id === this.game.firstCommanderUserId || this.user.id === this.game.secondCommanderUserId) {
        this.userType = 'commander';
        if (this.user.id === this.game.firstCommanderUserId) {
          this.avatarText = this.game.firstCampName;
        } else if (this.user.id === this.game.secondCommanderUserId) {
          this.avatarText = this.game.secondCampName;
        }
        this.avatarDesc = '指挥员';
      }

			this.formatterCampList();
		},
		initialRoundOptions(round) {
			this.stageOptions = [];
			let stageArray = this.game.stageStr.split(',');
			for (let item of stageArray) {
				this.stageOptions.push({
					title: item
				});
			}
			this.roundOptions = [];
			for (let i = 0; i <= round - 1; i++) {
				this.roundOptions.push({ title: '回合' + Number(i + 1) });
			}
			// this.stageActive = this.game.roundPeriod - 1;

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
		},
		async queryPromptFunc() {
			let data = {
				id: this.verdictRecordId
			};
			data.userId = this.user.id;
			let prompt = await queryPrompt(data);
			let array = [];
			this.historyList = prompt.data.data.verdictRecordHistoryList;
			for (let i in this.historyList) {
				array.push(this.historyList[i].actionDesc);
			}
			array.filter(function (s) {
				return s && s.trim();
			});
			this.game.actionDescList = array;
		},


		async queryUsChessPiecesInfoFunc() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				chessRound: this.game.chessRound,
				roundPeriod: this.stageActive + 1
			};
			let res = '';
			if (this.userType === 'user') {
				data.campId = this.campId;
				res = await queryAllChessPiecesInfo(data);
			} else {
				res = await queryAllChessPiecesInfo(data);
			}
			this.game.userPiece = [];
			let array = res.data.data;
      // console.log(array)
			for (let item of array) {
				item.isAdd = false;
				item.canMove = true;
				item.isDie = false;
				this.game.userPiece.push(item);
			}
			this.formatterAllChessPiecesInfo(array);
		},
		formatterAllChessPiecesInfo(array) {
			this.mapChessArray = [];
			for (let item of array) {
				if (item.offset) {
					this.mapChessArray.push({
						offset: item.offset,
						info: item
					});
				}
			}
			this.hex.moveChessImage(this.mapChessArray);
		},
		async getRealTimeScore() {
			if (!this.showRealTimeScoreFlag) {
				let queryScoreData = {
					verdictRecordId: this.verdictRecordId
				};
				let scoreListResult = await getRealTimeScore(queryScoreData);
				let realTimeScoreList = scoreListResult.data.data;
				this.realTimeScore.firstScoretypeTotal = 0;
				this.realTimeScore.secondScoretypeTotal = 0;
				this.realTimeScore.firstCampName = this.campList[0].campName;
				this.realTimeScore.secondCampName = this.campList[1].campName;
				for (var i in realTimeScoreList) {
					if (this.campList[0].campId === realTimeScoreList[i].campId) {
						if (realTimeScoreList[i].type === 1) {
							this.realTimeScore.firstScoretype1 = realTimeScoreList[i].score;
						} else if (realTimeScoreList[i].type === 2) {
							this.realTimeScore.firstScoretype2 = realTimeScoreList[i].score;
						} else if (realTimeScoreList[i].type === 3) {
							this.realTimeScore.firstScoretype3 = realTimeScoreList[i].score;
						}
						this.realTimeScore.firstScoretypeTotal += realTimeScoreList[i].score;
					} else {
						if (realTimeScoreList[i].type === 1) {
							this.realTimeScore.secondScoretype1 = realTimeScoreList[i].score;
						} else if (realTimeScoreList[i].type === 2) {
							this.realTimeScore.secondScoretype2 = realTimeScoreList[i].score;
						} else if (realTimeScoreList[i].type === 3) {
							this.realTimeScore.secondScoretype3 = realTimeScoreList[i].score;
						}
						this.realTimeScore.secondScoretypeTotal += realTimeScoreList[i].score;
					}
				}
				this.$refs.showRealTimeScore.open();
			} else {
				this.$refs.showRealTimeScore.close();
			}
			this.showRealTimeScoreFlag = !this.showRealTimeScoreFlag;
		},
		getJudgeTable() {
			this.judgeTableShowInfo = {
				type: 'input',
				verdictRecordId: this.verdictRecordId,
				chessRound: this.roundActive,
				roundPeriod: this.stageActive + 1,
				roundPeriodName: this.stageOptions[this.stageActive].title
			};
			if (this.userType === 'user' || this.userType === 'judge') {
				this.judgeTableShowInfo.campId = this.campId;
			}
			this.$refs.judgeTable.open();
		},
    async getScoreAndJudgeTable() {
      this.judgeTableShowInfo = {
        type: 'scoreAndJudge', // 新增类型，表示同时支持打分和裁决
        verdictRecordId: this.verdictRecordId,
        campId: this.campId,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1,
        roundPeriodName: this.stageOptions[this.stageActive].title,
        userType: this.userType
      };

      if (this.userType === 'user' || this.userType === 'judge') {
        this.judgeTableShowInfo.campId = this.campId;
      }

      // 同时获取历史打分结果和裁决数据
      if (this.campListItem) {
        let queryScoreData = {
          verdictRecordId: this.campListItem.verdictRecordId,
          campId: this.campListItem.campId,
          chessRound: this.campListItem.chessRound
        };
        let scoreListResult = await queryScoreList(queryScoreData);
        this.scoreList = scoreListResult.data.data;
        this.judgeTableShowInfo.scoreList = this.scoreList;
      }

      this.$refs.judgeTable.open();
    },
		async scoreTableShow(item, index) {
      item.chessRound = index;
      this.campListItem = item;

      // 直接调用合并后的功能
      await this.getScoreAndJudgeTable();
      this.showScoreButtonInfo.visible = false;
		},
		getJudgeResult() {
			this.judgeTableShowInfo = {
				type: 'record',
				verdictRecordId: this.verdictRecordId
			};
			if (this.userType === 'user' || this.userType === 'judge') {
				this.judgeTableShowInfo.campId = this.campId;
			}
			this.$refs.judgeTable.open();
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
			if (res.data.code === 200) {
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
		},
		async getFinalSummary() {
			let queryScoreData = {
				verdictRecordId: this.verdictRecordId
			};
			let res = await getSummaryScoreNew(queryScoreData);
			this.chartRound = this.chessRoundLimit;
			this.summaryScoreData = res.data.data;
			this.$refs.finalSummary.open();
		},
		selPiece(val) {
      console.log("bushuqizi")
      console.log(val)
			this.selCellInfo.chessPiecesNumber = val.chessPiecesNumber;
			this.selCellInfo.coordinate = this.hex.hexToPointNumber(
				this.pointOffset[1],
				this.pointOffset[0],
				this.mapInfo.row,
				this.mapInfo.col
			);
			this.selCellInfo.offset = this.pointOffset.join(',');
			this.deployChessPiecesFunc(this.selCellInfo, true);
			val.isAdd = true;
			this.$refs.showSelPiece.close();
			//更新地图棋子数组
			this.formatterMapChessArray(this.selCellInfo.offset, val);
		},
		formatterMapChessArray(offset, info) {
			//查询是否有重复的棋子
			let isHave = false;
			for (let item of this.mapChessArray) {
				if (item.offset === offset && item.info.chessPiecesNumber === info.chessPiecesNumber) {
					item.info = info;
					isHave = true;
				}
			}
			if (!isHave) {
				this.mapChessArray.push({
					offset: offset,
					info: info
				});
			}
			this.hex.moveChessImage(this.mapChessArray);
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
				data.targetOffset = val.offset;
			} else {
				data.selfCoordinate = val.coordinate;
				data.selfOffset = val.offset;
				data.targetCoordinate = '0000';
			}
      console.log(data)
			deployChessPieces(data);
		},
		endDeployFunc() {
			let data = {
				verdictRecordId: this.verdictRecordId,
				userId: this.user.id
			};
			endDeploy(data).then((res) => {
				if (res.data.code === 200) {
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
		shakeDice(diceArr) {
			this.$refs.popup.open();
			this.$nextTick(() => {
				for (var i = 0; i < this.diceCount; i++) {
					this.$refs[`dice${i}`][0].throwDice(diceArr[i]);
				}
			});
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
			this.$refs.popupRule.open();
		},
		sleep(ms) {
			return new Promise((resolve) => setTimeout(resolve, ms));
		},
		async judgeShow(dataArray) {
			let that = this;
			for (let i = 0; i < dataArray.length; i++) {
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
		async getBlowEffectList() {
			let data = {
				verdictType: 10
			};
			let blowEffectRes = await getBlowEffectList(data);
			this.blowEffectList = blowEffectRes.data.data;
			this.$refs.blowEffectTable.open();
		},
		async refresh() {
			// await this.queryUsChessPiecesInfoFunc();
			await this.queryPromptFunc();
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
		},
		async judge() {
      if (this.userType === 'admin') {
        this.judgeTableShowInfo = {
          userType: this.userType,
          type: 'scoreAndJudge', // 使用合并后的类型
          verdictRecordId: this.verdictRecordId,
        };
      } else {
        this.judgeTableShowInfo = {
          userType: this.userType,
          type: 'scoreAndJudge', // 使用合并后的类型
          verdictRecordId: this.verdictRecordId,
          campId: this.campId,
          chessRound: this.roundActive,
          roundPeriod: this.stageActive + 1
        };
      }

      // 获取打分数据
      if (this.campListItem) {
        let queryScoreData = {
          verdictRecordId: this.verdictRecordId,
          campId: this.campId,
          chessRound: this.roundActive
        };
        let scoreListResult = await queryScoreList(queryScoreData);
        this.scoreList = scoreListResult.data.data;
        this.judgeTableShowInfo.scoreList = this.scoreList;
      }

      this.$refs.judgeTable.open();
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
			if (res.data.code === 200) {
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
		},
		showActionDescFunc() {
			if (!this.showActionDescFlag) {
				this.$refs.showActionDesc.open();
			} else {
				this.$refs.showActionDesc.close();
			}
			this.showActionDescFlag = !this.showActionDescFlag;
		},
		judgeComplete() {
			sendMsg(
				JSON.stringify({
					action: 'takeAction',
					verdictRecordId: this.verdictRecordId
				})
			);
			sendMsg(
				JSON.stringify({
					action: 'clearRoad',
					verdictRecordId: this.verdictRecordId
				})
			);
		},
		nextStage() {
			nextStage(this.verdictRecordId).then((res) => {
				sendMsg(
					JSON.stringify({
						action: 'takeAction',
						verdictRecordId: this.verdictRecordId
					})
				);
        sendMsg(
            JSON.stringify({
              action: 'nextRound',
              verdictRecordId: this.verdictRecordId
            })
        );
				this.nextStageFlag = false;
			});
		},
    getScore(){
      this.$refs.njustScore.open()
    },
	}
};
</script>

<style lang="scss" scoped>
.xinyi-content {
  background-image: url('@/static/image/login/bg.jpg');
  background-size: cover;
}

#map {
  width: 100vw;
  height: 100vh;
  z-index: 998;
}

.middleBtn {
  position: fixed;
  bottom: 100px;
  width: 100px;
  left: calc(50vw - 50px);
  z-index: 1000;

  .btnView {
    background-color: rgba(87, 64, 50, 0.8);
    color: white;
    text-align: center;
    font-size: 20px;
    margin-top: 2px;
    align-items: center;
    padding: 10px 5px 10px 5px;
    border-radius: 5px;
  }

  .btnView:hover{
    color: #4cf5e3;
  }
}

.rightBtn {
  position: fixed;
  top: 100px;
  right: 0;
  z-index: 1000;
  text-align: center;

  .btnView {
    writing-mode: vertical-rl;
    background: linear-gradient(to bottom, #1e839b 0%, #62a8b9 100%);
    color: #ffffff;
    text-align: center;
    align-items: center;
    //padding: 10px 5px 10px 5px;
    width: 30px;
    height: 100px;
    margin-top: 30px;
    position: relative; /* 为了使用伪元素 */
  }

  .btnView::before {
    content: '';
    position: absolute;
    top: -30px;
    left: 0;
    border-right: 30px solid #1e839b; /* 显示左边框 */
    border-top: 30px solid transparent; /* 隐藏上边框 */

    width: 0;
    height: 0;
  }

  .btnView::after {
    content: '';
    position: absolute;
    bottom: -30px;
    left: 0;
    border-bottom: 30px solid transparent; /* 隐藏下边框 */
    border-right: 30px solid #62a8b9; /* 显示左边框 */
    width: 0;
    height: 0;
  }
}

.top{
  position: fixed;
  width: 100vw;
  height: 15vh;
  display: flex;
  flex-direction: row;
  z-index: 999;
}

.top-head{
  width: 30vw;
  display: flex;
  flex-direction: row;
  margin-top: 10px;
}

.top-middle{
  width: 40vw;
  text-align: center;
  align-items: center;
  .react-left {
    &.react-l-s {
      width: 500px;
      text-align: left;
    }
    font-size: 18px;
    width: 80%;
    margin-left: 10%;
    margin-top: 10px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    transform: skewX(45deg);
    background-color: rgba(87, 64, 50, 0.8);
    border: 4px solid transparent; /* 移除dashed，使用border-image */


    /* 设置虚线效果 */

    .react-left {
      position: absolute;
      left: -25px;
      top: 0;
      height: 50px;
      width: 50px;
      background-color: rgba(87, 64, 50, 0.8);
      transform: skewX(-45deg);
    }

    .text {
      color: #4cf5e3;
      font-size: 25px;
      font-weight: bold;
      display: inline-block;
      transform: skewX(-45deg);
    }
  }
}

.top-tail{
  width: 30vw;
  display: flex;
  flex-direction: row;

  .react-right {
    &.react-l-s {
      text-align: right;
      width: 500px;
    }
    font-size: 18px;
    width: 80%;
    margin-left: 20%;
    height: 60px;
    line-height: 60px;
    text-align: center;
    transform: skewX(45deg);
    background-color: rgba(87, 64, 50, 1);
    .react-after {
      position: absolute;
      right: -25px;
      top: 0;
      height: 60px;
      width: 60px;
      background-color: rgba(87, 64, 50, 1);
      transform: skewX(-45deg);
    }

    .text {
      color: #4cf5e3;
      font-size: 18px;
      font-weight: bold;
      display: inline-block;
      transform: skewX(-45deg);
    }
  }

  .top-tail-action{
    color: white;
  }
  .hover-top-tail-action{
    color: #4cf5e3;
  }
}



.top__view {
  position: fixed;
  display: flex;
  width: 96vw;
  height: 10vh;
  z-index: 999;
  align-items: center;
  // background: rgba(255, 255, 255, 0.5);

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
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 10rpx;
  }
}

.foot-view1 {
  position: fixed;
  bottom: 6vh;
  display: flex;
  width: 96vw;
  height: 10vh;
  z-index: 1000;
  // margin-top: 20px;
}

.foot-view2 {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 96vw;
  height: 10vh;
  z-index: 1000;
  // margin-top: 20px;
}

.newcontextmenu {
  position: absolute;
  width: 100px;
  z-index: 1000;
  background-color: #10292f;
}

.score-btn-view {
  text-align: center;
  background-color: #10292f;
  // padding: 10px 10px 10px 10px;
  cursor: pointer;
  border-radius: 10px;

  .uv-text {
    width: 100%;
    padding: 10px 10px 10px 10px;
  }

  .chess-view {
    width: 100%;
    text-align: left;
    padding: 10px 10px 10px 10px;
    color: #ffffff;
  }
}
</style>
