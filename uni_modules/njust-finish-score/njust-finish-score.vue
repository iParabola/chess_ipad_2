<template>
  <uni-popup ref="popup" >
    <view class="popup">
      <view style="display: flex;">
        <image src="/static/image/wargame/火力战.svg" style="width: 15%; height: 7vh; margin-left: 5%; margin-top: 1vh"></image>
        <view style="height: 7vh; line-height: 7vh; font-size: 25px; margin-left: 2%; color: #4cf5e3; margin-top: 1vh">火力战</view>
        <view style="height: 7vh; line-height: 7.5vh; font-size: 18px; color: white; margin-left: 10px; margin-top: 1vh">手工兵棋裁决</view>
      </view>
      <view style="height: 15vh; width: 100%;">
        <view style="display: flex; margin-top: 10px">
          <view style="margin-left: 10%; line-height: 5vh; font-size: 20px; color: white">{{game.firstCampName}}得分为：</view>
          <view style="margin-left: 10%; line-height: 4vh; font-size: 24px; color: #4cf5e3">{{ game.firstScore }}</view>
        </view>
        <view style="display: flex; margin-top: 20px">
          <view style="margin-left: 10%; line-height: 5vh; font-size: 20px; color: white">{{game.secondCampName}}得分为：{{ game.second_score }}</view>
          <view style="margin-left: 10%; line-height: 4vh; font-size: 24px; color: #4cf5e3">{{ game.secondScore }}</view>
        </view>
      </view>
    </view>
  </uni-popup>
</template>
<script>

export default {
  name: 'njust-score-popup',
  data(){
    return{
      showInfo: false,
      showToast: false,
    }
  },
  props: {
    userType: {
      type: String,
      default: ''
    },
    verdictRecordId: {
      type: String,
      default: ''
    },
    game:{},
  },
  mounted() {
    console.log('game1', this.game)
  },
  methods: {
    showCustomToast(message) {
      this.toastMessage = message;
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 1500); // Toast 显示 1.5 秒
    },
    open() {
      this.$refs.popup.open();
      console.log('game', this.game)
    },
    close() {
      this.$refs.popup.close();
    },
  }
};
</script>
<style lang="scss">
.popup{
  width: 300px;
  min-height: 10vh;
  background-color: rgba(23, 23, 68, 0.6);
  border-radius: 20px;
  z-index: 999;
}
.custom-toast {
  position: fixed;
  top: 50%; /* 你可以根据需要调整位置 */
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 10px 20px;
  border-radius: 8px;
  z-index: 10000; /* 保证在 popup 之上 */
}
</style>
