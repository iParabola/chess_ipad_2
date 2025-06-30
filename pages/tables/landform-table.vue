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
	    height: 800px;
	}
}
</style>