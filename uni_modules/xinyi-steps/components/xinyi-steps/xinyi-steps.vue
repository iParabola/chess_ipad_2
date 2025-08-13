<template>
	<view class="xinyi-steps">
		<scroll-view
			:scroll-x="direction === 'row'"
			:scroll-y="direction === 'column'"
			:class="[direction === 'column' ? 'xinyi-steps__column' : 'xinyi-steps__row']"
		>
			<view
				:class="[
					direction === 'column' ? 'xinyi-steps__column-text-container' : 'xinyi-steps__row-text-container'
				]"
        style="overflow-x: auto"
			>
				<view v-for="(item, index) in options" :key="index" class="step-container">
					<view
						:class="[
							direction === 'column' ? 'xinyi-steps__column-text' : 'xinyi-steps__row-text',
							index === active
								? 'xinyi-steps-active'
								: index < active
								? 'xinyi-steps-actived'
								: 'xinyi-steps-deactive',
							arrowRight ? 'arrow-right' : ''
						]"
						:style="item.styleBackgroud"
						@click="change($event, index)"
						@longpress="longPress($event, index)"
					>
						<text
							:class="[direction === 'column' ? 'xinyi-steps__column-title' : 'xinyi-steps__row-title']"
						>
							{{ item.title }}
							<!-- {{ clickType == 'stage' && index === active ? '（' + statusDesc + '）' : '' }} -->
						</text>
					</view>
					<view v-if="clickType === 'stage' && index === active" class="stage-status">
						<!-- <uv-subsection :list="list" :current="current" @change="change"></uv-subsection> -->
						<view
							v-for="(subItem, subIndex) in list"
							:key="subIndex"
							class="status-item"
							:style="subItem.styleBackgroud"
						>
							{{ subItem.name }}
						</view>
					</view>
					<view
						v-if="
							initType !== 'watch' &&
							((clickType === 'round' && index <= active && index !== 0) || clickType === 'record')
						"
						class="stage-status"
					>
<!--						<view class="status-item" @click="setScore(campData[0], index)">-->
<!--							{{ campData[0].campName }}打分-->
<!--						</view>-->
<!--						&lt;!&ndash; <view class="status-item">回合分数</view> &ndash;&gt;-->
<!--						<view class="status-item" @click="setScore(campData[1], index)">-->
<!--							{{ campData[1].campName }}打分-->
<!--						</view>-->
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- <uni-popup ref="popup">
			<button type="default">给红方打分</button>
			<button type="default">给蓝方打分</button>
		</uni-popup> -->
	</view>
</template>

<script>
/**
 * Steps 步骤条
 * @description 评分组件
 * @tutorial https://ext.dcloud.net.cn/plugin?id=34
 * @property {Number} active 当前步骤
 * @property {String} direction = [row|column] 当前步骤
 * 	@value row 横向
 * 	@value column 纵向
 * @property {String} activeColor 选中状态的颜色
 * @property {Array} options 数据源，格式为：[{title:'xxx',desc:'xxx'},{title:'xxx',desc:'xxx'}]
 */

export default {
	name: 'XinyiSteps',
	props: {
		direction: {
			// 排列方向 row column
			type: String,
			default: 'row'
		},
		activeColor: {
			// 激活状态颜色
			type: String,
			default: '#2979FF'
		},
		deactiveColor: {
			// 未激活状态颜色
			type: String,
			default: '#B7BDC6'
		},
		active: {
			// 当前步骤
			type: Number,
			default: 0
		},
		options: {
			type: Array,
			default() {
				return [];
			}
		}, // 数据
		arrowRight: {
			type: Boolean,
			default: false
		},
		canClick: {
			type: Boolean,
			default: true
		},
		//record  round  stage
		clickType: {
			type: String,
			default: ''
		},
		isAdmin: {
			type: Boolean,
			default: true
		},
		statusDesc: {
			type: String,
			default: ''
		},
		initType: {
			type: String,
			default: ''
		},
		statusIndex: {
			type: Number,
			default: -1
		},
		campData: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			visible: false,
			top: 0,
			left: 0,
			list: [{ name: '未提交' }, { name: '待裁决' }, {name: '待修正'}],
			current: 2
		};
	},
	watch: {
		statusIndex: {
			handler(newVal) {
				console.log('newVal: ', newVal);
				if (newVal > 0) {
					this.list[0].name = '已提交';
				}
				this.list[newVal].name = this.statusDesc;
				for (let i in this.list) {
					this.list[i].styleBackgroud = this.setStatusBackground(i, newVal);
				}
        console.log('this.list', this.list)
			},
			deep: true
		},
		statusDesc: {
			handler(newVal) {
				this.list[this.statusIndex].name = newVal;
        if (newVal === '已修正'){
          for (let i in this.list) {
            let styles = {};
            styles['background-color'] = '#FF0000';
            let classles = '';
            for (let i in styles) {
              classles += `${i}:${styles[i]};`;
            }
            this.list[i].styleBackgroud = classles
          }
        }
			},
			deep: true
		}
	},
  mounted() {
    console.log(this.campData)
  },
	methods: {
		hexToRgba(hex, alpha = 0.85) {
			const shorthand = /^#([a-f\d])([a-f\d])([a-f\d])$/i;
			hex = hex.replace(shorthand, (m, r, g, b) => '#' + r + r + g + g + b + b);
			const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
			if (!result) return `rgba(0,0,0,${alpha})`;
			const r = parseInt(result[1], 16);
			const g = parseInt(result[2], 16);
			const b = parseInt(result[3], 16);
			return `rgba(${r}, ${g}, ${b}, ${alpha})`;
		},
		change(e, index) {
			if (this.canClick) {
				if (this.clickType === 'round') {
					//管理员回合打分
					this.$emit('click', index, this.clickType, e);
				} else if (this.clickType === 'stage') {
					//阶段点击
				} else {
					//record
					this.$emit('change', index);
					this.setStyle(index);
				}
			}
		},
		setScore(item, index) {
			this.$emit('setScore', item, index);
		},
		longPress(e, index) {
			console.log('longPressindex: 按钮被长按了');
		},
		setStyle(newVal) {
			for (let i in this.options) {
				this.options[i].styleBackgroud = this.setStyleBackgroud(this.options[i], i, newVal);
				// console.log('this.options[i].styleBackgroud: ', this.options[i].styleBackgroud);
			}
			this.$forceUpdate();
		},
		setStyleBackgroud(item, index, active) {
			const activeHex = '#00AA00';
			const activedHex = '#FF0000';
			const deactiveHex = '#B7BDC6';
			let bg = deactiveHex;
			if (parseInt(index) === parseInt(active)) bg = activeHex;
			else if (parseInt(index) < parseInt(active)) bg = activedHex;
			const classles = `background-color:${this.hexToRgba(bg, 0.85)};`;
			return classles;
		},
		setStatusBackground(i, index) {
			const activeHex = '#00AA00';
			const activedHex = '#FF0000';
			const deactiveHex = '#B7BDC6';
			let bg = deactiveHex;
			if (parseInt(index) === parseInt(i)) bg = activeHex;
			else if (parseInt(index) > parseInt(i)) bg = activedHex;
			return `background-color:${this.hexToRgba(bg, 0.85)};`;
		}
	}
};
</script>

<style lang="scss">
$xinyi-primary: #2979ff !default;
$xinyi-border-color: #ededed;
.xinyi-steps {
	/* #ifndef APP-NVUE */
	display: flex;
	width: 100%;
	/* #endif */
	/* #ifdef APP-NVUE */
	flex: 1;
	/* #endif */
	flex-direction: column;
}

.xinyi-steps__row {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
}

.xinyi-steps__column {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row-reverse;
}

.xinyi-steps__row-text-container {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
	align-items: flex-end;
	margin-bottom: 8px;
	text-align: center;
	/* 隐藏横向滚动条但保留拖动/滚动能力 */
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE/Edge */
}
.xinyi-steps__row-text-container::-webkit-scrollbar {
	display: none; /* WebKit */
	width: 0;
	height: 0;
}

.xinyi-steps__column-text-container {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	flex: 1;
}

.xinyi-steps__row-text {
	/* #ifndef APP-NVUE */
	display: inline-flex;
	/* #endif */
	flex: 1;
	flex-direction: column;
	height: 33px;
	justify-content: center;
	align-items: center;
	margin: 10px;
	min-width: 120px;

	padding-left: 20px;
	/* macOS 风并行四边形与圆角 */
	position: relative;
	overflow: hidden;
	border-radius: 14px;
	transform: skewX(-12deg);
	border: 1px solid rgba(255,255,255,0.20);
	box-shadow: 0 6px 12px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.06);
	-webkit-backdrop-filter: saturate(160%) blur(6px);
	backdrop-filter: saturate(160%) blur(6px);
}

.xinyi-steps-actived {
	background-color: #FF0000;
}
.xinyi-steps-active {
	background-color: #00aa00;
}
.xinyi-steps-deactive {
	background-color: #B7BDC6;
}

.arrow-right {
	position: relative;
	padding-right: 44px;
}
.arrow-right:after {
	content: '';
	width: 0px;
	height: 44px;
	position: absolute;
	box-sizing: border-box;
	right: 0;
	border-top: 22px solid #ffffff transparent;
	border-left: 50px solid transparent;
	border-bottom: 22px solid #ffffff transparent;
	z-index: 1;
}

.xinyi-steps__column-text {
	padding: 6px 0px;
	border-bottom-style: solid;
	border-bottom-width: 1px;
	border-bottom-color: $xinyi-border-color;
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	height: 30rpx;
}

.xinyi-steps__row-title {
	line-height: 16px;
	text-align: center;
	color: #ffffff; /* 深色半透明背景上更易读 */
	letter-spacing: 2px;
	min-width: 200px;
	transform: skewX(12deg); /* 抵消外层倾斜，文本保持水平 */
}

.xinyi-steps__column-title {
	text-align: left;
	line-height: 18px;
	color: #ffffff;
}

.xinyi-steps__row-desc {
	font-size: 12px;
	line-height: 14px;
	text-align: center;
}

.xinyi-steps__column-desc {
	font-size: 12px;
	text-align: left;
	line-height: 18px;
}

.xinyi-steps__row-container {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: row;
}

.xinyi-steps__column-container {
	/* #ifndef APP-NVUE */
	display: inline-flex;
	/* #endif */
	width: 30px;
	flex-direction: column;
}

.xinyi-steps__row-line-item {
	/* #ifndef APP-NVUE */
	display: inline-flex;
	/* #endif */
	flex-direction: row;
	flex: 1;
	height: 14px;
	line-height: 14px;
	align-items: center;
	justify-content: center;
}

.xinyi-steps__column-line-item {
	/* #ifndef APP-NVUE */
	display: flex;
	/* #endif */
	flex-direction: column;
	flex: 1;
	align-items: center;
	justify-content: center;
}

.xinyi-steps__row-line {
	flex: 1;
	height: 1px;
	background-color: #b7bdc6;
}

.xinyi-steps__column-line {
	width: 1px;
	background-color: #b7bdc6;
}

.xinyi-steps__row-line--after {
	transform: translateX(1px);
}

.xinyi-steps__column-line--after {
	flex: 1;
	transform: translate(0px, 1px);
}

.xinyi-steps__row-line--before {
	transform: translateX(-1px);
}

.xinyi-steps__column-line--before {
	height: 6px;
	transform: translate(0px, -13px);
}

.xinyi-steps__row-circle {
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: #b7bdc6;
	margin: 0px 3px;
}

.xinyi-steps__column-circle {
	width: 5px;
	height: 5px;
	border-radius: 50%;
	background-color: #b7bdc6;
	margin: 4px 0px 5px 0px;
}

.xinyi-steps__row-check {
	margin: 0px 6px;
}

.xinyi-steps__column-check {
	height: 14px;
	line-height: 14px;
	margin: 2px 0px;
}

.step-container {
	height: 88px;
}

.stage-status {
	height: 33px;
  line-height: 33px;
	display: flex;
	flex-direction: row;
	flex: 1;
	width: 90%;
	margin-left: 10px;
}

.status-item {
	width: 50%;
	height: 33px;
	line-height: 33px;
	background-color: #adadad;
	color: #ffffff;
	text-align: center;
	border-left: solid 1px #ffffff;
}


.xinyi-steps::-webkit-scrollbar {
  width: 8px; /* 滚动条的宽度 */
  height: 8px; /* 滚动条的高度 */
}

.xinyi-steps::-webkit-scrollbar-thumb {
  background: #c1c1c1; /* 滚动条的灰色部分 */
  border-radius: 4px; /* 滚动条的圆角 */
}

.xinyi-steps::-webkit-scrollbar-track {
  background: transparent; /* 滚动条的透明部分 */
}

/* 针对移动端的滚动条美化（以微信小程序为例） */
.scroll-view {
  overflow-x: auto; /* 允许横向滚动 */
}

.scroll-view::-webkit-scrollbar {
  display: none; /* 隐藏默认滚动条 */
}

// .round-status {
// 	height: 200px;
// 	width: 100%;
// 	z-index: 1000;
// 	margin-bottom: 200px;
// }
</style>
