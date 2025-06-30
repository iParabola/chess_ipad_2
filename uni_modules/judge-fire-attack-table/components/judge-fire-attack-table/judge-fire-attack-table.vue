<template>
  <view>
    <uni-popup ref="popup" :mask-click="false">
      <view class="rule__view">
        <view class="title">火力打击裁决</view>
        <uni-table border>
          <uni-tr class="rowTitle">
            <uni-td :colspan="3" align="center" class="color-light-pink">确定（指令及装备）</uni-td>
            <uni-td :colspan="3" align="center" class="color-light-yellow">判断（火力打击条件）</uni-td>
            <uni-td :colspan="6" align="center" class="color-light-blue">修正（火力打击）</uni-td>
            <uni-td :colspan="2" align="center" class="color-light-green">裁定（打击结果）</uni-td>
            <uni-td align="center" class="color-orange" width="80" @click="getRandomInt(1, 100)">
              随机值
            </uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center" width="100" class="color-light-pink">指令</uni-td>
            <uni-td align="center" width="70" class="color-light-pink">打击单位</uni-td>
            <uni-td align="center" width="150" class="color-white">
              <uni-data-select
                  v-model="info.attackEquipment"
                  :localdata="selectDataOptions.attackEquipmentRange"
              ></uni-data-select>
            </uni-td>
            <uni-td :rowspan="2" align="center" class="color-light-yellow">通视判定</uni-td>
            <uni-td align="center" class="color-light-yellow">通信距离</uni-td>
            <uni-td align="center" width="120" class="color-white">
              <uni-data-select
                  v-model="info.visibleDistance"
                  :localdata="selectDataOptions.visibleDistanceRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" width="90" class="color-light-blue">攻击值</uni-td>
            <uni-td align="center" width="60" class="color-white">
              <!-- <input type="digit" v-model="info.attackValue" /> -->
              <uni-easyinput type="digit" v-model="info.attackValue" :clearable="false"></uni-easyinput>
            </uni-td>
            <uni-td align="center" width="90" class="color-light-blue">最大射程</uni-td>
            <uni-td align="center" width="60" class="color-white">
              <!-- <input type="digit" v-model="info.maxDistance" /> -->
              <uni-easyinput type="digit" v-model="info.maxDistance" :clearable="false"></uni-easyinput>
            </uni-td>
            <uni-td align="center" width="80" class="color-light-blue">射击距离</uni-td>
            <uni-td align="center" width="60" class="color-white">
              <!-- <input type="digit" v-model="info.hitDistance" /> -->
              <uni-easyinput type="digit" v-model="info.hitDistance" :clearable="false"></uni-easyinput>
            </uni-td>
            <uni-td align="center" width="110" class="color-light-green">基本毁伤效果</uni-td>
            <uni-td
                align="center"
                width="100"
                class="color-white"
                @click="$refs.judgeCorrectTable.open('damageEffect')"
            >
              {{ info.damageEffect }}
            </uni-td>
            <uni-td :rowspan="4" align="center" class="random" @click="getRandomInt(1, 100)">
              {{ info.random }}
            </uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td :rowspan="3" align="center" class="color-white">{{ actionInfo.actionDesc }}</uni-td>
            <uni-td align="center" class="color-light-pink">目标单位</uni-td>
            <uni-td align="center" class="color-white">
              <uni-data-select
                  v-model="info.targetEquipment"
                  :localdata="selectDataOptions.targetEquipmentRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" class="color-light-yellow">通视判定</uni-td>
            <uni-td align="center" class="color-white">
              <uni-data-select
                  v-model="info.visibleDetermine"
                  :localdata="selectDataOptions.visibleDetermineRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" class="color-light-blue">射击距离/最大射程（%）</uni-td>
            <uni-td align="center" class="color-white">{{ info.hitDistanceRate }}</uni-td>
            <uni-td align="center" class="color-light-blue">行动修正</uni-td>
            <uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('moveLevel')">
              {{ info.moveLevel ? '×' + info.moveLevel : '' }}
            </uni-td>
            <uni-td align="center" class="color-light-blue">打击命中率（%）</uni-td>
            <uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('hitRate')">
              {{ info.hitRate }}
            </uni-td>
            <uni-td align="center" class="color-light-green">当前生命值/初始生命值（%）</uni-td>
            <uni-td align="center" class="color-white">{{ info.hpRate }}</uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center" class="color-light-pink">打击单位攻击值</uni-td>
            <uni-td align="center" class="color-white">
              <!-- <input type="digit" v-model="info.fromAttackValue" /> -->
              <uni-easyinput
                  type="digit"
                  v-model="info.fromAttackValue"
                  :clearable="false"
              ></uni-easyinput>
            </uni-td>
            <uni-td :colspan="2" align="center" class="color-light-yellow">情报判定</uni-td>
            <uni-td align="center" class="color-white">
              <uni-data-select
                  v-model="info.intelligenceStatus"
                  :localdata="selectDataOptions.intelligenceStatusRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" class="color-light-blue">打击单位状态修正</uni-td>
            <uni-td
                align="center"
                class="color-white"
                @click="$refs.judgeCorrectTable.open('attackUnitStatus')"
            >
              {{ info.attackUnitStatus ? '×' + info.attackUnitStatus : '' }}
            </uni-td>
            <uni-td align="center" class="color-light-blue">地形修正</uni-td>
            <uni-td align="center" class="color-white" @click="$refs.judgeCorrectTable.open('terrain')">
              {{ info.terrain ? '×' + info.terrain : '' }}
            </uni-td>
            <uni-td align="center" class="color-light-blue">是否命中</uni-td>
            <uni-td align="center" class="color-white">
              <uni-data-select
                  v-model="info.yesOrNo"
                  :localdata="selectDataOptions.yesOrNoRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" class="color-light-green">最终毁伤</uni-td>
            <uni-td align="center" class="color-white">
              <uni-data-select
                  v-model="info.finalDamage"
                  :localdata="selectDataOptions.finalDamageRange"
              ></uni-data-select>
            </uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center" class="color-light-pink">目标单位生命值</uni-td>
            <uni-td align="center" class="color-white">
              <!-- <input type="digit" v-model="info.targetHp" /> -->
              <uni-easyinput type="digit" v-model="info.targetHp" :clearable="false"></uni-easyinput>
            </uni-td>
            <uni-td :colspan="2" align="center" class="color-light-yellow">装备判定</uni-td>
            <uni-td align="center" class="color-white">
              <uni-data-select
                  placement="top"
                  v-model="info.canUse"
                  :localdata="selectDataOptions.canUseRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" class="color-light-blue">目标单位状态修正</uni-td>
            <uni-td
                align="center"
                class="color-white"
                @click="$refs.judgeCorrectTable.open('targetUnitStatus')"
            >
              {{ info.targetUnitStatus ? '×' + info.targetUnitStatus : '' }}
            </uni-td>
            <uni-td align="center" class="color-light-blue">修正后打击命中率（%）</uni-td>
            <uni-td align="center" class="color-white">
              {{ info.resultHitRate }}
            </uni-td>
            <uni-td></uni-td>
            <uni-td></uni-td>
            <uni-td></uni-td>
            <uni-td></uni-td>
          </uni-tr>
          <uni-tr>
            <uni-td class="color-white">备注：</uni-td>
            <uni-td :colspan="14" class="color-white">
              1.未获取情报，则无法进行火力打击，最终无毁伤
              <br />
              2.是否命中根据随机数确定，随机数≤修正后打击命中率，则命中
              <br />
              3.“生命值-毁伤效果”为棋子“当前生命值”，“当前生命值/初始生命值”0~50%为轻损，当前生命值/初始生命值51~75%为中损，当前生命值/初始生命值76~100%为重损
            </uni-td>
          </uni-tr>
        </uni-table>

        <button @click="openNewWindow">打开裁决规则表</button>

        <view class="foot">
          <view style="flex: 1" class="color-blue" @click="confirmJudge">提交裁决</view>
          <view style="flex: 1" @click="close" class="color-red">关闭</view>
        </view>
      </view>
    </uni-popup>
    <judge-correct-table
        :data="fireAttackData"
        ref="judgeCorrectTable"
        @selectData="selectData"
    ></judge-correct-table>
  </view>
</template>
<script>
import BigNumber from 'bignumber.js';
// import { fireAttackData } from '@/static/json/judge-fire-attack-table.js';
// import {
// 	canUseRange,
// 	visibleDetermineRange,
// 	visibleDistanceRange,
// 	intelligenceStatusRange,
// 	yesOrNoRange,
// 	finalDamageRange,
// 	attackEquipmentRange,
// 	targetEquipmentRange
// } from '@/static/json/judge-select-data.js';
import { confirmJudge } from '@/api/verdictRecord.js';
import { getJson } from '@/api/json.js';
export default {
  name: 'judge-fire-attack-table',
  data() {
    return {
      fireAttackData: {},
      selectDataOptions: {},
      // canUseRange: canUseRange,
      // visibleDetermineRange: visibleDetermineRange,
      // visibleDistanceRange: visibleDistanceRange,
      // intelligenceStatusRange: intelligenceStatusRange,
      // yesOrNoRange: yesOrNoRange,
      // finalDamageRange: finalDamageRange,
      // attackEquipmentRange: attackEquipmentRange,
      // targetEquipmentRange: targetEquipmentRange,
      info: {
        canUse: '',
        visibleDetermine: '',
        intelligenceStatus: '',
        hitRate: '',
        resultHitRate: '',
        attackUnitStatus: '',
        targetUnitStatus: '',
        moveLevel: '',
        terrain: '',
        damageEffect: '',
        random: '',
        visibleDistance: '',
        yesOrNo: '',
        finalDamage: '',
        attackEquipment: '',
        targetEquipment: '',
        hitDistanceRate: '',
        hpRate: '',
        maxDistance: '',
        attackValue: '',
        fromAttackValue: '',
        targetHp: ''
      }
    };
  },
  props: {
    actionInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  async mounted() {
    let data = await getJson('/static/json/judge-fire-attack-table.json');
    this.fireAttackData = data;
    let selectDataOptions = await getJson('/static/json/judge-select-data.json');
    this.selectDataOptions = selectDataOptions;
  },
  watch: {
    info: {
      handler(newVal) {
        console.log('获取新数据: ', newVal);
        this.calculate(newVal);
      },
      deep: true
    }
  },
  methods: {
    /* 打开新的窗口 */
    openNewWindow() {
      window.open(
          '/#/pages/tables/index',
          '裁决表窗口',
          'height=600,width=1000,top=300,left=200,toolbar=no,menubar=no, scrollbars=no,resizable=no,location=no, status=no'
      )
    },

    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      this.info.random = Math.floor(Math.random() * (max - min + 1)) + min;
    },
    calculate(newVal) {
      if (this.info.hitDistance && this.info.maxDistance) {
        this.info.hitDistanceRate = Math.round(
            BigNumber(this.info.hitDistance).div(this.info.maxDistance).times(100).toNumber()
        );
        // Math.round((Number(this.info.hitDistance) / Number(this.info.maxDistance)) * 100);
      }
      if (
          this.info.attackUnitStatus !== '' &&
          this.info.targetUnitStatus !== '' &&
          this.info.moveLevel !== '' &&
          this.info.terrain !== '' &&
          this.info.hitRate !== ''
      ) {
        this.info.resultHitRate = Math.round(
            BigNumber(this.info.attackUnitStatus)
                .times(this.info.targetUnitStatus)
                .times(this.info.moveLevel)
                .times(this.info.terrain)
                .times(this.info.hitRate)
                .toNumber()
            // this.info.attackUnitStatus *
            // 	this.info.targetUnitStatus *
            // 	this.info.moveLevel *
            // 	this.info.terrain *
            // 	this.info.hitRate
        );
      }
      if (this.info.targetHp !== '' && this.info.damageEffect !== '') {
        this.info.hpRate = Math.round(
            ((this.info.targetHp - this.info.damageEffect) / this.info.targetHp) * 100
        );
      }

      // this.info.correctValue = Math.round(
      // 	BigNumber(this.info.baseValue)
      // 		.times(this.info.distance)
      // 		.times(this.info.action)
      // 		.times(this.info.from)
      // 		.times(this.info.to)
      // 		.times(this.info.weather)
      // 		.times(this.info.terrain)
      // 		.toNumber()
      // );
      // this.info.baseValue *
      // 	this.info.distance *
      // 	this.info.action *
      // 	this.info.from *
      // 	this.info.to *
      // 	this.info.weather *
      // 	this.info.terrain
    },
    open() {
      this.$refs.popup.open();
      // this.sign();
    },
    close() {
      this.$refs.popup.close();
    },
    selectData(value, type) {
      switch (type) {
        case 'hitRate':
          this.info.hitRate = value;
          break;
        case 'attackUnitStatus':
          this.info.attackUnitStatus = value;
          break;
        case 'targetUnitStatus':
          this.info.targetUnitStatus = value;
          break;
        case 'moveLevel':
          this.info.moveLevel = value;
          break;
        case 'terrain':
          this.info.terrain = value;
          break;
        case 'damageEffect':
          this.info.damageEffect = value;
          break;
        default:
          break;
      }
    },
    confirmJudge() {
      this.actionInfo.actionInfoArray = JSON.stringify(this.info);
      this.actionInfo.attackResult = this.info.finalDamage;
      // this.$emit('confirmJudge', this.info);
      confirmJudge(this.actionInfo).then((res) => {
        console.log('res: ', res);
        if (res.data.code == 200) {
          uni.showToast({
            title: '提交成功！',
            icon: 'none',
            duration: 2000
          });
          setTimeout(() => {
            this.$emit('confirmJudge', res.data.data);
            this.close();
          }, 2000);
        } else {
          uni.showToast({
            title: res.data.msg,
            icon: 'none'
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.rule__view {
  background-color: $uni-bg-color;

  .title {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-weight: bolder;
    background-color: #ffffff;
    font-size: $uni-font-size-title;
    color: #000000;
  }

  .foot {
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-weight: bolder;
    background-color: #1cade4;
    font-size: $uni-font-size-title;
    color: $uni-text-color-inverse;
    display: flex;
    width: auto;
  }
}
</style>
