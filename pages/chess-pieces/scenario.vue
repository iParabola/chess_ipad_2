<template xmlns="">
  <view class="xinyi-content">
    <NavBar title="棋子选择" right-text="退出登录" :user="user"></NavBar>
    <uv-vtabs
        style="width: 100vw"
        :chain="false"
        :list="scenarioList"
        :barWidth="0"
        :height="height"
        @change="selectMenu"
        barBgColor="#141829"

        :barItemStyle="{ fontSize: '20px', color: '#4cf5e3' }"
        :barItemActiveStyle="{ fontSize: '20px', color: '#141829' }"
        :contentStyle="{ backgroundColor: '#141829' }"
    >
      <uv-vtabs-item>

        <scroll-view scroll-y class="chess-pieces-list__scroll-view">
          <view class="chess-pieces-list__view">
            <xinyi-data-checkbox
                ref="xinyiDataCheck"
                mode="tag"
                multiple
                v-model="checkSelect"
                :localdata="piecesList"
                :map="{ text: 'chessPiecesName', value: 'id' }"
                selectedColor="#4CD964"
            ></xinyi-data-checkbox>
          </view>
        </scroll-view>
        <view class="chess-pieces__btn">
          <button class="chess-pieces-all__btn" @click="selectAll()">
            {{ allSelect ? '取消全选' : '全选' }}
          </button>
          <button class="chess-pieces-confirm__btn" @click="open">创建想定</button>
          <NjustPopup ref="product" type="center" border-radius="10px">
              <uni-easyinput class="inputx" v-model="ScenarioName" placeholder="请输入想定名称" />
              <uni-easyinput class="inputx" v-model="chessRoundLimit" placeholder="请输入回合数" />
              <uni-data-select class="njust-select" placeholder="请选择地图" v-model="arbiterMapId" :localdata="mapList"></uni-data-select>
            <view class="button-container">
              <button class="njust-button" @click="cancel">取消</button>
              <button class="njust-button" @click="toEdit">确认</button>
            </view>
            <view style="height: 30px"></view>
          </NjustPopup>
        </view>
      </uv-vtabs-item>
    </uv-vtabs>



  </view>
</template>

<script>
import {getOssById} from '@/api/system.js';
import {queryVerdictScenarioVos} from '@/api/scenario';
import {queryVerdictChessPiecesVos} from '@/api/chessPieces';

import {generateInviteCode} from '@/api/room.js';
import {createScenario, getMapChessImageC, getMapCoordinateC, queryMapByProductId} from "@/api/scenarioCreate";
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
import NjustPopup from "@/uni_modules/njust-popup/njust-popup.vue";

export default {
  components: {NjustPopup, NavBar},
  data() {
    return {
      value: undefined,
      scenarioList: [],
      diceAmount: '',
      piecesList: [],
      productId: '',
      checkSelect: [],
      scenarioId: '',
      allSelect: false,
      user: {},
      menuIndex: 0,
      isNav: false,
      src: '',
      ScenarioName: '',
      isModalVisible: false,
      arbiterMapId: '',
      selectedMapId: '',
      mapList:[],
      chessRoundLimit:''
    };
  },
  computed: {
    height() {
      return uni.getSystemInfoSync().windowHeight - 44;
    }
  },
  onLoad(option) {
    this.productId = option.id;
    this.user = uni.getStorageSync('user');
    this.queryVerdictChessPiecesVosFunc();
  },
  methods: {
    preview() {
      uni.previewImage({
        loop: true,
        urls: [this.src], //可以展示imgUrl 列表中所有的图片
      });
    },
    async queryVerdictScenarioVosFunc() {
      let data = {
        id: this.productId
      };
      let res = await queryVerdictScenarioVos(data);
      this.scenarioList = res.data.data.map((item) => ({
        value: item.id,
        name: item.scenarioNumber,
        cover: item.cover
      }));
      this.scenarioId = this.scenarioList[0].value;
      if (this.scenarioList[0].cover) {
        let oss = await getOssById(this.scenarioList[0].cover);
        this.src = this.baseOssIpPort + oss.data.data.fileName;
      }
    },
    queryMapIdFunc() {
      let data = {
        productId: this.productId
      };
      queryMapByProductId(data).then((res) => {
        console.log(res);
        if(res.data.code === 200) {
          this.mapList = res.data.data;
          this.mapList.forEach((item) => {
            item.text = item.mapName;
            item.value = item.id;
          });
        }
      });
    },
    async queryVerdictChessPiecesVosFunc() {
      let data = {
        id: this.productId
      };
      let res = await queryVerdictChessPiecesVos(data);
      this.piecesList = res.data.data;
      for (const item of this.piecesList) {
        if (item.chessPiecesCover) {
          let oss = await getOssById(item.chessPiecesCover);
          let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
          this.$set(item, 'coverUrl', coverUrl);
        }
      }
    },
    async selectMenu(index) {
      this.menuIndex = index;
      this.scenarioId = this.scenarioList[index].value;
      if (this.scenarioList[index].cover) {
        let oss = await getOssById(this.scenarioList[index].cover);
        let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
        this.src = coverUrl;
      } else {
        this.src = '';
      }
    },
    selectAll() {
      this.checkSelect = [];
      this.allSelect = !this.allSelect;
      this.$refs.xinyiDataCheck.allSelectFunc(this.allSelect);
    },

    open() {
      this.queryMapIdFunc();
      this.$refs.product.open();
    },
    cancel() {
      this.$refs.product.close();
    },

    updateArbiterMapId() {
      this.arbiterMapId = this.selectedMapId;
      console.log(this.arbiterMapId) ;
    },

    async toEdit() {

      if(!this.ScenarioName)
      {
        uni.showToast({
          title: '请输入想定名称！',
          icon: 'none'
        });
        return;
      }
      if(!this.chessRoundLimit)
      {
        uni.showToast({
          title: '请输入回合数！',
          icon: 'none'
        });
        return;
      }
      if (!this.arbiterMapId) {
        uni.showToast({
          title: '请选择地图！',
          icon: 'none'
        });
        return;
      }

      let chessPiecesIds = '';
      this.checkSelect &&
      this.checkSelect.map((item, index) => (chessPiecesIds += index == 0 ? item : ',' + item));
      if (chessPiecesIds == '') {
        uni.showToast({
          title: '请选择棋子！',
          icon: 'none'
        });
        return;
      }
      uni.showLoading({
        title: '加载中...',
        mask: true
      });

      console.log(this.arbiterMapId);
      let data =
          {
            scenarioName: this.ScenarioName,
            chessPiecesIds: chessPiecesIds,
            productId: this.productId,
            arbiterMapId: this.arbiterMapId,
            chessRoundLimit: this.chessRoundLimit
          }

      let rst = await createScenario(data);
      this.scenarioId = rst.data.data.id;
      this.mapId = this.arbiterMapId;

      uni.hideLoading();
      uni.navigateTo({
        url:
            '/pages/wargame/ScenarioGame?arbiterMapId=' +
            this.mapId +
            '&scenarioId=' +
            this.scenarioId +
            '&productId=' +
            this.productId
      });
    }
  }
};
</script>

<style lang="scss">
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
  .popup-content {
    padding: 20px;
    text-align: center;
    background-color: #2d5c25;
    opacity: 1;
  }
  .popup-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }
  .popup-buttons button
  {
    width: 80px;
    padding: 0.3em;
    background-color: #2979ff;
    color: #ffffff;
    border: none;
    border-radius: 5px;
  }
  .popup-content input
  {
    padding: 0.5em;
    background-color: #FFFFFF;
    color: #000000;
    border: none;
    border-radius: 5px;
  }
  .popup-select
  {
    background-color: #FFFFFF;
    color: #000000;
    border: none;
    border-radius: 5px;
  }
  .inputx
  {
    width: 80%;
    margin-left: 10%;
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
  }
  .popup_view {
    width: 80%;
    min-height: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1cade4;
  }
  .njust-select{
    width: 80%;
    margin-left: 10%;
    margin-top: 20px;
    background-color: white;
    border-radius: 5px;
  }
  .njust-button{
    width: 80%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 20px;
    height: 40px;
    line-height: 40px;
    background-color: #4cf5e3;
    border-radius: 5px;
    border: 1px solid #1cade4;
    color: black;
  }
  .button-container {
    display: flex;
    justify-content: space-between;
  }
}
</style>
