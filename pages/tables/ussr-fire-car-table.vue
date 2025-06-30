<template>
	<view class="rule__view">
		<view class="title">火力单位对美军车辆攻击效果评价表</view>
	  <fire-table :headers="headers" :data="data"
	    :fire_headers1="fire_headers1" :fire_headers2="fire_headers2"></fire-table>
	</view>
</template>

<script>
import HighlightTable from './light-table.vue';
import FireTable from './fire-table.vue';

export default {
  components: {
    HighlightTable,
	FireTable
  },
  data() {
    return {
	  tableType: 'fire', // fire是火力值表，anti是结果表（废弃）
      headers: ['苏射击', '美目标', ],
	  fire_headers1: ['', '距离（米）', '50', '100', '150', '200', '250', '300', '350', '400', '450', '500', '750', '1000', '1500', '2000', '2500', '3000'],
	  fire_headers2: ['', '六边格数量', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11~15', '16~20', '21~30', '31~40', '41~50', '51~60'],
      data: [
		  // 手工输入，数据可能有错
          ['RPG7', 'Tank', 8, 7, 6, 5, 3, 3, 2, 2, 1, 1, '*', '*', '*', '*', '*', '*'],
          ['RPG7', 'APC', 9, 8, 7, 6, 4, 4, 4, 3, 2, 2, '*', '*', '*', '*', '*', '*'],
          ['SPG9', 'Tank', 8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 6, 4, '*', '*', '*', '*'],
          ['SPG9', 'APC', 8, 8, 8, 8, 7, 7, 7, 7, 7, 7, 6, 6, '*', '*', '*', '*'],
          ['T62', 'Tank', 10, 10, 10, 10, 9, 9, 9, 9, 9, 9, 9, 8, 7, 6, 4, 2],
          ['T62', 'APC', 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 8, 6, 4, 3, 2],
          ['BMP(gun)', 'Tank', 8, 8, 8, 8, 8, 8, 7, 7, 7, 6, 5, 3, 1, '*', '*', '*'],
          ['BMP(gun)', 'APC', 8, 8, 8, 8, 8, 8, 7, 7, 7, 6, 5, 3, 2, '*', '*', '*'],
          ['Sagger', 'Tank or APC', '*', '*', '*', '*', '*', '*', '*', '*', 6, 7, 7, 9, 9, 9, 9, 9],
          ['XMBT', 'Tank', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 8, 8],
          ['XMBT', 'APC', 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 9, 8, 5]
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