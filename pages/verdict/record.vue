<template>
	<view class="xinyi-content">
		<NavBar title="历史记录" leftIcon="undo-filled" right-text="退出登录" :user="user"></NavBar>
		<view class="product-list__view">
			<view
				class="product-item"
				v-for="(item, index) in verdictRecordList"
				:key="index"
				@click="nativeTo(item.verdictRecordId)"
			>
        <uni-card class="u-card" spacing="0" padding="10px" margin="10px" >
          <view style="height: 180rpx; width: 100%; text-align: center;">
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

              <view class="font" v-if="item.secondCommanderUserName !== null " >{{ item.firstCampName }}指挥员：{{ item.secondCommanderUserName }}</view>
              <view class="font" v-else>1号指挥员：等待加入ℹ️️</view>


              <view style="display: flex; flex-direction: column; font-size: 7.5rpx; color: black; font-weight: bold;">
                <view style="font-size: 7.5rpx; color: black; font-weight: bold; padding-top: 30rpx;">推演创建时间：{{ item.createTime }}</view>
                <view style="font-size: 7.5rpx; color: black; font-weight: bold; padding-top: 5rpx;">状态：已完成 | 房间号：{{ item.inviteCode }}</view>
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
		<!-- <uni-card margin="10rpx" v-for="(item, index) in VerdictRecordList" :key="index">
			<div>编号：{{ item.verdictRecordId }}</div>
			<div>{{ item.firstUserName }}-{{ item.firstCampName }}</div>
			<div>{{ item.secondUserName }}-{{ item.secondCampName }}</div>
		</uni-card> -->
	</view>
</template>

<script>
import { getOssById } from '@/api/system.js';
import { queryVerdictRecordList } from '../../api/verdictRecord.js';
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
export default {
  components: {NavBar},
	data() {
		return {
			verdictRecordList: [],
			queryParams: {
				pageSize: 10,
				pageNum: 1,
				productId: ''
			},
			total: 0,
      user: {},
		};
	},
	onLoad(option) {
    this.user = uni.getStorageSync('user');
		if (option.productId) {
			this.queryParams.productId = option.productId;
		}
		this.queryVerdictRecordListFunc();
	},
	methods: {
		async queryVerdictRecordListFunc() {
			this.verdictRecordList = [];
			let res = await queryVerdictRecordList(this.queryParams);
			console.log('res: ', res);
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
		nativeTo(val) {
			uni.navigateTo({
				url: '/pages/verdict/detail-v2?id=' + val
			});
		},
		pageChange(e) {
			console.log('e: ', e);
			this.queryParams.pageNum = e.current;
			this.queryVerdictRecordListFunc();
		}
	}
};
</script>

<style lang="scss" scoped>
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

.u-card{
  background-image: url(./image/desk.jpg);  // 背景图片
  background-size: cover;
  background-position: center;
  padding: 10px;
  margin: 10px;
  height: 180rpx;
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
  font-size: 8rpx;
  color: black;
  font-weight: bold;
  margin-top: 20rpx;
  text-shadow: 1rpx 1rpx 2rpx rgba(0, 0, 0, 0.2); /* 添加文字阴影 */
}
</style>
