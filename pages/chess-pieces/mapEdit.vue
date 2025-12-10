<template>
  <view class="xinyi-content">
    <view class="bottom-buttons">
      <button class="action-btn save-btn" @click="saveMap">保存</button>
      <button class="action-btn back-btn" @click="goBack">返回</button>
    </view>

    <view v-if="showTerrainMenu.visible"
          class="terrain-menu"
          :style="{ left: showTerrainMenu.left + 'px', top: showTerrainMenu.top + 'px' }">
      <view class="terrain-option" @click="selectTerrain('wood')">树林</view>
      <view class="terrain-option" @click="selectTerrain('city')">城市</view>
      <view class="terrain-option" @click="selectTerrain('clear')">清空</view>
    </view>

    <view id="map"></view>
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
  Vector as VectorLayer,
  VectorImage as VectorImageLayer,
  Image as ImageLayer
} from 'ol/layer.js';
import {defaults as defaultControls} from 'ol/control';
import {getMapCoordinateC, getMapC, updateMapTerrain} from '@/api/scenarioCreate';

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
      user: {},
      map: null,
      hex: null,
      grid: null,
      showTerrainMenu: {
        visible: false,
        top: 0,
        left: 0
      },
      selectedOffset: null,
      terrainMap: {} // 存储地形修改信息
    };
  },
  onLoad(option) {
    this.productId = option.productId;
    this.arbiterMapId = option.arbiterMapId;
    this.user = uni.getStorageSync('user');
    this.init();
  },
  methods: {
    saveMap() {
      // 暂时与返回按钮功能一致
      uni.navigateTo({
        url: '/pages/chess-pieces/mapView?productId=' + this.productId
      });
    },
    goBack() {
      uni.navigateTo({
        url: '/pages/chess-pieces/mapView?productId=' + this.productId
      });
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
      // 地图编辑页面不需要加载棋子图片
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
      // 地图编辑页面只需要地形图片，不需要棋子和状态图片
      that.initMap();
    },
    loadImage(src) {
      return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = src;
        img.onload = function () {
          resolve(img);
        };
        img.onerror = function () {
          reject(new Error('Image load failed'));
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
      
      var grid = new HexGrid({
        size: 200,
        origin: map.getView().getCenter(),
        row: this.mapInfo.row,
        col: this.mapInfo.col,
        coordinateMap: this.coordinateMap,
        imageMap: this.imageMap
      });
      this.grid = grid;
      var hex = new HexMap({hexGrid: grid});
      this.hex = hex;
      map.addLayer(new ImageLayer({source: hex}));
      hex.set('text', 'offset');
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
      
      uni.hideLoading();

      // 地图点击事件 - 显示地形编辑菜单
      map.on(['click'], function (e) {
        if (that.showTerrainMenu.visible) {
          that.showTerrainMenu.visible = false;
          return;
        }
        
        let ehex = grid.coord2hex(e.coordinate);
        var h = grid.hex2offset(ehex);
        that.selectedOffset = h;
        
        let pix = map.getPixelFromCoordinate(e.coordinate);
        let x = pix[0];
        let y = pix[1];
        
        // 获取六角格的点号
        let pointNumber = that.hex.hexToPointNumber(h[1], h[0], that.mapInfo.row, that.mapInfo.col);
        
        // 详细的点击信息输出
        console.log('========== 点击位置信息 ==========');
        console.log('原始坐标 (e.coordinate):', e.coordinate);
        console.log('像素坐标 (pixel):', { x: x, y: y });
        console.log('六角格坐标 (offset):', h);
        console.log('六角格坐标字符串:', JSON.stringify(h).slice(1, -1));
        console.log('六角格点号 (pointNumber):', pointNumber);
        console.log('当前地形信息:', that.coordinateMap[JSON.stringify(h).slice(1, -1)]);
        console.log('地图信息 (mapInfo):', that.mapInfo);
        console.log('完整点击对象:', {
          coordinate: e.coordinate,
          pixel: { x: x, y: y },
          offset: h,
          offsetKey: JSON.stringify(h).slice(1, -1),
          pointNumber: pointNumber,
          currentTerrain: that.coordinateMap[JSON.stringify(h).slice(1, -1)],
          mapInfo: that.mapInfo,
          arbiterMapId: that.arbiterMapId,
          productId: that.productId
        });
        console.log('================================');
        
        that.showTerrainMenu.top = y;
        that.showTerrainMenu.left = x;
        that.showTerrainMenu.visible = true;
      });
    },
    selectTerrain(terrain) {
      if (!this.selectedOffset) return;
      
      const offsetKey = JSON.stringify(this.selectedOffset).slice(1, -1);
      
      // 更新本地坐标地图
      if (terrain === 'clear') {
        // 清空地形
        if (this.coordinateMap[offsetKey]) {
          delete this.coordinateMap[offsetKey];
        }
      } else {
        // 设置地形
        this.coordinateMap[offsetKey] = terrain;
      }
      
      // 更新地图显示
      if (this.hex && this.hex.hexGrid) {
        this.hex.hexGrid.coordinateMap = this.coordinateMap;
        this.hex.changed();
      }
      
      this.showTerrainMenu.visible = false;
      
      // 调用后端接口更新地形
      this.updateTerrainToBackend(offsetKey, terrain);
    },
    async refreshMap() {
      try {
        uni.showLoading({
          title: '地图刷新中...',
          mask: true
        });
        
        // 重新获取地图坐标数据
        let data = {
          scenarioId: this.arbiterMapId
        };
        let res = await getMapCoordinateC(data);
        this.coordinateMap = res.data.data;
        
        // 移除旧的地图层
        if (this.map && this.hex) {
          this.map.removeLayer(this.hex);
        }
        
        // 重新创建六角格和地图层
        if (this.map && this.grid) {
          var hex = new HexMap({hexGrid: this.grid});
          this.hex = hex;
          this.grid.coordinateMap = this.coordinateMap;
          this.map.addLayer(new ImageLayer({source: hex}));
          hex.set('text', 'offset');
          hex.showCoordiantes('offset');
          console.log('地图已完全刷新，新的坐标数据:', this.coordinateMap);
        }
        
        uni.hideLoading();
      } catch (error) {
        uni.hideLoading();
        console.error('地图刷新失败:', error);
        uni.showToast({
          title: '地图刷新失败',
          icon: 'none'
        });
      }
    },
    async updateTerrainToBackend(offsetKey, terrain) {
      try {
        uni.showLoading({
          title: '保存中...',
          mask: true
        });
        
        const data = {
          arbiterMapId: this.arbiterMapId,
          coordinate: offsetKey,
          terrainType: terrain === 'clear' ? '' : terrain
        };
        
        console.log('发送地形修改请求:', data);
        
        const res = await updateMapTerrain(data);
        
        uni.hideLoading();
        
        if (res.data.code === 200) {
          uni.showToast({
            title: terrain === 'clear' ? '已清空' : '已修改',
            icon: 'none',
            duration: 1000
          });
          // 修改成功后刷新地图
          await this.refreshMap();
        } else {
          uni.showToast({
            title: res.data.msg || '修改失败',
            icon: 'none'
          });
        }
      } catch (error) {
        uni.hideLoading();
        console.error('地形修改错误:', error);
        uni.showToast({
          title: '修改失败，请重试',
          icon: 'none'
        });
      }
    }
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

.bottom-buttons {
  position: fixed;
  bottom: 30px;
  right: 30px;
  display: flex;
  gap: 20px;
  z-index: 1000;
}

.action-btn {
  width: auto;
  padding: 0 35px;
  height: 60px;
  line-height: 60px;
  background-color: #4cf5e3;
  color: #141829;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.action-btn:hover {
  background-color: #3dd4d1;
  color: white;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(76, 245, 227, 0.3);
}

.save-btn {
  background-color: #4cf5e3;
}

.back-btn {
  background-color: #4cf5e3;
}

.terrain-menu {
  position: fixed;
  background: rgba(0, 0, 0, 0.9);
  border: 2px solid #4cf5e3;
  border-radius: 8px;
  z-index: 1001;
  min-width: 120px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.terrain-option {
  padding: 12px 20px;
  color: #4cf5e3;
  font-size: 16px;
  cursor: pointer;
  border-bottom: 1px solid rgba(76, 245, 227, 0.2);
  white-space: nowrap;
  transition: all 0.3s ease;
}

.terrain-option:last-child {
  border-bottom: none;
}

.terrain-option:hover {
  background-color: rgba(76, 245, 227, 0.2);
  color: white;
}
</style>
