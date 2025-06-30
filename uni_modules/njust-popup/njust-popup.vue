<template>
  <uni-popup ref="popup" >
    <view class="popup">
      <view style="display: flex;">
        <image src="/static/image/wargame/火力战.svg" style="width: 15%; height: 7vh; margin-left: 5%; margin-top: 1vh"></image>
        <view style="height: 7vh; line-height: 7vh; font-size: 25px; margin-left: 2%; color: #4cf5e3; margin-top: 1vh">火力战</view>
        <view style="height: 7vh; line-height: 7.5vh; font-size: 18px; color: white; margin-left: 10px; margin-top: 1vh">手工兵棋裁决</view>
      </view>
      <!-- 插槽，允许外部传入内容 -->
      <slot></slot>
    </view>
  </uni-popup>
</template>
<script>
export default {
  name: 'njust-popup',
  data(){
    return{
      showInfo: false,
    }
  },
  props: {

  },
  methods: {
    open() {
      this.$refs.popup.open();
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
</style>
