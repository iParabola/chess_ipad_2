<template>
  <view class="top" >
    <view class="top-head">
      <image src="/static/image/wargame/火力战.svg" style="width: 15%; height: 7vh; margin-top: 1.5vh;"></image>
      <view style="height: 10vh; line-height: 10vh; font-size: 25px; color: #4cf5e3;">火力战</view>
      <view style="height: 10vh; line-height: 11vh; font-size: 18px; color: white; margin-left: 10px">手工兵棋裁决——火力战系统</view>
    </view>
    <view class="top-middle">
      <view style="height: 10vh; line-height: 10vh; font-size: 25px; color: #4cf5e3;">{{ title }}</view>
    </view>
    <view class="top-tail">
      <view style="display: flex; width: 100%; height: 10vh; justify-content: flex-end;">
        <image src="/static/image/wargame/头像.svg" style="width: 15%; height: 7vh; margin-top: 1.5vh"></image>
        <view style="height: 10vh; line-height: 10vh; font-size: 25px; color: #4cf5e3;" @click="toggleInfo">{{ user.userName }}</view>
      </view>
      <view style="display: flex; width: 100%; height: 7vh; justify-content: flex-end;">
        <view v-if="showInfo" class="user-info">
          <view @click="logout" class="info-item">退出登录</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: 'NavBar',
  data(){
    return{
      showInfo: false,
    }
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    rightText: {
      type: String,
      default: ''
    },
    leftIcon: {
      type: String,
      defult: ''
    },
    user: {}
  },
  methods: {
    toggleInfo(){
      this.showInfo = !this.showInfo;
    },
    back() {
      if (this.leftIcon) {
        uni.navigateBack();
      }
    },
    beforeLogout() {
      this.$refs.alertDialog.open();
    },
    logout() {
      uni.setStorageSync('token', null);
      uni.setStorageSync('user', null);
      uni.reLaunch({
        url: '/pages/login/login'
      });
    }
  }
};
</script>
<style lang="scss">
.top{
  width: 100vw;
  height: 10vh;
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid #ffffff;
  z-index: 999;
}
.top-head{
  margin-left: 5vw;
  width: 30vw;
  display: flex;
  flex-direction: row;
}
.top-middle {
  width: 30vw;
  text-align: center;
  height: 10vh;
}
.top-tail {
  margin-right: 5vw;
  width: 30vw;
  height: 10vh;
  justify-content: flex-end;
}

.user-info{
  margin-top: 10px;
  width: 30%;
  height: 80px;
  background-color: white;
  border-radius: 5px;
}
.info-item{
  width: 80%;
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  text-align: center;
  margin-left: 10%;
  background-color: #dc3545;
  border-radius: 3px;
}
</style>
