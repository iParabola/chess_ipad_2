<template>
  <view class="rule__view">
	<view class="title">反车辆战斗结果表</view>
    <highlight-table :headers="headers" :data="data" :table-type="tableType" @send-data="onChildEvent" ></highlight-table>
  </view>
</template>

<script>
import HighlightTable from './light-table.vue';

export default {
  components: {
    HighlightTable
  },
  data() {
    return {
	  tableType: 'anti', // fire是火力值表，anti是结果表
      headers: ['骰子点数', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'],
      data: [
          ['2', 'Kf', 'Kf', 'Kf', 'Kf', 'Kf', 'Kf', 'Kf', 'Kf', 'Kf', 'K', 'K'],
          ['3', '·', '·',  'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K'],
          ['4', '·', '·',  '·', '·', 'K', 'K', 'K', 'K', 'K', 'K', 'K'],
          ['5', '·', '·',  '·', '·', '·', '·', 'K', 'K', 'K', 'K', 'K'],
          ['6', '·', '·',  '·', '·', '·', '·', '·', '·', 'K', 'K', 'K'],
          ['7', '·', '·',  '·', '·', '·', '·', '·', '·', '·', '·', 'K'],
          ['8', '·', '·',  '·', '·', '·', '·', '·', '·', '·', 'K', 'K'],
          ['9', '·', '·',  '·', '·', '·', '·', '·', 'K', 'K', 'K', 'K'],
          ['10', '·', '·', '·', '·', '·', 'K', 'K', 'K', 'K', 'K', 'K'],
          ['11', '·', '·', '·', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K'],
          ['12', '·', 'Km', 'Km', 'Km', 'Km', 'Km', 'Km', 'Km', 'Km', 'Km', 'Km']
      ]
    };
  },
  methods: {
      // 处理子组件的事件
      onChildEvent(data) {
        this.childData = data;
      }
    }
};
</script>

<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.rule__view {

	.title {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-weight: bolder;
		background-color: #ffffff;
		font-size: $uni-font-size-title;
		color: #000000;
	}
}
</style>