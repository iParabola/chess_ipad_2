<template>
	<!-- 骰子组件 -->
	<view class="dice-wrap">
		<!-- 筛子运动时候的展示的图片 -->
		<image v-if="isDicing" :src="diceAnimationImages[aniIndex]" class="dice-icon"></image>
		<!-- 筛子运动时候的展示的图片 -->

		<!-- 筛子静止时候的显示的对应点数的图片 -->
		<image v-else :src="diceImages[currentPoint]" class="dice-icon"></image>
		<!-- 筛子静止时候的显示的对应点数的图片 -->
	</view>
	<!-- 骰子组件 -->
</template>

<script>
export default {
	data() {
		return {
			//是否正在掷筛子
			isDicing: false,
			//当前显示的动画图片索引
			aniIndex: 0,
			//掷筛子动画所用到的图片(4张骰子旋转过程中的图)
			diceAnimationImages: [
				'/static/image/dice/动A.png',
				'/static/image/dice/动B.png',
				'/static/image/dice/动C.png',
				'/static/image/dice/动D.png'
			],
			//骰子每一个点的对应的图片
			diceImages: {
				//1点的图片
				1: '/static/image/dice/1点.png',
				//2点的图片
				2: '/static/image/dice/2点.png',
				//3点的图片
				3: '/static/image/dice/3点.png',
				//4点的图片
				4: '/static/image/dice/4点.png',
				//5点的图片
				5: '/static/image/dice/5点.png',
				//6点的图片
				6: '/static/image/dice/6点.png'
			},
			//当前掷筛子掷到的点数（默认1点）
			currentPoint: 1,
			//定时器
			timer: null
		};
	},
	beforeDestroy() {
		//组件销毁之前清除定时器
		clearInterval(this.timer);
	},
	methods: {
		//掷骰子
		async throwDice(value) {
			//如果当前骰子正在滚动则不能掷骰子
			if (this.isDicing) {
				return;
			}
			//从1~6随机一个数
			// this.currentPoint = Math.floor(Math.random() * 6 + 1);
			console.log(value);
			this.currentPoint = value;
			//开启骰子动画
			await this.startAnimation();
			//动画完毕之后可以通知父组件当前掷到的点数
			this.$emit('finish', this.currentPoint);
		},
		//开启动画效果
		async startAnimation() {
			return new Promise((resolve) => {
				//设置筛子开始运动
				this.isDicing = true;
				// 随机初始值
				this.aniIndex = Math.floor(Math.random() * 4 + 1);
				//记录动画次数
				let num = 0;
				//每隔200毫秒来回切换一张“动”图形成掷骰子的动画
				this.timer = setInterval(() => {
					let index = this.aniIndex;
					index++;
					if (index >= this.diceAnimationImages.length) {
						index = 0;
					}
					this.aniIndex = index;
					num++;
					//差不多执行1.6秒钟的时候可以停止了
					if (num > 8) {
						//关闭定时器
						clearInterval(this.timer);
						//设置骰子停止
						this.isDicing = false;
						//返回结果
						resolve(true);
					}
				}, 200);
			});
		}
	}
};
</script>

<style lang="scss">
.dice-wrap {
	.dice-icon {
		width: 100px;
		height: 100px;
	}
}
</style>
