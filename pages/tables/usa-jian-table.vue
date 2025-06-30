<template>
  <view class="rule__view">
	<view class="title">美方间瞄射击数据表</view>
    <!-- <highlight-table :headers="headers" :data="data" :table-type="tableType"></highlight-table> -->
	<view class="content">
		<image src="/static/image/judge/usa-jian.jpg" class="img-responsive"></image>
	</view>

	<view class="title">美方间瞄射击结果表</view>
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
      headers: ['骰子点数', '2', '3', '4', '5', '6', '7', '8', '9', '10-15', '>16'],
      data: [
		  ["2", "S", "S", "S", "S", "S", "K", "K", "K", "K", "K"],
		  ["3", "S", "S", "K", "K", "K", "K", "K", "K", "K", "K"],
		  ["4", '・', '・', '・',  "S", "S", "S", "S", "K", "K", "K"],
		  ["5", '・', '・', '・', '・', "S", "S", "S", "S", "K", "K"],
		  ["6", '・', '・', '・', '・', '・', '・', "S", "S", "S", "K"],
		  ["7", '・', '・', '・', '・', '・', '・', "S", "S", "S", "Kms"],
		  ["8", '・', '・', '・', '・', '・', "S", "S", "S", "S", "Kms"],
		  ["9", '・', '・', '・', '・', "S", "S", "S", "S", "Kms", "Kms"],
		  ["10", "・", "・", "・", "S", "S", "S", "S", "Kms", "Kms", "Kms"],
		  ["11", "・", "・", "S", "S", "S", "Kms", "Kms", "Kms", "Kms", "K"],
		  ["12", "・",  "S", "S", "S", "Kms", "Kms", "Kms", "Kms", "K", "K"]
	  ]
    };
  }
};
</script>

<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.rule__view {

	margin-bottom: 100px;

	.title {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-weight: bolder;
		background-color: #ffffff;
		font-size: $uni-font-size-title;
		color: #000000;
	}

	.content {
		padding: 15px;
		width: 100%;
		display: flex;
	    justify-content: center;
	    align-items: center;
	}

	  .img-responsive {
	    width: 700px;
	    height: 700px;
	}
}
</style>
