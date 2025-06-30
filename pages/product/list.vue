<template>
    <view class="xinyi-content">
        <NavBar title="兵棋模式" leftIcon="undo-filled" right-text="退出登录" :user="user"></NavBar>

        <view class="product-list__view">
            <view class="product-item" v-for="(item, index) in productList" :key="index" @click="toDetail(item.id)">
                <uni-card class="u-card" spacing="0" padding="10px" margin="10px" >
                  <view style="height: 200rpx; width: 100%; text-align: center;">
                    <view class="text-overlay">
                      <view class="product-name__view">{{ item.productName }}</view>
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
    </view>
</template>

<script>
import { getOssById } from '@/api/system.js';
import { queryArmoryList } from '@/api/product.js';
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
export default {
  components: {NavBar},
    data() {
        return {
            queryParams: {
                pageSize: 10,
                pageNum: 1
            },
            total: 0,
            productList: [],
            user: {},
        };
    },
    onLoad() {
        this.user = uni.getStorageSync('user');
        this.queryArmoryList();
    },
    methods: {
        pageChange(e) {
            console.log('e: ', e);
            this.queryParams.pageNum = e.current;
            this.queryArmoryList();
        },
        async queryArmoryList() {
            this.productList = [];
            console.log(11)
            let res = await queryArmoryList(this.queryParams);
            this.productList = res.data.rows;
            for (const item of this.productList) {
                if (item.cover) {
                    let oss = await getOssById(item.cover);
                    console.log(oss)
                    let coverUrl = ''
                    if (oss.data.data !== null){
                      coverUrl = this.baseOssIpPort + oss.data.data.fileName;
                    }
                    this.$set(item, 'coverUrl', coverUrl);
                }
            }
            console.log(this.productList)
            this.total = res.data.total;
        },
        back() {
            uni.navigateBack();
        },
        toDetail(id) {
            uni.navigateTo({
                url: '/pages/product/detail?id=' + id
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.product-list__view {
    display: flex;
    flex-wrap: wrap;
    width: 720rpx;
    .product-item {
        .product-cover__image {
            width: 120rpx;
            height: 120rpx;
        }
        .product-name__view {
            text-align: center;
			padding-bottom: 70rpx;
			color: black;
        }
    }
}

.page {
    position: fixed;
    bottom: 10px;
}
.u-card{
  background-image: url(./image/huolizhan.jpg);
  background-size: cover;
    background-position: center;
    padding: 10px;
    margin: 10px;
  height: 200rpx;
  // height: 180rpx;
  width: 135rpx;
}
/* 半透明遮罩层 */
.text-overlay {
  position: absolute; /* 让遮罩层完全覆盖父元素 */
  top: 0;
  left: 0;
  width: 100%; /* 覆盖父元素的宽度 */
  height: 100%; /* 覆盖父元素的高度 */
  background: rgba(0, 0, 0, 0.2); /* 半透明白色背景 */
  color: white;
  display: flex;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  writing-mode: vertical-rl; /* 设置文字竖排，从右到左 */
  text-orientation: upright; /* 让文字保持直立 */
  font-size: 36px; /* 可根据需要调整字体大小 */
  font-weight: bold;
}
</style>
