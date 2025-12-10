<template>
  <view class="container">
	<view class="title">地形影响表</view>
	<view class="content">
		<image 
			src="/static/image/judge/机动表.png" 
			@error="onImageError"
			@load="onImageLoad"
			mode="widthFix"
			style="width: 90%; max-width: 800px;"
		></image>
	</view>
  </view>
</template>

<script>
export default {
  methods: {
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
.container {
	padding: 20px;
	background: #ffffff;
	min-height: 100vh;
}

.title {
	text-align: center;
	font-size: 24px;
	font-weight: bold;
	color: #333333;
	margin-bottom: 30px;
	padding: 15px;
	border-radius: 8px;
}

.content {
	text-align: center;
	padding: 20px;
}
</style>
