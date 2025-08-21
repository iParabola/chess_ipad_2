<template>
  <view class="rule__view">
	<view class="title">反车辆战斗结果表</view>
    <highlight-table :headers="headers" :data="data" :table-type="tableType" @selectResult="onSelectResult"></highlight-table>
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
      // 监听子表格的选择结果并向上传递
      onSelectResult(value) {
        this.$emit('selectResult', value);
      }
    }
};
</script>

<style lang="scss" scoped>
/* 样式已迁移到 light-table.vue 和 judge-table.scss 中 */
</style>