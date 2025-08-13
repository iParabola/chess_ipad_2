<template>
 <view class="xinyi-content">
  <NavBar title="实时推演" leftIcon="undo-filled" right-text="退出登录" :user="user"></NavBar>
  <view class="create-new" v-if="isAdmin">
   <button class="create-new-button" @click="createOne" v-if="isAdmin">创建新的推演</button>
      <button class="create-new-button2" @click="toEdit">查看想定</button>
  </view>

  <view class="product-list__view">
   <view
    class="product-item"
    v-for="(item, index) in verdictRecordList"
    :key="index"
    @click="nativeTo(item)"
   >

   <view class="game-card" @click="showModal(item)">
     <!-- 半透明遮罩层 -->
     <view class="card-overlay">
       <!-- 卡片头部 -->
       <view class="card-header">
         <view class="header-left">
           <view class="game-title">兵棋推演对战</view>
           <view class="room-number">房间号: {{ item.inviteCode }}</view>
         </view>
         <view class="status-tag" :class="item.status === 10 ? 'status-pending' : 'status-active'">
           {{ item.status === 10 ? "未开始" : "进行中" }}
         </view>
       </view>

       <!-- 对战双方 -->
       <view class="battle-section">
         <view class="team red-team">
           <view class="team-name">{{ item.firstCampName }}</view>
           <view class="player-info">
             <view class="player-name" v-if="item.firstUserName">{{ item.firstUserName }}</view>
             <view class="waiting-text" v-else>等待加入</view>
           </view>
         </view>

         <view class="vs-text">VS</view>

         <view class="team blue-team">
           <view class="team-name">{{ item.secondCampName }}</view>
           <view class="player-info">
             <view class="player-name" v-if="item.secondUserName">{{ item.secondUserName }}</view>
             <view class="waiting-text" v-else>等待加入</view>
           </view>
         </view>
       </view>

       <!-- 游戏信息 -->
       <view class="game-info">
         <view class="info-item">
           <text class="info-icon">🕒</text>
           <text class="info-text">创建时间: {{ item.createTime }}</text>
         </view>
       </view>
     </view>
   </view>
  </view>

 </view>
  <uni-pagination
   class="page"
   :total="total"
   :current="queryParams.pageNum"
   @change="pageChange"
   :pageSize="queryParams.pageSize"
  ></uni-pagination>

    <NjustPopup ref="isModalVisible">
      <view class="product-item__btn" v-if="!isAdmin">
        <button class="run__btn" v-if="currentItem.status === 10 &&
            (user.id === currentItem.firstUserId || user.id === currentItem.secondUserId)"
                @click="toRoom('3',currentItem)">进入房间</button>
        <button class="init__btn" v-else-if="currentItem.status === 10" @click="toRoom('0',currentItem)" >组队</button>
        <button class="run__btn" v-else-if="currentItem.status !== 10 &&
            (user.id === currentItem.firstUserId || user.id === currentItem.secondUserId)"
                @click="toRoom('1',currentItem)">进入战场</button>
        <button class="watch__btn" v-else-if="currentItem.status !== 10" @click="toRoom('2',currentItem)">观战</button>
      </view>
      <view style="height: 30px"></view>
    </NjustPopup>

    <NjustPopup ref="camp">
      <uni-data-select class="njust-select" v-model="campId" :localdata="campList"></uni-data-select>
      <button class="njust-button" @click="chooseCamp()">进入房间</button>
      <view style="height: 30px"></view>
    </NjustPopup>

 </view>
</template>

<script>
import { getOssById } from '@/api/system.js';
import { queryUnfinishedList } from '@/api/verdictRecord';
import { joinRoom, queryCampList, chooseCamp } from '@/api/room.js';
import { initWebSocket, sendMsg } from '@/api/websocket.js';
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
import NjustPopup from "@/uni_modules/njust-popup/njust-popup.vue";
export default {
  components: {NjustPopup, NavBar},
 data() {
  return {
   verdictRecordList: [],
   campList:[],
   user: {},
   currRecordId:'',
   inviteCode: '',
   campId: '',
   userType: 1, // 固定为操作员
   isAdmin: false,
   isUser: true,
   queryParams: {
    pageSize: 10,
    pageNum: 1,
    productId: ''
   },
   total: 0,

      isModalVisible: false,
      currentItem : '',
  };
 },
 onLoad(option) {
  initWebSocket();
  this.user = uni.getStorageSync('user');
  console.log(option)
  if (option.productId) {
   this.queryParams.productId = option.productId;
  }
  if(option.isAdmin){
   this.isAdmin = JSON.parse(option.isAdmin);
  }
  if(option.isUser){
   this.isUser = JSON.parse(option.isUser);
  }
  this.queryVerdictRecordListFunc();
 },
 methods: {
  async queryVerdictRecordListFunc() {
   this.verdictRecordList = [];
      console.log('this.queryParams: ', this.queryParams);
   let res = await queryUnfinishedList(this.queryParams);
   console.log('res: ', res);
      console.log('res.data.data.rows: ', res.data.data.rows);
   this.verdictRecordList = res.data.data.rows;
   this.total = res.data.data.total;
   this.verdictRecordList.forEach(async (item) => {
    if (item.cover) {
     let oss = await getOssById(item.cover);
     let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
     this.$set(item, 'coverUrl', coverUrl);
    }
   });
  },
  nativeTo(item) {
   if(!this.isAdmin) return;
   let status = item.status;
   if(status === 10){
    uni.navigateTo({
     url:
      '/pages/room/create?inviteCode=' +
      item.inviteCode +
      '&verdictRecordId=' +
      item.verdictRecordId +
      '&isAdmin=' + this.isAdmin
    });
   }else{
    uni.navigateTo({
     url:
      '/pages/wargame/index-v2?verdictRecordId=' +
      item.verdictRecordId +
      '&isUser=' +
      this.isUser +
      '&campId=' +
      item.campId
    });
   }
  },
    toEdit()
    {
      uni.navigateTo({
        url: '/pages/chess-pieces/scenarioEdit?productId=' + this.queryParams.productId
      });
    },

  pageChange(e) {
   console.log('e: ', e);
   this.queryParams.pageNum = e.current;
   this.queryVerdictRecordListFunc();
  },
  createOne(){
      console.log('create')
   uni.navigateTo({
    url: '/pages/chess-pieces/select?id=' + this.queryParams.productId
   });
  },
    showModal(item){
      if (this.isAdmin) return
      this.$refs.isModalVisible.open();
      this.isModalVisible = true;
      this.currentItem = item;
      console.log(item)
    },
  toRoom(type,item){

      this.$refs.isModalVisible.close();

   this.currRecordId = item.verdictRecordId;
   this.inviteCode = item.inviteCode;
   let itemCampId = '';
   if(this.user.id === item.firstUserId){
    itemCampId = item.firstCampId;
   }else if(this.user.id === item.secondUserId){
    itemCampId = item.secondCampId;
   }
   switch (type) {
    case '0' :
        queryCampList({ verdictRecordId: item.verdictRecordId })
         .then((res) => {
                console.log(res)
          this.campList = res.data.data;
          this.campList.forEach((item) => {
           item.text = item.name;
           item.value = item.id;
          });
                this.$refs.camp.open();
         })
         .catch((err) => {});
        break;
    case '1' :
        uni.navigateTo({
         url:
          '/pages/wargame/index-v2?verdictRecordId=' +
          this.currRecordId +
          '&isUser=' +
          !this.isAdmin +
          '&campId=' +
          itemCampId
        });
        break;
    case '2' :
        sendMsg(JSON.stringify({ action: 'watchJoinRoom', verdictRecordId: this.currRecordId }));
        uni.navigateTo({
         url: '/pages/wargame/index-v2?verdictRecordId=' + this.currRecordId + '&type=watch'
        });
        break;
        case '3' :
            uni.navigateTo({
              url:
                  '/pages/room/create?inviteCode=' +
                  this.inviteCode +
                  '&verdictRecordId=' +
                  this.currRecordId +
                  '&campId=' +
                  itemCampId
            });
   }
  },
  chooseCamp() {
      if(this.campId === ''){
        uni.showToast({
          title: '请选择阵营',
          icon: 'none'
        })
        return;
      }
   chooseCamp({ id: this.campId, verdictRecordId: this.currRecordId, userType: this.userType })
    .then((res) => {
          console.log(res)
     if (res.data.code === 200) {
      uni.navigateTo({
       url:
        '/pages/room/create?inviteCode=' +
        this.inviteCode +
        '&verdictRecordId=' +
        this.currRecordId +
        '&campId=' +
        this.campId
      });
     }
          else {
            uni.showToast({
              title: res.data.msg,
              icon: 'none'
            })
          }
    })
    .catch((err) => {});
  },
 }
};
</script>

<style lang="scss" scoped>
.create-new{
  position: absolute;
  height: 10vh;
  line-height: 10vh;
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-left: -10%;
}
.create-new-button{
  width: 15%;
  margin-left: 62%;
  height: 6vh;
  line-height: 6vh;
  margin-top: 2vh;
  background-color: #4cf5e3;;
  font-size: 24px;
  color: #141829;
  z-index: 999;
}
.create-new-button2{
  width: 10%;
  height: 6vh;
  line-height: 6vh;
  margin-top: 2vh;
  margin-left: -15vh;
  background-color: #4cf5e3;;
  font-size: 24px;
  color: #141829;
  z-index: 999;
}
.create-new-button2:hover{
  color: white;
}
.create-new-button:hover{
  color: white;
}
.product-list__view {
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	gap: 30px;
	width: 100%;
	padding: 30px;
	max-width: 1600px;
	margin: 0 auto;

	.product-item {
		width: 100%;
		aspect-ratio: 1; /* 强制正方形 */
		.product-cover__image {
			width: 100rpx;
			height: 100rpx;
			margin-left: 11rpx;
		}
		.product-name__view {
			text-align: center;
		}
	}
}

.page {
	position: fixed;
	bottom: 10px;
}

.product__btn {
	display: flex;
	justify-content: space-between;
	margin-top: 20px;
	.product-rule__btn,
	.product-judge__btn,
	.product-history__btn {
		width: 200rpx;
		margin: 0;
		color: $uni-text-color-inverse;
	}
	.product-rule__btn {
		background-color: $uni-color-warning;
	}
	.product-judge__btn {
		background-color: $uni-color-success;
	}
	.product-history__btn {
		background-color: $uni-color-primary;
	}
}

.product-item__btn {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
	.run__btn {
		background-color: $uni-color-primary;
		color: white;
	}
	.init__btn  {
		background-color: $uni-color-success;
		color: white;
	}
	.watch__btn {
		background-color: $uni-color-success;
		color: white;
	}
}


.popup_view {
	width: 80%;
	min-height: 230px;
	display: flex;
	flex-direction: column;
  line-height: 40px;
	flex: 1;
	//align-items: center;
	//justify-content: center;
}

/* 游戏卡片样式 */
.game-card {
  background-image: url('./image/desk.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f5f5f5; /* 备用背景色 */
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  aspect-ratio: 1; /* 正方形比例 */
  position: relative;
  overflow: hidden;
}

.game-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  border-color: #4a90e2;
}

/* 半透明遮罩层 */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.6) 0%, rgba(255, 255, 255, 0.4) 100%);
  backdrop-filter: blur(1px);
  padding: 32px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

/* 卡片头部 */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
}

.header-left {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.game-title {
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  text-shadow: 0 2px 4px rgba(255, 255, 255, 0.8);
  margin: 0;
}

.room-number {
  font-size: 20px;
  font-weight: 700;
  color: #8e44ad;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 16px;
  border-radius: 25px;
  border: 2px solid rgba(142, 68, 173, 0.4);
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
  display: inline-block;
}

.status-tag {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
}

.status-pending {
  background: rgba(255, 243, 205, 0.95);
  color: #856404;
  border: 1px solid #ffeaa7;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.status-active {
  background: rgba(212, 237, 218, 0.95);
  color: #155724;
  border: 1px solid #00b894;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

/* 对战区域 */
.battle-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 30px 0;
  padding: 24px;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 16px;
  backdrop-filter: blur(2px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.team {
  flex: 1;
  text-align: center;
}

.red-team .team-name {
  color: #e74c3c;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}

.blue-team .team-name {
  color: #3498db;
  font-weight: 600;
  font-size: 16px;
  margin-bottom: 8px;
}

.player-name {
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  padding: 10px 18px;
  border-radius: 25px;
  font-size: 15px;
  font-weight: 600;
  border: 2px solid rgba(52, 152, 219, 0.4);
  display: inline-block;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.waiting-text {
  color: #e74c3c;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 18px;
  background: rgba(255, 255, 255, 0.85);
  border-radius: 25px;
  border: 2px dashed rgba(231, 76, 60, 0.5);
  display: inline-block;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.vs-text {
  font-size: 22px;
  font-weight: 700;
  color: #2c3e50;
  margin: 0 24px;
  background: rgba(255, 255, 255, 0.9);
  padding: 12px 20px;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border: 3px solid rgba(52, 152, 219, 0.3);
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}
/* 游戏信息区域 */
.game-info {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-top: 16px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
}

.info-item {
  display: flex;
  align-items: center;
  color: #7f8c8d;
  font-size: 14px;
  background: rgba(255, 255, 255, 0.8);
  padding: 8px 16px;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.info-icon {
  margin-right: 8px;
  font-size: 16px;
}

.info-text {
  color: #2c3e50;
  font-weight: 500;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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
  margin-top: 20px;
  //margin-bottom: 10%;
  height: 35px;
  line-height: 35px;
  background-color: #4cf5e3;
  border-radius: 5px;
  border: 1px solid #1cade4;
  color: black;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .product-list__view {
    grid-template-columns: 1fr;
    padding: 20px;
    gap: 20px;
  }

  .card-overlay {
    padding: 20px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .room-number {
    font-size: 18px;
    padding: 6px 14px;
  }

  .battle-section {
    flex-direction: column;
    gap: 16px;
    margin: 20px 0;
    padding: 16px;
  }

  .vs-text {
    margin: 12px 0;
    font-size: 18px;
    padding: 10px 16px;
  }

  .game-info {
    margin-top: 16px;
  }
}

@media (min-width: 1200px) {
  .product-list__view {
    grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  }
}

@media (min-width: 1600px) {
  .product-list__view {
    grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
    max-width: 1800px;
  }
}

</style>
