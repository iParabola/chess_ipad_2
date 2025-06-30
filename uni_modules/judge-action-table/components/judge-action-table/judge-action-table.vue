<template>
  <view>
    <uni-popup ref="popup" :mask-click="false">
      <view class="rule__view">
        <view class="title">机动裁决</view>
        <uni-table border>
          <uni-tr class="rowTitle">
            <uni-td align="center" class="color-light-pink" :colspan="3">确定（指令及装备）</uni-td>
            <uni-td align="center" class="color-light-yellow">判断（机动条件）</uni-td>
            <uni-td align="center" class="color-light-blue">修正（机动值）</uni-td>
            <uni-td align="center" class="color-light-green">裁定（机动结果）</uni-td>
          </uni-tr>
          <uni-tr class="rowTitle">
            <uni-td align="center" class="color-light-pink">确定指令</uni-td>
            <uni-td align="center" class="color-light-pink">装备</uni-td>
            <uni-td align="center" class="color-light-pink">原始机动值</uni-td>
            <uni-td align="center" class="color-light-yellow">装备判定</uni-td>
            <uni-td
                align="center"
                class="color-light-blue"
                @click="$refs.judgeCorrectTable.open('terrain')"
            >
              机动值损耗
            </uni-td>
            <uni-td align="center" class="color-light-green">剩余机动值</uni-td>
            <!-- <uni-td align="center" class="color-yellow">机动结果判定</uni-td> -->
          </uni-tr>
          <uni-tr class="rowTitle" style="height: 100px">
            <uni-td align="center" class="color-white" style="width: 120px; word-wrap: break-word">
              {{ actionInfo.actionDesc }}
            </uni-td>
            <uni-td align="center" width="150" class="color-white">
              <uni-data-select
                  placement="top"
                  v-model="info.equipment"
                  :localdata="selectDataOptions.equipmentRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" class="color-white">
              {{ info.baseValue }}
            </uni-td>
            <uni-td align="center" class="color-white">
              <uni-data-select
                  placement="top"
                  v-model="info.canUse"
                  :localdata="selectDataOptions.canUseRange"
              ></uni-data-select>
            </uni-td>
            <uni-td align="center" class="color-white" @click="$refs.popup3.close()">
              <!-- <input v-model="info.useValue" /> -->
              <uni-easyinput type="digit" v-model="info.useValue" :clearable="false"></uni-easyinput>
            </uni-td>
            <uni-td align="center" class="color-white">{{ info.residueValue }}</uni-td>
            <!-- <uni-td align="center" class="color-white">
              <uni-data-select v-model="info.result" :localdata="resultRange"></uni-data-select>
            </uni-td> -->
          </uni-tr>
        </uni-table>

        <uni-collapse ref="collapse">
          <uni-collapse-item title="打开地形影响表">
            <view class="content">
              <image src="/static/image/judge/机动表.png" class="img-responsive"></image>
            </view>
          </uni-collapse-item>
        </uni-collapse>


        <view class="foot">
          <view style="flex: 1" class="color-blue" @click="confirmJudge">确认裁决</view>
          <view style="flex: 1" @click="close" class="color-red">关闭</view>
        </view>
      </view>
    </uni-popup>

    <judge-correct-table :data="actionData" ref="judgeCorrectTable" @selectData="selectData"></judge-correct-table>
  </view>
</template>
<script>
import BigNumber from 'bignumber.js';
// import { canUseRange, equipmentRange } from '@/static/json/judge-select-data.js';
// import { actionData } from '@/static/json/judge-action-table.js';
import {confirmJudge} from '@/api/verdictRecord.js';
import {getJson} from '@/api/json.js';

export default {
  name: 'judge-action-table',
  data() {
    return {
      actionData: {},
      selectDataOptions: {},
      info: {
        equipment: '',
        baseValue: '',
        canUse: '',
        useValue: '',
        residueValue: '',
        result: ''
      },
      resultRange: [
        { value: '机动失败', text: '机动失败' },
        { value: '机动到目标位置', text: '机动到目标位置' }
      ]
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
    this.actionData = await getJson('/static/json/judge-action-table.json');
    this.selectDataOptions = await getJson('/static/json/judge-select-data.json');
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
    calculate(newVal) {
      if (this.info.baseValue !== '' && this.info.useValue !== '') {
        this.info.residueValue = BigNumber(this.info.baseValue).minus(this.info.useValue).toNumber();
      }
    },
    open() {
      this.$refs.popup.open();
      this.info.baseValue = this.actionInfo.maneuverValue;
      // this.sign();
    },
    close() {
      // this.actionInfo = {};
      this.$refs.popup.close();
    },
    confirmJudge() {
      this.actionInfo.actionInfoArray = JSON.stringify(this.info);
      this.actionInfo.attackResult = this.info.residueValue;
      confirmJudge(this.actionInfo).then((res) => {
        if (res.data.code === 200) {
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

  .example-body {
    flex-direction: column;
    flex: 1;
  }

  .content {
    padding: 15px;
    width: 100%; /* 确保内容容器宽度为100%，这样图片可以对其宽度进行100%响应 */
  }

  .img-responsive {
    width: 700px;
    height: 700px;
  }

  .text {
    font-size: 14px;
    color: #666;
    line-height: 20px;
  }

  .button {
    // margin-top: 10px;
    margin: 10px;
    margin-bottom: 0;
  }

  .centered-image {
    //height: 200px; /* 指定图片的高度 */
    width: auto; /* 宽度等比例放大 */
    //margin: 10px 0; /* 图片上下留出一些空白 */
  }
}
</style>
