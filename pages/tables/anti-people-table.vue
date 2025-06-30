<template>
  <view class="rule__view">
	<view class="title">反人员战斗结果表</view>
    <highlight-table :headers="headers" :data="data" :table-type="tableType"></highlight-table>
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
	  tableType: 'anti', // fire是火力值表，anti是结果表（废弃）
      headers: ['骰子点数', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
      data: [
          ['2', 'S', 'S',  'S', 'K', 'K', 'K', 'K', 'K', 'K'],
          ['3', '·', 'S',  'S', 'S', 'K', 'K', 'K', 'K', 'K'],
          ['4', '·', '·',  '·', 'S', 'S', 'S', 'S', 'K', 'K'],
          ['5', '·', '·',  '·', '·', 'S', 'S', 'S', 'S', 'S'],
          ['6', '·', '·',  '·', '·', '·', 'S', 'S', 'S', 'S'],
          ['7', '·', '·',  '·', '·', '·', '·', 'S', 'S', 'S'],
          ['8', '·', '·',  '·', '·', '·', '·', 'S', 'S', 'S'],
          ['9', '·', '·',  '·', '·', '·', 'S', 'S', 'S', 'S'],
          ['10','·', '·',  '·', '·', 'S', 'S', 'S', 'S', 'K'],
          ['11','·', '·',  'S', 'S', 'S', 'S', 'S', 'K', 'K'],
          ['12', 'S','S',  'S', 'S', 'S', 'S', 'K', 'K', 'K']
      ]
    };
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