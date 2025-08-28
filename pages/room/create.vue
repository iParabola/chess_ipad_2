<template>
  <view class="xinyi-content page-fade-in">
    <NavBar title="组建团队" leftIcon="undo-filled" right-text="退出登录" :user="user"></NavBar>
    <view class="room__view">
      <view class="player__view">
        <view class="avatar-halo" :class="player1Ready ? 'halo-ready' : 'halo-wait'">
        <image src="/static/image/room/red.svg" class="player__image"></image>
      </view>
        <view class="player__name">{{ player1Ready ? room.data.firstUserName : '等待加入...' }}</view>
        <view v-if="!player1Ready" class="loading-dots"><text></text><text></text><text></text></view>
      </view>

      <view class="room-info__view room-card">
        <view class="room-number__row">
          <view class="room-number__title">房间号：</view>
          <view class="room-number__value">{{ inviteCode }}</view>
        </view>
        <!-- <view class="room-number__sub">{{ verdictRecordId }}</view> -->
        <view v-if="isAdmin" class="watch-select__wrap">
          <uni-data-select v-model="watchMode" :localdata="watchModeList" :clear="false"></uni-data-select>
        </view>
      </view>

      <view class="player__view">
        <view class="avatar-halo" :class="player2Ready ? 'halo-ready' : 'halo-wait'">
        <image src="/static/image/room/blue.svg" class="player__image"></image>
        </view>
        <view class="player__name">{{ player2Ready ? room.data.secondUserName : '等待加入...' }}</view>
        <view v-if="!player2Ready" class="loading-dots"><text></text><text></text><text></text></view>
      </view>
    </view>

    <view class="progress-card" :class="{ clickable: (isAdmin && readyBoth) }" @click="onProgressClick">
      <view class="progress-title">{{ (isAdmin && readyBoth) ? '开战' : statusText }}</view>
      <view v-if="!(isAdmin && readyBoth)" class="progress-track">
        <view class="progress-segment" :class="{ done: player1Ready }"></view>
        <view class="progress-separator"></view>
        <view class="progress-segment" :class="{ done: player2Ready }"></view>
      </view>
      <view v-if="!(isAdmin && readyBoth)" class="progress-meta">
        <text class="meta-left">{{ player1Ready ? '用户 1 已加入' : '等待用户 1' }}</text>
        <text class="meta-right">{{ player2Ready ? '用户 2 已加入' : '等待用户 2' }}</text>
      </view>
    </view>

    <view class="leave-btn" hover-class="hover-leaveRoom" @click="showLeave">退出房间</view>
    <uv-modal width="200" ref="leave" @confirm="leaveRoom" showCancelButton="true">
      <view>确认要离开房间嘛</view>
    </uv-modal>

    <!-- 合并功能后移除单独的等待/开战按钮区域 -->
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
      inviteCode: '',
      verdictRecordId: '',
      campId: '',
      isAdmin: false,
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
      if (this.room && this.room.roomUserMap && this.room.roomUserMap.secondUserId) {
        return true;
      }
      return false;
    },
    statusText() {
      if (!this.player1Ready && !this.player2Ready) return '等待用户 1、用户 2 加入中...';
      if (this.player1Ready && !this.player2Ready) return '用户 1 已加入，等待用户 2...';
      if (!this.player1Ready && this.player2Ready) return '用户 2 已加入，等待用户 1...';
      return '两位用户已加入';
    },
    readyBoth() {
      return this.player1Ready && this.player2Ready;
    }
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
    },
    onProgressClick() {
      if (this.isAdmin && this.readyBoth) {
        this.start();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
/* 背景：深邃暗紫渐变 + 入场动画 */
.xinyi-content {
  min-height: 100vh;
  background: radial-gradient(1200px 600px at 20% 30%, rgba(74,144,226,.08), transparent 60%),
              linear-gradient(160deg, #1A1A30 0%, #0F0F1F 100%);
}
.page-fade-in { animation: fadeIn .4s ease forwards; opacity: 0; }
@keyframes fadeIn { to { opacity: 1; } }

.room__view {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 66vw;
    height: 52vh;
    margin: 28px auto 20px;
    gap: 32px;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    .player__view {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #E0E0E0;
    }
    .player__name { margin-top: 8px; font-size: 14px; color: #B0B0B0; }
    .player__image { width: 120px; height: 120px; filter: drop-shadow(0 8px 16px rgba(0,0,0,.35)); }
    .avatar-halo { position: relative; border-radius: 50%; padding: 10px; }
    .avatar-halo::before{
      content: '';
      position: absolute;
      inset: -8px;
      border-radius: 50%;
      filter: blur(14px);
      opacity: .85;
      transition: all .3s ease;
    }
    .halo-wait::before{ background: radial-gradient(circle, rgba(135,206,235,.45), rgba(30,144,255,.18)); animation: pulse 2.2s ease-in-out infinite; }
    .halo-ready::before{ background: radial-gradient(circle, rgba(30,144,255,.65), rgba(30,144,255,.25)); animation: pulse 1.4s ease-in-out infinite; }
}
@keyframes pulse { 0%,100%{ transform: scale(.98); opacity:.7;} 50%{ transform: scale(1.02); opacity:1; } }

/* 房间信息卡片 */
.room-card {
  background: rgba(42,42,64,0.8);
  border-radius: 12px;
  padding: 16px 18px;
  box-shadow: inset 0 0 0 1px rgba(106,90,205,.25), 0 10px 22px rgba(0,0,0,.28);
  width: 320px;
}
.room-number__row{ display:flex; align-items:center; justify-content:center; gap:8px; }
.room-number__title{ color:#B0B0B0; font-size:14px; margin-bottom:4px; }
.room-number__value{ color:#FFFFFF; font-weight:700; font-size:16px; letter-spacing:2px; }
.room-number__sub{ color:#8b8ba0; font-size:12px; margin-top:8px; }
.watch-select__wrap{ margin-top:12px; }
::v-deep .uni-select{ background:#2A2A40; border-radius:8px; border:1px solid rgba(106,90,205,.35); }
::v-deep .uni-select:hover{ background:#3A3A50; }
::v-deep .uni-select__input-text{ color:#E0E0E0 !important; }
/* 下拉面板采用浅色底，选项文字黑色，提高清晰度 */
::v-deep .uni-select__selector{ background:#ffffff !important; border:1px solid rgba(0,0,0,0.08); box-shadow: 0 8px 18px rgba(0,0,0,.25); }
::v-deep .uni-select__selector-item{ color:#000000 !important; }
::v-deep .uni-select__selector-item:hover{ background:#f2f2f6; }
::v-deep .uni-select__selector-item--selected{ position:relative; color:#000000 !important; background:#eaeaf2; }
::v-deep .uni-select__selector-item--selected::before{ content:''; position:absolute; left:6px; top:50%; width:4px; height:12px; background: linear-gradient(90deg, #4A90E2, #6A5ACD); transform: translateY(-50%); border-radius:2px; }

/* 进度卡片与分段进度条 */
.progress-card{ width: 72vw; margin: 0 auto 16px; background: rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); border-radius:16px; padding:16px 18px; box-shadow: 0 10px 22px rgba(0,0,0,.25); transition: all .15s ease; }
.progress-card.clickable{ cursor: pointer; background: linear-gradient(90deg, rgba(74,144,226,.85), rgba(106,90,205,.85)); border-color: rgba(255,255,255,.22); box-shadow: 0 14px 30px rgba(0,0,0,.28), inset 0 1px 0 rgba(255,255,255,.08); }
.progress-card.clickable:hover{ transform: translateY(-1px); background: linear-gradient(90deg, rgba(74,144,226,1), rgba(106,90,205,1)); }
.progress-title{ color:#E0E0E0; margin-bottom:10px; text-align:center; }
.progress-card.clickable .progress-title{ color:#FFFFFF; font-weight: 700; letter-spacing: .5px; }
.progress-track{ display:flex; align-items:center; height: 14px; border-radius: 999px; background:#2e2e2e; overflow:hidden; }
.progress-segment{ flex:1; height:100%; background:#555555; transition: all .3s ease; }
.progress-segment.done{ background: linear-gradient(90deg, #4A90E2, #6A5ACD); }
.progress-separator{ width:8px; height:100%; background:transparent; }
.progress-meta{ display:flex; justify-content:space-between; color:#B0B0B0; font-size:12px; margin-top:8px; }
.progress-card.clickable .progress-meta{ color: rgba(255,255,255,.9); }

/* 加载点动画 */
.loading-dots{ display:flex; gap:6px; margin-top:4px; }
.loading-dots text{ width:6px; height:6px; background:#87CEEB; border-radius:50%; display:inline-block; animation: dotPulse 1.2s ease-in-out infinite; }
.loading-dots text:nth-child(2){ animation-delay:.15s; }
.loading-dots text:nth-child(3){ animation-delay:.3s; }
@keyframes dotPulse{ 0%,100%{ transform: scale(.8); opacity:.6;} 50%{ transform: scale(1); opacity:1; } }

/* 离开按钮 */
.leave-btn{
  display: inline-flex; align-items: center; justify-content: center;
  height: 36px; line-height: 36px; padding: 0 14px; margin: 0 auto 24px;
  color: #E0E0E0; border-radius: 12px; cursor: pointer;
  background-color: #333333; border: 1px solid rgba(255,255,255,0.12);
  box-shadow: 0 8px 18px rgba(0,0,0,.2);
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
}
.hover-leaveRoom{ color:#E0E0E0; }
.leave-btn:hover{ transform: translateY(-2px); background: linear-gradient(135deg, #DC143C, #800080); box-shadow: 0 14px 28px rgba(0,0,0,.28); }

/*（已移除）开战按钮与等待提示的样式可保留或后续清理 */
.start__btn { display:none; }
.start__hint{ display:none; }
</style>
