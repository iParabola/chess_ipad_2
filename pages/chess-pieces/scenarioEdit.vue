<template>
  <view class="xinyi-content">
    <NavBar title="想定地图选择" right-text="退出登录" :user="user"></NavBar>
    <uv-vtabs
        style="width: 100vw"
        :chain="false"
        :list="scenarioList"
        :barWidth="160"
        :height="height"
        @change="selectMenu"
        barBgColor="#141829"

        :barItemStyle="{ fontSize: '20px', color: '#4cf5e3' }"
        :barItemActiveStyle="{ fontSize: '20px', color: '#141829' }"
        :contentStyle="{ backgroundColor: '#141829' }"
    >
      <div id="map"></div>
      <uv-vtabs-item>
        <view class="chess-pieces__btn">
          <button class="chess-pieces-confirm__btn" @click="Del()">删除</button>
          <button class="chess-pieces-confirm__btn" @click="Rev()">修改当前想定</button>
          <button class="chess-pieces-confirm__btn" @click="createNewscenario">创建新的想定</button>
        </view>
      </uv-vtabs-item>

    </uv-vtabs>
  </view>
</template>

<script>
import NjustScorePopup from "@/uni_modules/njust-score-popup/njust-score-popup.vue";
import {getOssById} from '@/api/system.js';
import {queryScenarios, queryVerdictScenarioVos} from '@/api/scenario';
import {queryVerdictChessPiecesVos} from '@/api/chessPieces';
import {saveVerdictChessPieces, saveVerdictScenario} from '@/api/verdictRecord';
import {generateInviteCode} from '@/api/room.js';
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
import {delScenario, delScenarioChessPiece, getMapCoordinateC, queryAllChessPiecesInfoC} from '@/api/scenarioCreate';
import {getMapChessImageC} from '@/api/scenarioCreate';
import {
  queryPrompt,
} from '@/api/verdictRecord';
import {getMapC} from "@/api/scenarioCreate";
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
import {queryMaparbiterMapId} from "@/api/scenarioCreate";
let vector;
export default {
  components: {NavBar},
  data() {
    return {
      mapInfo: {
        row: 99,
        col: 130
      },
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
      statusImageArray: ["ATTACK_MID", "ATTACK_MODERATE", "ATTACK_SEVERE", "REACTANCE_MID", "REACTANCE_MODERATE", "REACTANCE_SEVERE", "SCOUT_CONFIRM", "SCOUT_FIND", "SCOUT_RECOGNITION"],
      coordinateMap: {},
      imageArray: ['village', 'wood', 'bridge', 'city', 'shrub'],
      imageMap: undefined,
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
      mapChessArray: [],
      chessOnMapArray: [],
      value: undefined,
      scenarioList: [],
      diceAmount: '',
      piecesList: [],
      productId: '',
      verdictRecordId: '',
      scenarioId: '',
      user: {},
      menuIndex: 0,
      isNav: false,
      src: ''
    };
  },
  computed: {
    height() {
      return uni.getSystemInfoSync().windowHeight - 44;
    }
  },
  onLoad(option) {
    this.productId = option.productId;
    this.user = uni.getStorageSync('user');
    this.queryScenariosF();
  },
  methods: {
    preview() {
      uni.previewImage({
        loop: true,
        urls: [this.src], //可以展示imgUrl 列表中所有的图片
        current: 0 //首先当前index对应图片，左右可以切换其他序号的图片
      });
    },
    async Rev()
    {
      if(!this.arbiterMapId)
      {
        uni.showToast({
          title: '请选择想定',
          icon: 'none'
        });
        return;
      }
      this.mapId = this.arbiterMapId;
      if (!this.scenarioId) {
        console.log('scenarioId为空')
        uni.showToast({
          title: '请选择想定！',
          icon: 'none'
        });
        return;
      }
      if (!this.productId) {
        console.log('productId为空')
        uni.showToast({
          title: '请选择想定！',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url:
            '/pages/wargame/ScenarioGame?arbiterMapId=' +
            this.mapId +
            '&scenarioId=' +
            this.scenarioId +
            '&productId=' +
            this.productId
      });
    },
    async Del()
    {
      uni.showModal({
        title:'删除确认',
        content:'您确认删除该想定吗？',
        confirmText: '确定',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            // 用户点击了确定按钮
            console.log('用户点击了确定');
            // 在这里可以添加确认操作后的具体逻辑
            let data = {
              scenarioId : this.scenarioId
            }
            delScenario(data).then(() => {
              location.reload(); // 页面刷新操作
            });
          } else if (res.cancel) {}
        }
      })
    },
    createNewscenario() {
      uni.navigateTo({
        url: '/pages/chess-pieces/scenario?id=' + this.productId
      });
    },
    async queryMaparbiterMapId() {
      let data = {
        scenarioId: this.scenarioId
      };
      let res = await queryMaparbiterMapId(data);
      this.arbiterMapId = res.data.data;
    },
    async queryScenariosF() {
      let res = await queryScenarios();
      this.scenarioList = res.data.data.map((item) => ({
        value: item.id,
        name: item.scenarioName,
        chessPiecesIds: item.chessPiecesIds,
      }));
      this.scenarioId = this.scenarioList[0].value;
      await this.selectMenu(0); // 默认选择第一个选项并回传数据
    },
    async selectMenu(index) {
      this.menuIndex = index;
      this.scenarioId = this.scenarioList[index].value;
      console.log(this.scenarioId);
      this.chessPiecesIds = this.scenarioList[index].chessPiecesIds;
      await this.queryMaparbiterMapId();
      await this.init();
    },

    async init() {
      uni.showLoading({
        title: "地图数据加载中..."
      })
      let data = {
        scenarioId: this.arbiterMapId
      };
      getMapC(data).then((res) => {
        this.mapInfo.row = res.data.data.longitudinalDimension;
        this.mapInfo.col = res.data.data.transverseDimension;
      });
      let res = await getMapCoordinateC(data);
      this.coordinateMap = res.data.data;
      let chessIamgeData = {
        scenarioId: this.scenarioId
      };
      console.log("chessIamgeData:    ", chessIamgeData)
      let chessImageRes = await getMapChessImageC(chessIamgeData);
      this.mapChessImageMap = chessImageRes.data.data;
      await this.initImage();
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
      var layers = [];
      document.getElementById('map').innerHTML = '';
      if (this.map) {
        this.map.setTarget(null);
        this.map = null;
      }
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
      map.addLayer(new ImageLayer({source: hex}));
      hex.set('text', 'offset'); // axial cube offset
      hex.showCoordiantes('offset');
      var flowStyle = new FlowLine({
        color: 'red',
        color2: 'red',
        width: 8,
        width2: 8,
        _acolor: 'red',
        arrow: 1
      });

      function getStyle(feature, res) {
        return flowStyle;
      }

      vector = new VectorImageLayer({
        source: new VectorSource({features: new Collection()}),
        style: getStyle
      });
      map.addLayer(vector);
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
    },
    async queryAllFunc() {
      uni.hideLoading()
      // this.roundActive = this.game.chessRound;
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
      this.mapChessArray = [];
      for (let item of array) {
        if (item.offset) {
          const tmp = this.mapChessArray.find(function (ttt) {
            return item.offset === ttt.offset;
          });
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
  }
};
</script>

<style lang="scss">
#map {
  width: 100vw;
  height: 100vh;
  z-index: 998;
}

.uv-vtabs-item {
  display: flex;
  flex-direction: row;
}

.scenario__view {
  width: 720rpx;
  display: flex;
  margin-top: 10rpx;
  align-items: center;

  .scenario-select__view {
    width: 200rpx;
  }
}

.chess-pieces-list__scroll-view {
  width: 100%;
  padding-left: 10rpx;
  height: 90vh;
}

.chess-pieces-list__view {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10rpx;
}

.chess-pieces__btn {
  position: fixed;
  right: 20rpx;
  bottom: 20rpx;
  display: flex;

  .chess-pieces-all__btn,
  .chess-pieces-confirm__btn {
    width: 100rpx;
    margin: 0;
    color: $uni-text-color-inverse;
  }

  .chess-pieces-create__btn {
    background-color: $uni-color-primary;
  }

  .chess-pieces-all__btn {
    background-color: $uni-color-success;
  }

  .chess-pieces-confirm__btn {
    background-color: $uni-color-primary;
    margin-left: 10rpx;
  }
}
</style>
