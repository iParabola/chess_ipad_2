<template>
    <view class="xinyi-content">
        <NavBar title="模式选择" right-text="退出登录" :user="user"></NavBar>
        <view class="mode-btn__view" v-if="user.permission === 'admin'">
            <view class="new-game__view" @click="to(3)">
                <text>推演大厅</text>
            </view>
            <view class="review__view" @click="to(1)">
                <text>历史复盘</text>
            </view>
        </view>
        <view class="mode-btn__view" v-else>
            <view class="new-game__view" @click="to(2)">
                <text>立即推演</text>
            </view>
            <view class="observe__view" @click="to(3)">
                <text>推演大厅</text>
            </view>
<!--            <view class="review__view" @click="to(1)">-->
<!--                <text>历史复盘</text>-->
<!--            </view>-->
        </view>
        <uv-modal width="200" ref="room" @confirm="joinRoom()" title="加入房间">
            <view>
                <uni-easyinput v-model="inviteCode" placeholder="请输入房间号"></uni-easyinput>
            </view>
        </uv-modal>
        <uv-modal width="300" ref="camp" @confirm="chooseCamp()">
            <view class="popup_view">
                <view>请选择阵营：</view>
                <uni-data-select v-model="campId" :localdata="campList"></uni-data-select>
                <view>请选择角色：</view>
                <uni-data-select v-model="userType" :localdata="typeList"></uni-data-select>
            </view>
        </uv-modal>
<!--        <uv-modal style="background-color: pink" width="300" ref="product" @confirm="chooseProduct()">-->
<!--            <view class="popup_view">-->
<!--                <uni-data-select v-model="productId" :localdata="productList"></uni-data-select>-->
<!--            </view>-->
<!--        </uv-modal>-->
        <NjustPopup ref="product" @close="productId = ''">
          <uni-data-select class="njust-select" placeholder="请选择游戏产品" v-model="productId" :localdata="productList"></uni-data-select>
          <button class="njust-button" @click="chooseProduct">进入游戏</button>
          <view style="height: 30px"></view>
        </NjustPopup>

      <NjustPopup ref="history" @close="productId = ''">
        <uni-data-select class="njust-select" placeholder="请选择游戏产品" v-model="productId" :localdata="productList"></uni-data-select>
        <button class="njust-button" @click="chooseHistory">进入游戏</button>
        <view style="height: 30px"></view>
      </NjustPopup>
    </view>
</template>

<script>
import { joinRoom, queryCampList, chooseCamp } from '@/api/room.js';
import { initWebSocket, sendMsg } from '@/api/websocket.js';
import { queryArmoryList } from '@/api/product.js';
import NavBar from '@/uni_modules/nav-bar/nav-bar.vue'
import NjustPopup from "@/uni_modules/njust-popup/njust-popup.vue";
export default {
  components: {NavBar, NjustPopup},
    data() {
        return {
            user: {},
            inviteCode: '',
            campId: '',
            campList: '', // 阵营
            productList: [], //兵棋产品
            productId: '',
            verdictRecordId: '',
            userType: 0,
            typeList: [
                {
                    text: '操作员',
                    value: 1
                },
                {
                    text: '裁决员',
                    value: 2
                }
            ],
            type: ''
        };
    },

    onLoad() {
        //initWebSocket();
        this.user = uni.getStorageSync('user');
        //this.queryProductList();
    },
    methods: {
        to(index) {
            switch (index) {
                case 0:
                    // 兵棋列表
                    uni.navigateTo({
                        url: '/pages/product/list'
                    });
                    break;
                case 1:
                    // 复盘
                    this.queryProductList();
                    this.$refs.history.open();
                    // uni.navigateTo({
                    //     url: '/pages/verdict/record'
                    // });
                    break;
                case 2:
                    // 立即
                    // this.type = 'battle';
                    // this.$refs.room.open();
                    uni.navigateTo({
                      url: '/pages/mode/join'
                    });
                    break;
                case 3:
                    // 观战
                    // this.type = 'watch';
                    // this.$refs.room.open();
                    this.queryProductList();
                    this.$refs.product.open();
                    break;
                default:
                    break;
            }
        },
        queryProductList() {
            queryArmoryList()
                .then((res) => {
                    if(res.data.code === 200){
                        this.productList = res.data.rows;
                        this.productList.forEach((item) => {
                            item.text = item.productName;
                            item.value = item.id;
                        });
                    }
                })
                .catch((err) => {});
        },
        joinRoom() {
            console.log(this.inviteCode);
            if (!this.inviteCode) {
                uni.showToast({
                    title: '请输入邀请码',
                    icon: 'none'
                });
                return;
            }
            joinRoom(this.inviteCode, this.type)
                .then((res) => {
                    if (res.data.code === 200) {
                        this.verdictRecordId = res.data.msg;
                        if (this.type === 'watch') {
                            console.log('res: ', res.data.msg);
                            sendMsg(JSON.stringify({ action: 'watchJoinRoom', verdictRecordId: this.verdictRecordId }));

                            uni.navigateTo({
                                url: '/pages/wargame/index-v2?verdictRecordId=' + this.verdictRecordId + '&type=watch'
                            });
                        } else {
                            this.queryCampList();
                        }
                    }
                })
                .catch((err) => {});
        },
        queryCampList() {
            queryCampList({ verdictRecordId: this.verdictRecordId })
                .then((res) => {
                    this.campList = res.data.data;
                    this.campList.forEach((item) => {
                        item.text = item.name;
                        item.value = item.id;
                    });
                    this.$refs.camp.open();
                })
                .catch((err) => {});
        },
        chooseCamp() {
            chooseCamp({ id: this.campId, verdictRecordId: this.verdictRecordId, userType: this.userType })
                .then((res) => {
                    if (res.data.code === 200) {
                        uni.navigateTo({
                            url:
                                '/pages/room/create?inviteCode=' +
                                this.inviteCode +
                                '&verdictRecordId=' +
                                this.verdictRecordId +
                                '&campId=' +
                                this.campId
                        });
                    }
                })
                .catch((err) => {});
        },
        chooseProduct(){
            if (this.productId === ''){
                uni.showToast({
                    title: '请选择游戏',
                    icon: 'none'
                })
              return;
            }
            this.$refs.product.close()
            if (this.user.permission === 'admin'){
              uni.navigateTo({
                url: '/pages/verdict/list?productId=' + this.productId
                    + '&isAdmin=true&isUser=false'
              });
            }
            else {
              uni.navigateTo({
                url: '/pages/verdict/list?productId=' + this.productId
                    + '&isAdmin=' + false + '&isUser=' + true
              });
            }
        },
      chooseHistory(){
        if (this.productId === ''){
          uni.showToast({
            title: '请选择游戏',
            icon: 'none'
          })
          return;
        }
        this.$refs.history.close()
        uni.navigateTo({
          url: '/pages/verdict/record?productId=' + this.productId
        });
      }
    }
};
</script>

<style lang="scss" scoped>
@font-face {
    font-family: '仓耳渔阳体 W05';
    font-weight: 400;
    src: url('@/static/font/mode.woff2') format('woff2');
    font-display: swap;
}
.title__view {
    font-size: $uni-font-size-title;
}
.mode-btn__view {
    display: flex;
    justify-content: space-around;
    // 防止3个模式，宽度压缩
    min-width: 144vh;
    height: 80vh;
    margin-top: 5vh;
    .new-game__view,
    .observe__view,
    .review__view {
        display: flex;
        justify-content: center;
        align-items: center;
        writing-mode: vertical-lr;
        width: 48vh;
        height: 70vh;
        margin: 25rpx;
        box-shadow: 0 0 10px $uni-border-color;
        font-size: $uni-font-size-title;
        /* 主层必须为相对定位,否则伪元素的图片将不符合预期 */
        position: relative;
        text {
            z-index: 1;
            font-size: 40px;
            color: $uni-text-color-inverse;
            font-family: '仓耳渔阳体 W05';
        }
    }
    .new-game__view:before,
    .observe__view:before,
    .review__view:before {
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        /* 插入空内容，必须要的样式 */
        content: '';
        /* 绝对定位，确保背景图起点在主层的0,0位置 */
        position: absolute;
        left: 0;
        top: 0;
        /*避免遮盖其他元素*/
        z-index: 0;
        -webkit-filter: opacity(38%); /*设置透明度   blur还可以改变照片的模糊度*/
        filter: opacity(38%);
    }
    .new-game__view:before {
        background-image: url('@/static/image/mode/new-game.jpg');
    }
    .observe__view:before {
        background-image: url('@/static/image/mode/observe.jpg');
    }
    .review__view:before {
        background-image: url('@/static/image/mode/review.jpg');
    }
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
  margin-top: 20px;
  height: 40px;
  line-height: 40px;
  background-color: #4cf5e3;
  border-radius: 5px;
  border: 1px solid #1cade4;
  color: black;
}

</style>
