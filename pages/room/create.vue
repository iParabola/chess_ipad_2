<template>
    <view class="xinyi-content">
        <NavBar title="组建团队" leftIcon="undo-filled" right-text="退出登录" :user="user"></NavBar>
        <view class="room__view">
            <view class="player__view" v-if="player1Ready">
                <image src="/static/image/room/red.svg" class="player__image"></image>
                <view>{{ room.data.firstUserName }}</view>
            </view>
            <view class="player__view" v-else>
                <image src="/static/image/room/default.svg" class="player__image"></image>
                <view>等待加入...</view>
            </view>
            <view class="player__view" v-if="player2Ready">
                <image src="/static/image/room/red-cai.svg" class="player__image"></image>
                <view>{{ room.data.firstJudgeUserName }}</view>
            </view>
            <view class="player__view" v-else>
                <image src="/static/image/room/default.svg" class="player__image"></image>
                <view>等待加入...</view>
            </view>
          <view class="player__view" v-if="player5Ready">
            <image src="/static/image/room/red-cai.svg" class="player__image"></image>
            <view>{{ room.data.firstCommanderUserName }}</view>
          </view>
          <view class="player__view" v-else>
              <image src="/static/image/room/default.svg" class="player__image"></image>
              <view>等待加入...</view>
            </view>
            <view class="room-info__view">
                <view class="room-number__view">房间号: {{ inviteCode }}</view>
                <view v-if="isAdmin">
                    <uni-data-select v-model="watchMode" :localdata="watchModeList" :clear="false"></uni-data-select>
                </view>
            </view>
            <view class="player__view" v-if="player3Ready">
                <image src="/static/image/room/blue.svg" class="player__image"></image>
                <view>{{ room.data.secondUserName }}</view>
            </view>
            <view class="player__view" v-else>
                <image src="/static/image/room/default.svg" class="player__image"></image>
                <view>等待加入...</view>
            </view>
            <view class="player__view" v-if="player4Ready">
                <image src="/static/image/room/blue-cai.svg" class="player__image"></image>
                <view>{{ room.data.secondJudgeUserName }}</view>
            </view>
            <view class="player__view" v-else>
                <image src="/static/image/room/default.svg" class="player__image"></image>
                <view>等待加入...</view>
            </view>
          <view class="player__view" v-if="player6Ready">
            <image src="/static/image/room/red-cai.svg" class="player__image"></image>
            <view>{{ room.data.secondCommanderUserName }}</view>
          </view>
          <view class="player__view" v-else>
            <image src="/static/image/room/default.svg" class="player__image"></image>
            <view>等待加入...</view>
          </view>


        </view>
        <view style="margin-bottom: 50px; color: white" hover-class="hover-leaveRoom" @click="showLeave" >退出房间</view>
        <uv-modal  width="200" ref="leave" @confirm="leaveRoom"  showCancelButton="true">
          <view>
            确认要离开房间嘛
          </view>
        </uv-modal>
        <button
            v-if="isAdmin"
            @click="start"
            type="primary"
            class="start__btn"
            :disabled="!player1Ready || !player2Ready || !player3Ready || !player4Ready || !player5Ready || !player6Ready"
            :loading="!player1Ready || !player2Ready || !player3Ready || !player4Ready || !player5Ready || !player6Ready"
        >
            {{ player1Ready && player2Ready && player3Ready && player4Ready && player5Ready && player6Ready ? '开战' : '等待红蓝双方就绪' }}
        </button>
        <view style="color: white;" v-else>
            {{ player1Ready && player2Ready && player3Ready && player4Ready && player5Ready && player6Ready ? '双方已就绪' : '等待红蓝双方就绪' }}
        </view>
    </view>
</template>

<script>
import { startGame } from '@/api/room.js';
import { initWebSocket, sendMsg } from '@/api/websocket.js';
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
import {queryScenarioIdByVerdictRecordId} from "@/api/scenario";
import {creatVerdictRoom} from "@/api/scenarioCreate";
export default {
  components: {NavBar},
    data() {
        return {
            watchMode: 10,
            watchModeList: [
                { value: 10, text: '允许观战' },
                { value: 20, text: '不允许观战' }
            ],
            inviteCode: '', // 房间号
            verdictRecordId: '', // 裁决id
            campId: '', // 阵营id
            isAdmin: false, // 是否管理员、创建者
            room: {},
            user: {},
            scenarioId: ''
        };
    },
    computed: {
        player1Ready() {
            if (this.room && this.room.roomUserMap && this.room.roomUserMap.firstUserId) {
                return true;
            }
            return false;
        },
        player2Ready() {
            if (this.room && this.room.roomUserMap && this.room.roomUserMap.firstJudgeUserId) {
                return true;
            }
            return false;
        },
        player5Ready() {
          if (this.room && this.room.roomUserMap && this.room.roomUserMap.firstCommanderUserId) {
            return true;
          }
          return false;
        },
        player3Ready() {
            if (this.room && this.room.roomUserMap && this.room.roomUserMap.secondUserId) {
                return true;
            }
            return false;
        },
        player4Ready() {
            if (this.room && this.room.roomUserMap && this.room.roomUserMap.secondJudgeUserId) {
                return true;
            }
            return false;
        },
        player6Ready() {
          if (this.room && this.room.roomUserMap && this.room.roomUserMap.secondCommanderUserId) {
            return true;
          }
          return false;
        },
    },
    onUnload() {},
    onLoad(option) {
      console.log(this.campId)
        this.user = uni.getStorageSync('user');
        initWebSocket();
        if (option && option.inviteCode) {
            this.inviteCode = option.inviteCode;
            this.verdictRecordId = option.verdictRecordId;
            this.campId = option.campId;
            this.isAdmin = option.isAdmin || false;
            setTimeout(() => {
                // if (!this.isAdmin) {
                //     sendMsg(JSON.stringify({ action: 'joinRoom', verdictRecordId: this.verdictRecordId }));
                // }
                sendMsg(JSON.stringify({ action: 'joinRoom', verdictRecordId: this.verdictRecordId }));
            }, 2000);
        }

        uni.$on('onMessage', async (res) => {
          console.log(res);
          let jsonRes = JSON.parse(res.data);
          console.log('json is',jsonRes);
          let action = jsonRes.action;
          switch (action) {
            case 'joinRoom':
              this.room = jsonRes;
              break;
            case 'leaveRoom':
              this.room = jsonRes;
              break;
            case 'roomFull':
              uni.navigateBack();
              break;
            case 'startGame':
            uni.navigateTo({
              url: '/pages/wargame/index-v2?verdictRecordId=' + this.verdictRecordId + '&isUser=' + !this.isAdmin + '&campId=' + this.campId
            });
              break;
            default:
              break;
          }
        });
    },
    methods: {
        async start() {
            let res = {
              verdictRecordId: this.verdictRecordId,
            }
            console.log(res)
            let rest = await queryScenarioIdByVerdictRecordId(res);
            console.log(rest)
            this.scenarioId = rest.data.data;
            console.log(this.scenarioId)
            let data = {
              verdictRecordId: this.verdictRecordId,
              scenarioRecordId: this.scenarioId
            }
            console.log(data)
            await creatVerdictRoom(data).then((res) => {
              console.log(res)
              if(res.data.code === 200){
                startGame({ id: this.verdictRecordId, watchMode: this.watchMode })
                    .then((res) => {
                      if (res.data.code === 200) {
                        sendMsg(JSON.stringify({ action: 'startGame', verdictRecordId: this.verdictRecordId }));
                      }
                    })
                    .catch((err) => {});
              }
            })
        },
        showLeave(){
          this.$refs.leave.open()
        },
        leaveRoom(){
          sendMsg(JSON.stringify({ action: 'leaveRoom', verdictRecordId: this.verdictRecordId }));
          uni.navigateBack();
        }
    }
};
</script>

<style lang="scss" scoped>
.room__view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 60vw;
    height: 50vh;
    .player__view {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: $uni-text-color-inverse;
    }
    .player__image {
        width: 100px;
        height: 100px;
    }
    .room-info__view {
        width: 100rpx;
        text-align: center;
        font-size: $uni-font-size-title;
        .room-number__view,
        ::v-deep .uni-select__input-text {
            color: $uni-text-color-inverse;
        }
    }
}
.start__btn {
    width: 60vw;
}
.hover-leaveRoom{
  color: #4cf5e3;
}
</style>
