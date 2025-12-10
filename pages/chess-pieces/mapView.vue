<template>
  <view class="xinyi-content">
    <NavBar title="地图查看" right-text="退出登录" :user="user"></NavBar>
    <uv-vtabs
        style="width: 100vw"
        :chain="false"
        :list="mapList"
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
          <button class="chess-pieces-confirm__btn" @click="editMap">编辑地图</button>
          <button class="chess-pieces-confirm__btn" @click="goBack">返回</button>
        </view>
      </uv-vtabs-item>

    </uv-vtabs>
  </view>
</template>

<script>
import {getOssById} from '@/api/system.js';
import 'ol/ol.css';
import 'ol-ext/dist/ol-ext.css';
import 'ol-games/dist/ol-games.css';
import {Map, View, Collection} from 'ol';
import HexGrid from 'ol-ext/render/HexGrid.js';
import FlowLine from 'ol-ext/style/FlowLine.js';
import HexMap from 'ol-games/source/HexMap.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';
import {Vector as VectorSource} from 'ol/source.js';
import {
  Layer,
  Vector as VectorLayer,
  VectorImage as VectorImageLayer,
  Image as ImageLayer
} from 'ol/layer.js';
import {defaults as defaultControls} from 'ol/control';
import {getMapCoordinateC, getMapChessImageC, getMapC, queryMapByProductId} from '@/api/scenarioCreate';
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";

export default {
  components: {NavBar},
  data() {
    return {
      mapInfo: {
        row: 99,
        col: 130
      },
      statusImageArray: ["ATTACK_MID", "ATTACK_MODERATE", "ATTACK_SEVERE", "REACTANCE_MID", "REACTANCE_MODERATE", "REACTANCE_SEVERE", "SCOUT_CONFIRM", "SCOUT_FIND", "SCOUT_RECOGNITION"],
      coordinateMap: {},
      imageArray: ['village', 'wood', 'bridge', 'city', 'shrub'],
      imageMap: undefined,
      mapChessImageMap: {},
      mapList: [],
      productId: '',
      arbiterMapId: '',
      user: {},
      menuIndex: 0,
      map: null,
      hex: null
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
    this.queryMapsF();
  },
  methods: {
    editMap() {
      if (!this.arbiterMapId) {
        uni.showToast({
          title: '请选择地图',
          icon: 'none'
        });
        return;
      }
      uni.navigateTo({
        url:
            '/pages/chess-pieces/mapEdit?arbiterMapId=' +
            this.arbiterMapId +
            '&productId=' +
            this.productId
      });
    },
    goBack() {
      uni.navigateTo({
        url: '/pages/verdict/list?productId=' + this.productId + '&isAdmin=true&isUser=false'
      });
    },
    async queryMapsF() {
      let data = {
        productId: this.productId
      };
      let res = await queryMapByProductId(data);
      this.mapList = res.data.data.map((item) => ({
        value: item.id,
        name: item.mapName
      }));
      if (this.mapList.length > 0) {
        this.arbiterMapId = this.mapList[0].value;
        await this.selectMenu(0); // 默认选择第一个地图
      }
    },
    async selectMenu(index) {
      this.menuIndex = index;
      this.arbiterMapId = this.mapList[index].value;
      console.log(this.arbiterMapId);
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
      // 地图查看页面不需要加载棋子图片
      this.mapChessImageMap = {};
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
      this.map = map;
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

      var vector = new VectorImageLayer({
        source: new VectorSource({features: new Collection()}),
        style: getStyle
      });
      map.addLayer(vector);
    },
    async queryAllFunc() {
      uni.hideLoading()
      // 只显示地图，不渲染棋子
    }
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

.chess-pieces__btn {
  position: fixed;
  right: 20rpx;
  bottom: 20rpx;
  display: flex;

  .chess-pieces-confirm__btn {
    width: 100rpx;
    margin: 0;
    color: $uni-text-color-inverse;
    background-color: $uni-color-primary;
    margin-left: 10rpx;
  }
}
</style>
