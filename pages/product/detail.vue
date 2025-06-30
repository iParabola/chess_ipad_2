<template>
    <view class="xinyi-content">
        <NavBar :title="'《' + productInfo.productName + '》兵棋主页'" leftIcon="undo-filled" right-text="退出登录" :user="user"></NavBar>
        <view class="product-item__view">
            <view class="product-top__view">
                <image :src="productInfo.coverUrl" class="product-cover__image" mode="aspectFit"></image>
                <view class="product-title__view">
                    <view>名称：{{ productInfo.productName }}</view>
                    <view>作者：{{ productInfo.productAuthor }}</view>
                    <view>出版单位：{{ productInfo.publicInstitution }}</view>
                </view>
            </view>

            <view class="product-instruction__view">{{ productInfo.instruction }}</view>
            <view class="product__btn">
                <button class="product-rule__btn" @click="showPopup()">规则详情</button>
                <button class="product-judge__btn" @click="to(0)">实时对抗</button>
                <button class="product-history__btn" @click="to(1)">历史查询</button>
            </view>
        </view>
        <uni-popup ref="popup" type="center">
            <view class="popup-rule__view">
                <uni-icons type="close" size="32" @click="closePopup" class="popup-rule__icon"></uni-icons>
                <view>
                    <view class="popup-rule-title__view">规则详情</view>
                    <view>
                        {{ productInfo.rule }}
                    </view>
                </view>
            </view>
        </uni-popup>
    </view>
</template>

<script>
import { getOssById } from '@/api/system.js';
import { queryArmoryDetail } from '../../api/product.js';
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
export default {
  components: {NavBar},
    data() {
        return {
            id: undefined,
            productInfo: {},
            user: {},
        };
    },
    onLoad(option) {
        this.user = uni.getStorageSync('user');
        this.id = option.id;
        this.queryArmoryDetail();
    },
    methods: {
        async queryArmoryDetail() {
            let res = await queryArmoryDetail({ id: this.id });
            this.productInfo = res.data.data;
            if (this.productInfo.cover) {
                let oss = await getOssById(this.productInfo.cover);
                let coverUrl = this.baseOssIpPort + oss.data.data.fileName;
                this.$set(this.productInfo, 'coverUrl', coverUrl);
            }
            console.log(this.productInfo)
        },
        showPopup() {
            this.$refs.popup.open();
        },
        closePopup() {
            this.$refs.popup.close();
        },
        to(index) {
            switch (index) {
                case 0:
                    // 棋子选择
                    // uni.navigateTo({
                    // 	url: '/pages/chess-pieces/select?id=' + this.productInfo.id
                    // });

                    // 实时推演
					          console.log(this.productInfo)
                    uni.navigateTo({
                        url: '/pages/verdict/list?productId=' + this.productInfo.id
                            + '&isAdmin=true&isUser=false'
                    });
                    break;
                case 1:
                    // 裁决记录
                    uni.navigateTo({
                        url: '/pages/verdict/record?productId=' + this.productInfo.id
                    });
                    break;
                default:
                    break;
            }
        }
    }
};
</script>

<style lang="scss">
.product-item__view {
    display: flex;
    flex-direction: column;
    width: 690rpx;
    .product-top__view {
        display: flex;
        margin-top: 20rpx;
        .product-cover__image {
            width: 120rpx;
            height: 120rpx;
        }
        .product-title__view {
            display: flex;
            flex-direction: column;
            font-size: $uni-font-size-title;
            color: $uni-text-color-inverse;
            line-height: 40px;
            margin-left: 10rpx;
        }
    }
    .product-instruction__view {
        height: 30vh;
        background-color: #171744;
        color: $uni-text-color-inverse;
        padding: 10rpx;
        margin-top: 10rpx;
        border-radius: 10rpx;
    }
    .product__btn {
        display: flex;
        justify-content: space-between;
        margin-top: 20rpx;
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
}
.popup-rule__view {
    width: 60vw;
    height: 66vh;
    padding: 10rpx;
    background-color: $uni-bg-color;
    border-radius: 10rpx;
    position: relative;
    .popup-rule__icon {
        position: absolute;
        right: 5px;
        top: 5px;
    }
    .popup-rule-title__view {
        text-align: center;
        margin-bottom: 10rpx;
    }
}
</style>
