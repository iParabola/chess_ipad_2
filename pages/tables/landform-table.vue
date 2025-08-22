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
	min-height: 100vh;
	background: linear-gradient(135deg, #1a2e1a 0%, #2d4a2d 100%);
	font-family: 'Courier New', monospace;
}

.title {
	text-align: center;
	font-size: 24px;
	font-weight: bold;
	color: #8bc34a;
	margin-bottom: 30px;
	padding: 15px;
	background: linear-gradient(90deg, transparent 0%, rgba(139, 195, 74, 0.2) 50%, transparent 100%);
	border: 1px solid rgba(139, 195, 74, 0.4);
	border-radius: 8px;
	text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.content {
	text-align: center;
	padding: 20px;
	background: rgba(26, 46, 26, 0.6);
	border: 1px solid rgba(139, 195, 74, 0.3);
	border-radius: 12px;
	box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}

.content image {
	border: 2px solid rgba(139, 195, 74, 0.6);
	border-radius: 8px;
	background: #ffffff;
	box-shadow: 0 6px 20px rgba(139, 195, 74, 0.3);
	transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.content image:hover {
	transform: scale(1.02);
	box-shadow: 0 8px 30px rgba(139, 195, 74, 0.5);
}
</style>