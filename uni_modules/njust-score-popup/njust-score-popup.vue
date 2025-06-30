<template>
  <uni-popup ref="popup" >
    <view class="popup">
      <view style="display: flex;">
<!--        <image src="/static/image/wargame/火力战.svg" style="width: 15%; height: 7vh; margin-left: 5%; margin-top: 1vh"></image>-->
        <view style="height: 7vh; line-height: 7vh; font-size: 25px; margin-left: 43%; color: #4cf5e3; margin-top: 1vh">得分汇总</view>
<!--        <view style="height: 7vh; line-height: 7.5vh; font-size: 18px; color: white; margin-left: 10%; margin-top: 1vh">手工兵棋裁决</view>-->
      </view>
      <view v-if="userType === 'admin'" style="height: 20vh; width: 100%;">
        <view style="display: flex; margin-top: 10px">
          <view style="margin-left: 10%; line-height: 5vh; font-size: 20px; color: white">{{game.firstCampName}}计划部署及回合对抗权重得分为：</view>
          <uni-easyinput
              v-model="first_score_1"
              type="number"
              placeholder="请输入"
              trim
              primaryColor="#215e21"
              style="height: 5vh; color: black; margin-right: 10%"
          ></uni-easyinput>
        </view>
        <view style="display: flex; margin-top: 10px">
          <view style="margin-left: 10%; line-height: 5vh; font-size: 20px; color: white">{{game.secondCampName}}计划部署及回合对抗权重得分为：</view>
          <uni-easyinput
              v-model="second_score_1"
              type="number"
              placeholder="请输入"
              trim
              primaryColor="#215e21"
              style="height: 5vh; color: black; margin-right: 10%"
          ></uni-easyinput>
        </view>
        <view style="display: flex; margin-top: 10px">
          <view style="margin-left: 10%; line-height: 5vh; font-size: 20px; color: white">{{game.firstCampName}}的推演总评得分为：</view>
          <uni-easyinput
              v-model="first_score"
              type="number"
              placeholder="请输入"
              trim
              primaryColor="#215e21"
              style="height: 5vh; color: black; margin-right: 10%"
          ></uni-easyinput>
        </view>
        <view style="display: flex; margin-top: 20px">
          <view style="margin-left: 10%; line-height: 5vh; font-size: 20px; color: white">{{game.secondCampName}}的推演总评得分为：</view>
          <uni-easyinput
              v-model="second_score"
              type="number"
              placeholder="请输入"
              trim
              primaryColor="#215e21"
              style="height: 5vh; color: black; margin-right: 10%"
          ></uni-easyinput>
        </view>
        <view style="display: flex; margin-top: 20px">
          <button style="width: 35%; margin-left: 10%; height: 4vh; line-height: 4vh; background-color:#4cf5e3;" @click="setFinalScore">确认打分</button>
          <button style="width: 35%; margin-left: 0; height: 4vh; line-height: 4vh" @click="close">取消打分</button>
        </view>
      </view>
      <view v-else style="height: 10vh; width: 100%;">
        <view style="display: flex">
          <view style="margin-left: 10%; line-height: 10vh; font-size: 24px; color: white">您的最终得分为：</view>
          <view style="line-height: 10vh; font-size: 24px; color: #4cf5e3;">{{score ? score : 0}}</view>
        </view>
      </view>
      <view style="height: 30px"></view>
    </view>
    <view v-if="showToast" class="custom-toast">
      {{ toastMessage }}
    </view>
  </uni-popup>
</template>
<script>
import {getScoreByCampId} from "@/api/verdictRecord";

export default {
  name: 'njust-score-popup',
  data(){
    return{
      showInfo: false,
      first_score: '',
      second_score: '',
      first_score_1: '',
      second_score_1: '',
      toastMessage: '',
      showToast: false,
    }
  },
  props: {
    score: {
      type: String,
      default: '',
    },
    userType: {
      type: String,
      default: ''
    },
    campId: {
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
      this.getScoreFromPopup();
    },
    close() {
      this.first_score = '';
      this.second_score = '';
      this.$refs.popup.close();
    },
    setFinalScore(){
      if (this.first_score === '' || this.second_score === '' || this.first_score_1 === '' || this.second_score_1 === '') {
        this.showCustomToast('请输入完整信息');
      }
      else {
        this.first_score = (parseFloat(this.first_score) * 0.6 + parseFloat(this.first_score_1)).toFixed(0);
        this.second_score = (parseFloat(this.second_score) * 0.6 + parseFloat(this.second_score_1)).toFixed(0);
        this.$emit('setFinalScore', this.first_score, this.second_score, this.game);
        this.close();
      }
    },
    async getScoreFromPopup() {
      if (this.userType === 'user'){
        const data = {
          id : this.verdictRecordId,
          CampId: this.campId
        }
        const res = await getScoreByCampId(data)
        console.log(data)
        this.score = res.data.data
      }
    },
  }
};
</script>
<style lang="scss">
.popup{
  width: 800px; // 或者设置为百分比 width: 80%;
  height: 450px;
  max-width: 80%; // 最大宽度为视窗的80%
  min-width: 300px; // 最小宽度
  min-height: 10vh;
  max-height: 80vh; // 最大高度为视窗的80%
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
