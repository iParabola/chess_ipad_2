<template>
  <view class="rule__view">
	<view class="title">地形影响表</view>
	<view class="content">
		<image src="/static/image/judge/机动表.png" class="img-responsive"></image>
	</view>
  </view>
</template>

<script>

export default {
  components: {
  },
  data() {
    return {

    };
  }
};
</script>

<style lang="scss" scoped>
@import url('@/common/css/judge-table.scss');
.rule__view {
	margin-bottom: 0px; /* 调整间距 */
	background: rgba(26, 46, 26, 0.6); /* 表格背景 */
	border: 1px solid rgba(76, 175, 80, 0.3); /* 边框 */
	border-radius: 8px; /* 圆角 */
	padding: 10px; /* 内边距 */
	box-sizing: border-box;
	color: #e8f5e8; /* 默认文字颜色 */
	font-family: 'Courier New', monospace; /* 科幻字体 */

	.title {
		text-align: center;
		height: auto; /* 自动高度 */
		line-height: 1.5; /* 调整行高 */
		font-weight: bolder;
		background: linear-gradient(90deg, transparent 0%, rgba(76, 175, 80, 0.2) 50%, transparent 100%); /* 标题渐变背景 */
		font-size: 18px; /* 调整字体大小 */
		color: #8bc34a; /* 调整字体颜色 */
		padding: 10px; /* 调整内边距 */
		border-bottom: 1px solid rgba(76, 175, 80, 0.4); /* 底部边框 */
		margin-bottom: 10px; /* 调整间距 */
	}
	
	.content {
		padding: 0px; /* 调整内边距 */
		width: 100%;
		display: flex;
	    justify-content: center;
	    align-items: center;
	    min-height: 300px; /* 确保图片有最小高度显示 */
	    overflow: auto; /* 允许图片内容滚动 */

	    /* 自定义滚动条 */
	    &::-webkit-scrollbar {
	      width: 8px; /* 垂直滚动条宽度 */
	      height: 8px; /* 水平滚动条高度 */
	    }
	    &::-webkit-scrollbar-track {
	      background: rgba(26, 46, 26, 0.8);
	      border-radius: 4px;
	    }
	    &::-webkit-scrollbar-thumb {
	      background: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
	      border-radius: 4px;
	    }
	}
	    
	  .img-responsive {
	    max-width: 100%; /* 适应容器宽度 */
	    height: auto; /* 保持图片比例 */
	    display: block; /* 避免底部空白 */
	    object-fit: contain; /* 确保图片完整显示，不裁剪 */
	}
}
</style>