<template>
  <view class="xinyi-content">
    <NavBar title="立即推演" right-text="退出登录" :user="user"></NavBar>
    <section class="footer-section bg bg_img" data-background="assets/images/footer-bg.png">
      <div class="footer-element-one"> <img src="static/image/join/footer-element-one.png" alt="element"> </div>
      <div class="footer-element-two"> <img src="static/image/join/footer-element-two.png" alt="element"> </div>
      <div class="footer-element-three"> <img src="static/image/join/line1.png" alt="element"> </div>
      <div class="footer-element-four"> <img src="static/image/join/line1.png" alt="element"> </div>
      <div class="footer-element-five"> <img src="static/image/join/line9.png" alt="element"> </div>
      <div class="footer-element-six"> <img src="static/image/join/line9.png" alt="element"> </div>
      <div class="footer-element-seven"> <img src="static/image/join/line3.png" alt="element"> </div>
      <div class="footer-element-eight"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-nine"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-ten"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-eleven"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-twelve"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-thirteen"> <img src="static/image/join/manyline.png" alt="element"> </div>
      <div class="footer-element-fourteen"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-fifteen"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-sixteen"> <img src="static/image/join/line5.png" alt="element"> </div>
      <div class="footer-element-seventeen"> <img src="static/image/join/circle3.png" alt="element"> </div>
      <div class="footer-shape"> <img src="static/image/join/dotline.png" alt="element"> </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-12">
            <div class="footer-content">
              <h3 class="sub-title" >火力战</h3>
              <h2 class="sub-title2">实时制陆军战术级兵棋对抗</h2>
              <view class="footer-form">
                <input v-model="room" class="cmn-input" type="text" placeholder="请输入房间码">
                <button type="primary" class="cmn-btn" value="进入房间" @click="join()">进入房间</button>
              </view>
            </div>
          </div>
        </div>
      </div>
    </section>
    <NjustPopup ref="isModalVisible">
      <view class="product-item__btn">
        <button class="run__btn" v-if="currentItem.status === 10 &&
            (user.id === currentItem.firstUserId || user.id === currentItem.firstJudgeUserId || user.id === currentItem.firstCommanderUserId
             || user.id === currentItem.secondUserId || user.id === currentItem.secondJudgeUserId || user.id === currentItem.secondCommanderUserId)"
                @click="toRoom('3',currentItem)">进入房间</button>
        <button class="init__btn" v-else-if="currentItem.status === 10" @click="toRoom('0',currentItem)" >组队</button>
        <button class="run__btn" v-else-if="currentItem.status !== 10 &&
            (user.id === currentItem.firstUserId || user.id === currentItem.firstJudgeUserId || user.id === currentItem.firstCommanderUserId
             || user.id === currentItem.secondUserId || user.id === currentItem.secondJudgeUserId || user.id === currentItem.secondCommanderUserId)"
                @click="toRoom('1',currentItem)">进入战场</button>
        <button class="watch__btn" v-else-if="currentItem.status !== 10" @click="toRoom('2',currentItem)">观战</button>
      </view>
      <view style="height: 30px"></view>
    </NjustPopup>

    <NjustPopup ref="camp">
      <uni-data-select class="njust-select" v-model="campId" :localdata="campList"></uni-data-select>
      <uni-data-select class="njust-select" v-model="userType" :localdata="typeList"></uni-data-select>
      <button class="njust-button" @click="chooseCamp()">进入房间</button>
      <view style="height: 30px"></view>
    </NjustPopup>
  </view>
</template>

<script>
import NavBar from "@/uni_modules/nav-bar/nav-bar.vue";
import {chooseCamp, joinRoom, queryCampList, queryVerdictRecordByInviteCode} from "@/api/room";
import {sendMsg} from "@/api/websocket";
import NjustPopup from "@/uni_modules/njust-popup/njust-popup.vue";

export default {
  name: "join",
  components: {NjustPopup, NavBar},
  data() {
    return {
      user: {},
      room: '',
      type: 'user',
      currRecordId: '',
      inviteCode: '',
      campList:[],

      campId: '',
      userType: 0,
      isAdmin: false,
      isUser: true,
      typeList: [
        {
          text: '操作员',
          value: 1
        },
        {
          text: '裁决员',
          value: 2
        },
        {
          text: '指挥员',
          value: 3
        }
      ],

      isModalVisible: false,
      currentItem : '',
    }
  },
  onLoad() {
    this.user = uni.getStorageSync('user')
  },
  methods:{
    join(){
      console.log(this.room);
      if (!this.room) {
        uni.showToast({
          title: '请输入房间号',
          icon: 'none'
        });
        return;
      }
      queryVerdictRecordByInviteCode({inviteCode: this.room}).then((res) => {
        console.log(res)
        if (res.data.data === null){
          uni.showToast({
            title: '该房间不存在',
            icon: 'none'
          });
        }
        else {
          this.currentItem = res.data.data
          this.$refs.isModalVisible.open();
          this.isModalVisible = true; // 显示弹窗
        }
      })
    },
    toRoom(type, item){
      console.log(item)
      this.currRecordId = item.id;
      this.inviteCode = item.inviteCode;
      let itemCampId = '';
      if(this.user.id === item.firstUserId || this.user.id === item.firstJudgeUserId || this.user.id === item.firstCommanderUserId){
        itemCampId = item.firstCampId;
      }else if(this.user.id === item.secondUserId || this.user.id === item.secondJudgeUserId || this.user.id === item.secondCommanderUserId){
        itemCampId = item.secondCampId;
      }
      console.log('type', type)
      switch (type) {
        case '0' :
          // this.$refs.camp.open();
          // 开始推演
          queryCampList({ verdictRecordId: item.id })
              .then((res) => {
                console.log(res)
                this.campList = res.data.data;
                this.campList.forEach((item) => {
                  item.text = item.name;
                  item.value = item.id;
                });
                this.$refs.camp.open();
              })
              .catch((err) => {});
          break;
        case '1' :
          uni.navigateTo({
            url:
                '/pages/wargame/index-v2?verdictRecordId=' +
                this.currRecordId +
                '&isUser=' +
                !this.isAdmin +
                '&campId=' +
                itemCampId
          });
          this.$refs.camp.close();
          this.$refs.isModalVisible.close()
          break;
        case '2' :
          sendMsg(JSON.stringify({ action: 'watchJoinRoom', verdictRecordId: this.currRecordId }));
          uni.navigateTo({
            url: '/pages/wargame/index-v2?verdictRecordId=' + this.currRecordId + '&type=watch'
          });
          this.$refs.camp.close();
          this.$refs.isModalVisible.close()
          break;
        case '3' :
          uni.navigateTo({
            url:
                '/pages/room/create?inviteCode=' +
                this.inviteCode +
                '&verdictRecordId=' +
                this.currRecordId +
                '&campId=' +
                itemCampId
          });
          this.$refs.camp.close();
          this.$refs.isModalVisible.close()
      }
    },
    chooseCamp() {
      if(this.campId === '' || this.userType === 0){
        uni.showToast({
          title: '请选择阵营和角色',
          icon: 'none'
        })
        return;
      }
      console.log(this.userType)
      chooseCamp({ id: this.campId, verdictRecordId: this.currRecordId, userType: this.userType })
          .then((res) => {
            console.log(res)
            if (res.data.code === 200) {
              uni.navigateTo({
                url:
                    '/pages/room/create?inviteCode=' +
                    this.inviteCode +
                    '&verdictRecordId=' +
                    this.currRecordId +
                    '&campId=' +
                    this.campId
              });
              this.$refs.camp.close();
              this.$refs.isModalVisible.close()
            }
            else {
              uni.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
          })
          .catch((err) => {});
    },
  }
}
</script>


<style scoped lang="scss">
.footer-section{
  width: 100%;
  height: 85vh;
  position: relative;
  overflow: hidden;
}
.footer-element{
  position: absolute;
  top: 37%;
  right: 15%;
  z-index: 2;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: var(--main-color);
  text-align: center;
  line-height: 120px;
}
.public-room {
  height: 110px;
  width: 130px;
  background-color: #70ddec;
  border-radius: 50%;
  color: #FFFFFF;
  padding-top: 18px;
  font-size: 40px;
  line-height: 40px;
  animation: zoominoutsinglefeatured 4s linear infinite;
}

.footer-element-one {
  position: absolute;
  top: 24%;
  left: 0;
  opacity: .5;
  //-webkit-animation: zoominoutsinglefeatured 4s linear infinite;
  animation: zoominoutsinglefeatured 4s linear infinite;
}
.footer-element-two {
  position: absolute;
  right: 17%;
  bottom: 10%;
  opacity: .5;
  //-webkit-animation: zoominoutsinglefeatured 3s linear infinite;
  animation: zoominoutsinglefeatured 3s linear infinite;
}
.footer-element-three {
  position: absolute;
  bottom: 60%;
  left: 40%;
  //-webkit-animation: lineThree 8s infinite linear;
  animation: lineThree 8s infinite linear;
}
.footer-element-four {
  position: absolute;
  bottom: 70%;
  left: 43%;
  //-webkit-animation: lineThree 10s infinite linear;
  animation: lineThree 10s infinite linear;
}
.footer-element-five {
  position: absolute;
  bottom: 70%;
  left: 40%;
  //-webkit-animation: lineThree 7s infinite linear;
  animation: lineThree 7s infinite linear;
}
.footer-element-six {
  position: absolute;
  bottom: 80%;
  left: 40%;
  //-webkit-animation: lineThree 7s infinite linear;
  animation: lineThree 7s infinite linear;
}
.footer-element-seven {
  position: absolute;
  bottom: 40%;
  left: 40%;
  //-webkit-animation: lineThree 7s infinite linear;
  animation: lineThree 7s infinite linear;
}
.footer-element-eight {
  position: absolute;
  bottom: 40%;
  left: 20%;
  //-webkit-animation: lineThree 7s infinite linear;
  animation: lineThree 7s infinite linear;
}
.footer-element-nine {
  position: absolute;
  bottom: 40%;
  left: 70%;
  //-webkit-animation: lineThree 7s infinite linear;
  animation: lineThree 7s infinite linear;
}
.footer-element-ten {
  position: absolute;
  bottom: 40%;
  left: 55%;
  //-webkit-animation: lineThree 8s infinite linear;
  animation: lineThree 8s infinite linear;
}
.footer-element-eleven {
  position: absolute;
  bottom: 45%;
  left: 50%;
  //-webkit-animation: lineThree 7s infinite linear;
  animation: lineThree 7s infinite linear;
}
.footer-element-twelve {
  position: absolute;
  bottom: 40%;
  left: 58%;
  //-webkit-animation: lineThree 8s infinite linear;
  animation: lineThree 8s infinite linear;
}
.footer-element-thirteen {
  position: absolute;
  bottom: 80%;
  left: 20%;
  opacity: .5;
  //-webkit-animation: lineThree 8s infinite linear;
  animation: lineThree 8s infinite linear;
}
.footer-element-fourteen {
  position: absolute;
  right: 30%;
  bottom: 40%;
  //-webkit-animation: lineThree 8s infinite linear;
  animation: lineThree 8s infinite linear;
}
.footer-element-fifteen {
  position: absolute;
  right: 33%;
  bottom: 40%;
  //-webkit-animation: lineThree 12s infinite linear;
  animation: lineThree 12s infinite linear;
}
.footer-element-sixteen {
  position: absolute;
  right: 36%;
  bottom: 40%;
  //-webkit-animation: lineThree 10s infinite linear;
  animation: lineThree 10s infinite linear;
}
.footer-element-seventeen {
  position: absolute;
  right: 30%;
  bottom: 45%;
  //-webkit-animation: zoominoutsinglefeatured 3s linear infinite;
  animation: zoominoutsinglefeatured 3s linear infinite;
}
.footer-shape {
  position: absolute;
  right: 70%;
  bottom: 30%;
  opacity: .5;
  //-webkit-animation: zoominoutsinglefeatured 3s linear infinite;
  animation: zoominoutsinglefeatured 3s linear infinite;
}
.container{
  width: 100%;
  padding-right: var(--bs-gutter-x,.75rem);
  padding-left: var(--bs-gutter-x,.75rem);
  margin-right: auto;
  margin-left: auto;
}
/* Keyframes for animations */
@keyframes zoominoutsinglefeatured {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes lineThree {
  0% {
    transform: translateY(0) translateX(0);  /* 起始位置 */
    opacity: 1;  /* 起始时完全可见 */
  }
  15% {
    transform: translateY(30px) translateX(-20px);
    opacity: 0.85;  /* 流星逐渐变得透明 */
  }
  30%{
    transform: translateY(60px) translateX(-40px);
    opacity: 0.7;  /* 流星逐渐变得透明 */
  }
  45%{
    transform: translateY(90px) translateX(-60px);
    opacity: 0.55;  /* 流星逐渐变得透明 */
  }
  60% {
    transform: translateY(120px) translateX(-80px);
    opacity: 0.4;  /* 流星继续变得透明 */
  }
  80% {
    transform: translateY(150px) translateX(-100px);
    opacity: 0.2;  /* 流星继续变得透明 */
  }
  100% {
    transform: translateY(120px) translateX(-100px);
    opacity: 0;  /* 流星完全消失 */
  }
}

.publicroom {
  color: #FFFFFF;
  padding-top: 18px;
  font-size: 40px;
  line-height: 40px;
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(var(--bs-gutter-y) * -1);
  margin-right: calc(var(--bs-gutter-x) * -.5);
  margin-left: calc(var(--bs-gutter-x) * -.5);
}
.row>* {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * .5);
  padding-left: calc(var(--bs-gutter-x) * .5);
  margin-top: var(--bs-gutter-y);
}
.footer-content {
  padding-top: 120px;
  padding-bottom: 120px;
}
h3 {
  font-size: 20px;
}
h2 {
  font-size: 32px;
}
.sub-title {
  color: #4cf5e3;
  margin-left: 10%;
  font-size: 50px;
  font-weight: lighter;
  margin-top: 5vh;
}
.sub-title2 {
  margin-left: 10%;
  margin-top: 5vh;
  font-size: 55px;
  color: white;
  font-weight: lighter;
}
.footer-form {
  display: flex;
  width: 50%;
  height: 8vh;
  margin-top: 60px;
  background-color: #3b4a93;
  margin-left: 10%;
  border-radius: 50px;
  border: 2px solid white;
}
.cmn-input{
  height: 8vh;
  line-height: 8vh;
  margin-left: 5%;
  font-size: 24px;
  width: 60%;
  color: white;
}
.cmn-btn {
  width: 30%;
  margin-left: 5%;
  font-size: 24px;
  position: relative;
  z-index: 1;
  display: inline-block;
  overflow: hidden;
  padding: 0 45px;
  border-radius: 60px;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  font-weight: 500;
  line-height: 8vh;
  transition: all .5s;
  background-image: -moz-linear-gradient(-30deg,#c165dd 0,#5c27fe 100%);
  background-image: -webkit-linear-gradient(-30deg,#c165dd 0,#5c27fe 100%);
  background-image: -ms-linear-gradient(-30deg,#c165dd 0,#5c27fe 100%);
}
.product-item__btn {
  width: 80%;
  margin-left: 10%;
  margin-top: 20px;
  .run__btn {
    background-color: $uni-color-primary;
    color: white;
  }
  .init__btn  {
    background-color: $uni-color-success;
    color: white;
  }
  .watch__btn {
    background-color: $uni-color-success;
    color: white;
  }
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
  height: 35px;
  line-height: 35px;
  background-color: #4cf5e3;
  border-radius: 5px;
  border: 1px solid #1cade4;
  color: black;
}
</style>