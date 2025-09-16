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
				<view class="game-card">
					<view class="card-overlay">
						<view class="card-header">
							<view class="header-left">
								<view class="game-title">兵棋推演对战</view>
								<view class="room-number">房间号: {{ item.inviteCode }}</view>
							</view>
							<view class="status-tag status-done">已完成</view>
						</view>

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
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
	gap: 30px;
	width: 100%;
	padding: 30px;
	max-width: 1600px;
	margin: 0 auto;
	.product-item {
		width: 100%;
		aspect-ratio: 1;
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

/* 游戏卡片样式 */
.game-card {
  background-image: url('./image/desk.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #f5f5f5;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  margin: 0;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 2px solid rgba(255, 255, 255, 0.3);
  width: 100%;
  aspect-ratio: 1;
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

.status-done {
  background: rgba(220, 235, 255, 0.95);
  color: #0c5460;
  border: 1px solid #a3d5ff;
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
