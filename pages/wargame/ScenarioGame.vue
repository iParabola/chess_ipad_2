<template>
  <view class="xinyi-content">
    <view v-if="showToast" class="custom-toast">
      {{ toastMessage }}
    </view>

    <view class="top">
      <view class="top-head">
        <image src="/static/image/wargame/火力.svg" style="width: 15%; height: 7vh;"></image>
        <view style="height: 7vh; line-height: 7vh; font-size: 25px; color: #4cf5e3;">火力战</view>
        <view style="height: 7vh; line-height: 8vh; font-size: 18px; color: white; margin-left: 10px">手工兵棋裁决——火力战系统</view>
      </view>
      <view class="top-middle">
        <div class="react-left ml-3">
          <span class="text">想定设计阶段</span>
        </div>
      </view>
      <view class="top-tail">
        <div class="react-right">
          <span class="react-after"></span>
          <span style="width: 40%; margin-left: 10%" class="text">
            <view class="top-tail-action" hover-class="hover-top-tail-action">
              <view @click="endDeployC">
                结束想定部署
              </view>
            </view>
          </span>
          <span style="width: 50%;" class="text">{{ avatarText }}{{ avatarDesc }}: {{user.userName}}</span>
        </div>
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
              v-if="!item.isAdd"
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
    <uv-modal :showCancelButton="false" :showConfirmButton="false" title="切换棋子" ref="switchChess">
      <view>
        <div style="display: flex; flex-wrap: wrap; justify-content: flex-start">
          <div
              @click="switchPiece(item)"
              v-for="(item, index) in pointInfoList"
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
    <view v-if="showChessOptionInfo.visible"
          class="newcontextmenu"
          name="newcontextmenu"
          :style="{ left: showChessOptionInfo.left + 'px', top: showChessOptionInfo.top + 'px', zIndex: 1001 }">
      <view class="score-btn-view">
        <uv-text
            v-if="showChessOptionInfo.stacked"
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'切换棋子'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="switchChess()"
        ></uv-text>
        <uv-text
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'添加棋子'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="continueAddChess()"
        ></uv-text>
        <uv-text
            prefixIcon="empty-history"
            iconStyle="font-size: 19px"
            :text="'删除棋子'"
            color="#ffffff"
            :size="18"
            :iconStyle="{ color: '#ffffff', size: 18 }"
            @click="delChess()"
        ></uv-text>
      </view>
    </view>
    <view
        v-if="showChessButtonInfo.visible"
        :style="{ left: showChessButtonInfo.left + 'px', top: showChessButtonInfo.top + 'px', zIndex: 1001 }"
        class="newcontextmenu"
        name="newcontextmenu"
    >
    </view>
    <view
        v-if="showChessListInfo.visible"
        :style="{ left: showChessListInfo.left + 'px', top: showChessListInfo.top + 'px', width: '200px' }"
        class="newcontextmenu"
        name="newcontextmenu"
    >
    </view>
    <rule-table ref="popupRule" :dataArray="ruleArray"></rule-table>

    <view id="map"></view>
  </view>
</template>

<script>
import item from "ol-ext/legend/Item";

let vector;
import 'ol/ol.css';
import 'ol-ext/dist/ol-ext.css';
import 'ol-games/dist/ol-games.css';
import {Map, View, Collection} from 'ol';
import Draw from 'ol/interaction/Draw.js';
import HexGrid from 'ol-ext/render/HexGrid.js';
import FlowLine from 'ol-ext/style/FlowLine.js';
import HexMap from 'ol-games/source/HexMap.js';
import Feature from 'ol/Feature.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {OSM, Vector as VectorSource, StadiaMaps as StadiaMapsSource} from 'ol/source.js';
import {
  Layer,
  Tile as TileLayer,
  Vector as VectorLayer,
  VectorImage as VectorImageLayer,
  Image as ImageLayer
} from 'ol/layer.js';
import {defaults as defaultControls} from 'ol/control';
import Projection from 'ol/proj/Projection.js';
import Static from 'ol/source/ImageStatic.js';
import Overlay from 'ol/Overlay.js';
import Polygon from 'ol/geom/Polygon.js';
import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';
import Icon from 'ol/style/Icon.js';
import WebGLVectorLayerRenderer from 'ol/renderer/webgl/VectorLayer.js';
import {getOssById} from '@/api/system.js';
import {delScenarioChessPiece, getMapCoordinateC, queryAllChessPiecesInfoC} from '@/api/scenarioCreate';
import {getMapChessImageC} from '@/api/scenarioCreate';
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
  undeployChessPieces,
  endRound,
  chessPiecesActionNew,
  changePiecesActionPoint,
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
  nextStage, resetPiecesActionPoint,
  changeChessStatus, getMap
} from '@/api/verdictRecord';
import {sendMsg} from '@/api/websocket.js';
import {getMapC} from "@/api/scenarioCreate";
import { deployScenarioChessPieces}from "@/api/scenarioCreate";
import {delScenarioChessPieces}from "@/api/scenarioCreate";
export default {
  data() {
    return {
      mapInfo: {
        row: 99,
        col: 130
      },
      productId: '',
      arbiterMapId: 0,
      coordinateMap: {},
      imageArray: ['village', 'wood', 'bridge', 'city', 'shrub'],
      imageMap: undefined,
      statusImageArray: ["ATTACK_MID", "ATTACK_MODERATE", "ATTACK_SEVERE", "REACTANCE_MID", "REACTANCE_MODERATE", "REACTANCE_SEVERE", "SCOUT_CONFIRM", "SCOUT_FIND", "SCOUT_RECOGNITION"],
      verdictRecordId: '',
      campId: '',
      user: {},
      game: {
        status: 0,
        chessRound: 1,
        // nowRound: 0,
        baseRound: 0,
        userPiece: '',
        // isDeplaoy: true,
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
      chessOnMapArray: [],
      pointOffset: [],
      hex: {},
      mapChessMap: {},
      mapChessImageMap: {},
      showChessButtonInfo: {
        visible: false,
        top: 0,
        left: 0
      },
      showChessOptionInfo: {
        stacked: false,
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
      isReactance: false,
      nextStageFlag: false,
      scoutConfirm: false,
      reactanceConfirm: false,
      isCommunication: false,
      communicationConfirm: false,
      flowLineArr: [], // 画箭头存储点集合
      nextBtnText: "下一回合",
      initType: "",
      pointInfoList: [],
      selectedIndexInMapChessArray: -1,
      hexLayer: "",
      attackLine: "",
      periodActionChessList:[],

      userModify: false,

      toastMessage: '',
      showToast: false,
    };
  },
  mounted() {
  },
  onLoad(res) {
    this.onMessage();
    this.user = uni.getStorageSync('user');
    this.scenarioId = res.scenarioId;
    this.arbiterMapId = res.arbiterMapId;
    this.productId = res.productId;
    this.init();
  },
  methods: {
    showCustomToast(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 1500); // Toast 显示 1.5 秒
    },

    async init() {
      uni.showLoading({
        title: "地图数据加载中..."
      })
      let data = {
        scenarioId: this.arbiterMapId
      };
      // console.log(typeof scenarioId)
      // 这一步实际是通过mapid进行的查询
      getMapC(data).then((res)=>{
        console.log(res)
        this.mapInfo.row = res.data.data.longitudinalDimension;
        this.mapInfo.col = res.data.data.transverseDimension;
      });
      let res = await getMapCoordinateC(data);

      this.coordinateMap = res.data.data;
      let chessIamgeData = {
        scenarioId: this.scenarioId
      };
      let chessImageRes = await getMapChessImageC(chessIamgeData);
      this.mapChessImageMap = chessImageRes.data.data;
      await this.initImage();
    },
    // websocket 接收信息
    onMessage() {
      uni.$on('onMessage', (res) => {});
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
        // console.log('src: ', src);
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
    endDeployC()
    {
      uni.navigateTo({
        url: '/pages/verdict/list?productId=' + this.productId + '&isAdmin=true&isUser=false'
      });
    },
    initMap() {
      let that = this;
      var layers = [
      ];
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
      var grid = new HexGrid({
        size: 200,
        origin: map.getView().getCenter(),
        row: this.mapInfo.row,
        col: this.mapInfo.col,
        coordinateMap: this.coordinateMap,
        imageMap: this.imageMap
      });
      var hex = new HexMap({hexGrid: grid});
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
        source: new VectorSource({features: new Collection()}),
        style: getStyle
      });
      map.addLayer(vector);

      // Styles
      var greenStyle = new Style({
        fill: new Fill({color: 'rgba(0,255,0,0.2)'}),
        stroke: new Stroke({color: 'green', width: 1.25})
      });
      var blueStyle = new Style({
        fill: new Fill({color: 'rgba(0,0,255,0.2)'}),
        stroke: new Stroke({color: 'blue', width: 1.25})
      });
      var redStyle = new Style({
        fill: new Fill({color: 'rgba(255,0,0,0.2)'}),
        stroke: new Stroke({color: 'red', width: 1.25})
      });

      var current = [];
      var start = false;

      map.on(['click'], function (e) {

        if (that.showChessOptionInfo.visible) {
          that.showChessOptionInfo.visible = false;
          return;
        }
        // hex.drawArrow([-5,1],[-4,0])
        that.showChessListInfo.visible = false;
        that.showChessButtonInfo.visible = false;
        that.showChessOptionInfo.stacked = false;
        // that.showChessOptionInfo.visible=false;
        // if (that.userType !== 'user') {
        //   return;
        // }
        let ehex = grid.coord2hex(e.coordinate);
        var h = grid.hex2offset(ehex);

        // console.log('615ffset value:  ', h[0] + ',' + h[1]);
        // console.log(hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col));
        // console.log(h)


        //TODO 判断这个格子里有没有棋子
        let exixitChess = 0;
        let campIdt;
        for (let i = 0; i < that.mapChessArray.length; i++) {
          if (that.mapChessArray[i].offset === JSON.stringify(h).slice(1, -1)) {
            exixitChess = 1;
            campIdt = that.mapChessArray[i].info.chessPiecesCampId;
            // console.log(that.mapChessArray[i].infoList);
            that.selectedIndexInMapChessArray = i;
            // console.log("selectedIndexInMapChessArray", that.selectedIndexInMapChessArray)
            if (that.mapChessArray[i].infoList.length > 1) {
              that.showChessOptionInfo.stacked = true;
              that.pointInfoList = that.mapChessArray[i].infoList;
            }
            break;
          }
        }
        if (exixitChess) {
          let pix = map.getPixelFromCoordinate(e.coordinate);
          let x = pix[0]; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
          let y = pix[1]; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
          that.showChessOptionInfo.top = y;
          that.showChessOptionInfo.left = x;
          that.pointOffset = h;
          that.showChessOptionInfo.visible = true;
        } else {
          that.pointOffset = h;
          that.$refs.showSelPiece.open();
        }
    });
  },

    continueAddChess() {
      //向同一格内堆叠棋子
      // console.log("continueAddChess")
      this.showChessOptionInfo.visible = false;
      this.$refs.showSelPiece.open();
    },

    switchChess() {
      //选择同格棋子进行操作
      this.showChessOptionInfo.visible = false;
      this.$refs.switchChess.open();
    },
    switchPiece(item) {
      this.mapChessArray[this.selectedIndexInMapChessArray].info = item;
      this.$refs.switchChess.close();
      this.hex.moveChessImage(this.mapChessArray);
    },
    delChess() {
      //删除显示在最上层的棋子
      this.showChessOptionInfo.visible = false;
      if (this.mapChessArray[this.selectedIndexInMapChessArray].infoList.length > 1) {
        for (let i = 0; i < this.mapChessArray[this.selectedIndexInMapChessArray].infoList.length; i++) {
          if (this.mapChessArray[this.selectedIndexInMapChessArray].infoList[i] == this.mapChessArray[this.selectedIndexInMapChessArray].info) {
            this.mapChessArray[this.selectedIndexInMapChessArray].infoList.splice(i, 1);
            this.undeployChessPiecesFunc(this.mapChessArray[this.selectedIndexInMapChessArray].info, true);
            break;
          }
        }
        this.mapChessArray[this.selectedIndexInMapChessArray].info = this.mapChessArray[this.selectedIndexInMapChessArray].infoList[0];
      } else {
        this.undeployChessPiecesFunc(this.mapChessArray[this.selectedIndexInMapChessArray].info, true);
        this.mapChessArray.splice(this.selectedIndexInMapChessArray, 1);
      }
      this.hex.moveChessImage(this.mapChessArray);

    },
    drawRoad(data) {
      // console.log("接受drawroad", (this.initType === "watch" || this.userType === "admin" || this.campId === data.campId) && this.user.id !== data.userId);
      if ((this.initType === "watch" || this.userType === "admin" || this.campId === data.campId) && this.user.id !== data.userId) {
        var feature = vector.getSource().getFeatureById(data.chessNumber)
        if (feature) {
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


    scoutPoint() {
      this.isScout = false;
      this.$refs.scoutConfirm.close();
      this.chessPiecesActionFunc(40, this.selCellInfo, this.targetCellInfo, false);
    },


    async chessPiecesActionFunc(actionMode, source, target, isAttack, isHide) {
      let data = {
        actionMode: actionMode,
        campId: this.campId,
        chessPiecesNumber: source.chessPiecesNumber,
        selfCoordinate: source.coordinate,
        selfOffset: source.offset,
        targetCoordinate: target.coordinate,
        targetOffset: target.offset,
        userId: this.user.id,
        verdictRecordId: this.verdictRecordId,
        targetChessPiecesNumber: target.chessPiecesNumber,
        chessRound: this.roundActive,
        roundPeriod: this.stageActive + 1,
        moveInfo: JSON.stringify(source.moveInfo),
        attackResult: source.attackResult,
        roundActionPoint:false
      };
      isHide && (data.actionMode = 30);
      // console.log(data)

      await chessPiecesActionNew(data);
      if (actionMode === 10) {
        this.queryUsChessPiecesInfoFunc();
        sendMsg(
            JSON.stringify({
              action: 'refresh',
              verdictRecordId: this.verdictRecordId
            })
        );
      }
      await this.queryPromptFunc();
    },
    chessClick(e, type) {
      if (type === 'action') {
        setTimeout(() => {
          let x = e.originalEvent.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
          let y = e.originalEvent.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
          this.showChessButtonInfo.top = y;
          this.showChessButtonInfo.left = x;
          // console.log("11111",this.selCellInfo)
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
      uni.hideLoading()
      this.roundActive = this.game.chessRound;
      this.queryUsChessPiecesInfoFunc();
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
        scenarioRecordId: this.scenarioId,
      };
      let res = '';
      res = await queryAllChessPiecesInfoC(data);
      console.log("res:    ", res)
      this.game.userPiece = [];
      let array = res.data.data;
      for (let item of array) {
        item.isAdd = false;
        item.canMove = true;
        item.isDie = false;
        let oss = await getOssById(item.chessPiecesCover);
        let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
        item.chessPiecesCover = coverUrl;
        this.game.userPiece.push(item);
        // console.log("userPiece:    ", this.game.userPiece)
      }
      this.formatterAllChessPiecesInfo(array);
    },
    formatterAllChessPiecesInfo(array) {
      // console.log("suoyouqizixinxi",array)
      // todo 每次获取会重置导致刷新后保存信息发生改变
      this.mapChessArray = [];
      for (let item of array) {
        if (item.offset) {
          const tmp = this.mapChessArray.find(function (ttt) {
            return item.offset === ttt.offset;
          });

// 检查是否找到了对应的项
          if (tmp) {
            console.log('找到对应的项:');
            tmp.info = item;
            tmp.infoList.push(item);
          } else {
            console.log('没有找到对应的项');
            this.mapChessArray.push({
              offset: item.offset,
              info: item,
              infoList: [item]
            });
          }
        }
      }

      this.hex.moveChessImage(this.mapChessArray);
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

    selPiece(val) {
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
        if (item.offset == offset) {
          // item.infoList.push(info);
          // item.info = info;
          isHave = true;
        }
      }
      if (!isHave) {
        this.mapChessArray.push({
          offset: offset,
          info: info,
          infoList: [info]
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
        scenarioRecordId: this.scenarioId
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
      deployScenarioChessPieces(data);
    },
    undeployChessPiecesFunc(val, isAdd) {
      let data = {
        actionMode: 10,
        campId: this.campId,
        chessPiecesNumber: val.chessPiecesNumber,
        selfCoordinate: 'string',
        targetCoordinate: 'string',
        userId: this.user.id,
        scenarioRecordId: this.scenarioId
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
      delScenarioChessPiece(data);
    },
    endDeployFunc() {
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
    async getBlowEffectList() {
      let data = {
        verdictType: 10
      };
      let blowEffectRes = await getBlowEffectList(data);
      this.blowEffectList = blowEffectRes.data.data;
      this.$refs.blowEffectTable.open();
    },
    async refresh() {
      await this.queryPromptFunc();
    },
  }
};
</script>

<style lang="scss" scoped>
.xinyi-content {
  background-image: url('@/static/image/login/bg.jpg');
  background-size: 100% 100%;
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
    background-color: #2979ff;
    color: #ffffff;
    text-align: center;
    margin-top: 2px;
    align-items: center;
    padding: 10px 5px 10px 5px;
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

.foot-view {
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
  .top-tail-action{
    color: #77f1e2;
  }

</style>
