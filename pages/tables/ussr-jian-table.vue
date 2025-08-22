<template>
  <view class="jian-container">
	<view class="jian-title">苏方间瞄射击数据表</view>
	<view class="image-content">
		<image 
			src="/static/image/judge/ussr-jian.jpg" 
			@error="onImageError"
			@load="onImageLoad"
			mode="widthFix"
			style="width: 90%; max-width: 800px;"
		></image>
	</view>

	<view class="jian-title">苏方间瞄射击结果表</view>
	<view class="table-content">
		<highlight-table :headers="headers" :data="data" :table-type="tableType" @selectResult="onSelectResult"></highlight-table>
	</view>
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
  },
  methods: {
      // 监听子表格的选择结果并向上传递
      onSelectResult(value) {
        this.$emit('selectResult', value);
      },
      // 图片加载事件处理
      onImageError(e) {
        console.error('图片加载失败:', e);
        uni.showToast({
          title: '图片加载失败',
          icon: 'none'
        });
      },
      onImageLoad(e) {
        console.log('图片加载成功:', e);
      }
    }
};
</script>

<style lang="scss" scoped>
.jian-container {
	padding: 20px;
	min-height: 100vh;
	background: linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 100%);
	font-family: 'Courier New', monospace;
}

.jian-title {
	text-align: center;
	font-size: 20px;
	font-weight: bold;
	color: #8bc34a;
	margin-bottom: 20px;
	padding: 12px;
	background: linear-gradient(90deg, transparent 0%, rgba(139, 195, 74, 0.2) 50%, transparent 100%);
	border: 1px solid rgba(139, 195, 74, 0.4);
	border-radius: 8px;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.image-content {
	text-align: center;
	padding: 20px;
	margin-bottom: 30px;
	background: rgba(26, 46, 26, 0.6);
	border: 1px solid rgba(139, 195, 74, 0.3);
	border-radius: 12px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.image-content image {
	border: 2px solid rgba(139, 195, 74, 0.6);
	border-radius: 8px;
	background: #ffffff;
	box-shadow: 0 6px 20px rgba(139, 195, 74, 0.3);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.image-content image:hover {
	transform: scale(1.02);
	box-shadow: 0 8px 30px rgba(139, 195, 74, 0.5);
}

.table-content {
	background: rgba(26, 46, 26, 0.6);
	border: 1px solid rgba(139, 195, 74, 0.3);
	border-radius: 12px;
	padding: 15px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
</style>
