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
			
			<!-- <uni-card class="u-card" spacing="0" padding="10px" margin="10px" :style="{'background-image': `url(${item.coverUrl})`}"> -->
			<uni-card class="u-card" spacing="0" padding="15px" margin="15px" >
				<view style="height: 180rpx; width: 100%; text-align: center;" @click="showModal(item)">
					<view class="text-overlay">
						
						  <view class="font" v-if="item.firstUserName !== null " >{{ item.firstCampName }}操作员：{{ item.firstUserName }}</view>
						  <view class="font" v-else>1号操作员：等待加入ℹ️️</view>
						  
						  <view class="font" v-if="item.firstJudgeUserName !== null " >{{ item.firstCampName }}裁决员：{{ item.firstJudgeUserName }}</view>
						  <view class="font" v-else>1号裁决员：等待加入ℹ️️</view>

              <view class="font" v-if="item.firstCommanderUserName !== null " >{{ item.firstCampName }}指挥员：{{ item.firstCommanderUserName }}</view>
              <view class="font" v-else>1号指挥员：等待加入ℹ️️</view>
						  
						  <view class="font" v-if="item.secondUserName !== null " >{{ item.secondCampName }}操作员：{{ item.secondUserName }}</view>
						  <view class="font" v-else>2号操作员：等待加入️️️ℹ️</view>
						  
						  <view class="font" v-if="item.secondJudgeUserName !== null " >{{ item.secondCampName }}裁决员：{{ item.secondJudgeUserName }}</view>
						  <view class="font" v-else>2号裁决员：等待加入️️️ℹ️</view>

              <view class="font" v-if="item.secondCommanderUserName !== null " >{{ item.secondCampName }}指挥员：{{ item.secondCommanderUserName }}</view>
              <view class="font" v-else>2号指挥员：等待加入ℹ️️</view>
						  
												  
					  	  <view style="display: flex; flex-direction: column; font-size: 7.5rpx; color: black; font-weight: bold;">
							  <view style="font-size: 7.5rpx; color: black; font-weight: bold; padding-top: 30rpx;">推演创建时间：{{ item.createTime }}</view>
							  <view style="font-size: 7.5rpx; color: black; font-weight: bold; padding-top: 5rpx;">状态：{{item.status === 10 ? "未开始" : "进行中"}} | 房间号：{{ item.inviteCode }}</view>
					      </view>
					</view>
				</view>
			</uni-card>
		</view>
		
	</view>
		<uni-pagination
			class="page"
			:total="total"
			:current="queryParams.pageNum"
			@change="pageChange"
			:pageSize="queryParams.pageSize"
		></uni-pagination>
    <!-- 弹窗 -->
<!--    <uv-modal width="200" :title="`房间号：${currentItem.inviteCode}`" ref="isModalVisible">-->
<!--      <view class="modal-content">-->
<!--        <view class="product-item__btn" v-if="!isAdmin">-->
<!--          <button class="run__btn" v-if="currentItem.status === 10 &&-->
<!--						  (user.id === currentItem.firstUserId || user.id === currentItem.firstJudgeUserId-->
<!--						   || user.id === currentItem.secondUserId || user.id === currentItem.secondJudgeUserId)"-->
<!--                  @click="toRoom('3',currentItem)">进入房间</button>-->
<!--          <button class="init__btn" v-else-if="currentItem.status === 10" @click="toRoom('0',currentItem)" >组队</button>-->
<!--          <button class="run__btn" v-else-if="currentItem.status !== 10 &&-->
<!--						  (user.id === currentItem.firstUserId || user.id === currentItem.firstJudgeUserId-->
<!--						   || user.id === currentItem.secondUserId || user.id === currentItem.secondJudgeUserId)"-->
<!--                  @click="toRoom('1',currentItem)">进入战场</button>-->
<!--          <button class="watch__btn" v-else-if="currentItem.status !== 10" @click="toRoom('2',currentItem)">观战</button>-->
<!--        </view>-->
<!--      </view>-->
<!--    </uv-modal>-->
<!--		<uv-modal width="300" ref="camp" @confirm="chooseCamp()">-->
<!--			<view class="popup_view">-->
<!--				<view>请选择阵营：<uni-data-select v-model="campId" :localdata="campList"></uni-data-select></view>-->
<!--				<view>请选择角色：<uni-data-select v-model="userType" :localdata="typeList"></uni-data-select></view>-->
<!--			</view>-->
<!--		</uv-modal>-->

    <NjustPopup ref="isModalVisible">
      <view class="product-item__btn" v-if="!isAdmin">
        <button class="run__btn" v-if="currentItem.status === 10 &&
            (user.id === currentItem.firstUserId || user.id === currentItem.firstJudgeUserId
             || user.id === currentItem.secondUserId || user.id === currentItem.secondJudgeUserId
             || user.id === currentItem.firstCommanderUserId || user.id === currentItem.secondCommanderUserId)"
                @click="toRoom('3',currentItem)">进入房间</button>
        <button class="init__btn" v-else-if="currentItem.status === 10" @click="toRoom('0',currentItem)" >组队</button>
        <button class="run__btn" v-else-if="currentItem.status !== 10 &&
            (user.id === currentItem.firstUserId || user.id === currentItem.firstJudgeUserId
             || user.id === currentItem.secondUserId || user.id === currentItem.secondJudgeUserId
             || user.id === currentItem.firstCommanderUserId || user.id === currentItem.secondCommanderUserId)"
                @click="toRoom('1',currentItem)">进入战场</button>
        <button class="watch__btn" v-else-if="currentItem.status !== 10" @click="toRoom('2',currentItem)">观战</button>
      </view>
      <view style="height: 30px"></view>
    </NjustPopup>

    <NjustPopup ref="camp">
      <uni-data-select class="njust-select" v-model="campId" :localdata="campList"></uni-data-select>
      <uni-data-select class="njust-select" v-model="userType" :localdata="typeList"></uni-data-select>
      <button class="njust-button" @click="chooseCamp()">进入房间</button>
      <view style="height: 30px"></view>
    </NjustPopup>

		<!-- <uni-card margin="10rpx" v-for="(item, index) in VerdictRecordList" :key="index">
			<div>编号：{{ item.verdictRecordId }}</div>
			<div>{{ item.firstUserName }}-{{ item.firstCampName }}</div>
			<div>{{ item.secondUserName }}-{{ item.secondCampName }}</div>
		</uni-card> -->
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
			userType: 0,
			isAdmin: false,
			isUser: true,
			typeList: [
				{
					text: '操作员',
					value: 1
				},
				{
					text: '裁决员',
					value: 2
				},
        {
          text: '指挥员',
          value: 3
        }
			],
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
			// this.VerdictRecordList = rst.result.records;
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
      this.isModalVisible = true; // 显示弹窗
      this.currentItem = item;
      console.log(item)
    },
		toRoom(type,item){

      this.$refs.isModalVisible.close();

			this.currRecordId = item.verdictRecordId;
			this.inviteCode = item.inviteCode;
			let itemCampId = '';
			if(this.user.id === item.firstUserId || this.user.id === item.firstJudgeUserId || this.user.id === item.firstCommanderUserId){
				itemCampId = item.firstCampId;
			}else if(this.user.id === item.secondUserId || this.user.id === item.secondJudgeUserId || this.user.id === item.secondCommanderUserId){
				itemCampId = item.secondCampId;
			}
			switch (type) {
				case '0' :
           // this.$refs.camp.open();
				    // 开始推演
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
      if(this.campId === '' || this.userType === 0){
        uni.showToast({
          title: '请选择阵营和角色',
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
	display: flex;
	flex-direction: row;
	flex-wrap: wrap;
	width: 720rpx;
	.product-item {
		width: 144rpx;
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

.u-card{
  background-image: url(./image/desk.jpg);  // 背景图片
  background-size: cover;
    background-position: center;
    padding: 10px;
    margin: 10px;
  height: 230rpx;
}
/* 半透明遮罩层 */
.text-overlay {
  position: absolute; /* 让遮罩层完全覆盖父元素 */
  top: 0;
  left: 0;
  width: 100%; /* 覆盖父元素的宽度 */
  height: 100%; /* 覆盖父元素的高度 */
  background: rgba(255, 255, 255, 0.4); /* 半透明白色背景 */
  color: white;
}
.font{
  // font-size: 8rpx;
  font-size: 8rpx;
  color: black;
  font-weight: bold;
  margin-top: 20rpx;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.2); /* 添加文字阴影 */
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

</style>
