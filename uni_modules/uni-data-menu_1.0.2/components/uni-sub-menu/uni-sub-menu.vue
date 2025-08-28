<template>
	<view class="uni-sub-menu">
		<view class="uni-sub-menu__title"  :class="{'is-disabled':disabled}" :style="{paddingLeft:paddingLeft}" @click="select">
			<view class="uni-sub-menu__title-sub" :style="{color:disabled?'#999':textColor}">
				<slot name="title"></slot>
			</view>
			<uni-icons class="uni-sub-menu__icon" :class="{transition:isOpen}" type="arrowdown" color="#bbb" size="14"></uni-icons>
		</view>
		<view class="uni-sub-menu__content" :class="{'uni-sub-menu--close':!isOpen}" :style="{'background-color':backgroundColor}">
			<view id="content--hook">
				<slot></slot>
			</view>
		</view>
	</view>
</template>

<script>
	import rootParent from '../uni-nav-menu/mixins/rootParent.js'
	export default {
		name: 'uniSubMenu',
		mixins: [rootParent],
		props: {
			// 唯一标识
			index: {
				type: [String,Object],
				default(){
					return ''
				}
			},
			// TODO 自定义类名
			popperClass: {
				type: String,
				default: ''
			},
			// TODO 是否禁用
			disabled: {
				type: Boolean,
				default: false
			},
			// 展开菜单的背景色
			backgroundColor: {
				type: String,
				default: '#f5f5f5'
			},
		},
		data() {
			return {
				height: 0,
				oldheight: 0,
				isOpen: false,
				textColor:'#303133'
			};
		},
		computed: {
			paddingLeft() {
				return 20 + 20 * this.rootMenu.SubMenu.length + 'px'
			}
		},
		created() {
			this.init()
		},
		destroyed() {
			// 销毁页面后，将当前页面实例从数据中删除
			if (this.$menuParent) {
				const menuIndex = this.$menuParent.subChildrens.findIndex(item => item === this)
				this.$menuParent.subChildrens.splice(menuIndex, 1)
			}
		},
		methods: {
			init() {
				// 所有父元素
				this.rootMenu = {
					NavMenu: [],
					SubMenu: []
				}
				this.childrens = []
				this.indexPath = []
				// 获取直系的所有父元素实例
				this.getParentAll('SubMenu', this)
				// 获取最外层父元素实例
				this.$menuParent = this.getParent('uniNavMenu', this)
				this.textColor = this.$menuParent.textColor
				// 直系父元素 SubMenu
				this.$subMenu = this.rootMenu.SubMenu

				// 将当前插入到menu数组中
				if(this.$menuParent){
					this.$menuParent.subChildrens.push(this)
				}
			},
			select() {
				if(this.disabled) return
				// 手动开关 sunMenu
				this.$menuParent.selectMenu(this)
			},
			open() {
				this.isOpen = true
			},
			close() {
				this.isOpen = false
			}
		}
	}
</script>

<style lang="scss">
	.uni-sub-menu {
		position: relative;
		background-color: rgba(15, 25, 15, 0.9) !important; /* 更深的军绿色背景 */
	}

	.uni-sub-menu__title {
		display: flex;
		align-items: center;
		padding: 0 5px;
		padding-right: 5px;
		height: 56px;
		width: 90%; // 改侧边栏宽度
		line-height: 56px;
		color: #c8d9c8 !important; /* 更亮的军绿色白色文字 */
		background-color: rgba(25, 40, 25, 0.8) !important; /* 深军绿色背景 */
		cursor: pointer;
		border-bottom: 1px solid rgba(139, 195, 74, 0.3) !important; /* 明亮绿色分隔线 */
		font-family: 'Courier New', monospace !important; /* 科幻字体 */
		font-size: 15px !important; /* 稍大字体 */
		font-weight: 600 !important; /* 加粗字体 */
		letter-spacing: 1px !important; /* 字母间距 */
	}

	.uni-sub-menu__title:hover {
		color: #8bc34a !important; /* 明亮绿色文字 */
		background-color: rgba(76, 175, 80, 0.25) !important; /* 更明显的悬停绿色背景 */
		outline: none;
		transform: translateX(2px) !important; /* 轻微右移动画效果 */
	}

	.uni-sub-menu__title-sub {
		display: flex;
		align-items: center;
		flex: 1;
		color: inherit !important; /* 继承父元素颜色 */
	}

	.uni-sub-menu--close {
		height: 0;
		/* transition: all 0.3s; */
	}

	.uni-sub-menu__content {
		overflow: hidden;
		background-color: rgba(15, 30, 15, 0.9) !important; /* 更深的子菜单内容背景 */
		border-left: 2px solid rgba(139, 195, 74, 0.4) !important; /* 左边框 */
	}

	.uni-sub-menu__icon {
		max-height: auto;
		transition: all 0.2s;
		color: #a5d6a7 !important; /* 更亮的展开图标绿色 */
		font-size: 16px !important; /* 稍大的图标 */
	}

	.transition {
		transform: rotate(-180deg);
		color: #8bc34a !important; /* 展开时的图标颜色 */
	}

	.is-disabled {
		background-color: rgba(20, 35, 20, 0.5) !important;
		color: #666 !important; /* 禁用状态灰色 */
	}
	
	.uni-sub-menu__title.is-disabled:hover {
		background-color: rgba(20, 35, 20, 0.5) !important;
		color: #666 !important;
		cursor: not-allowed;
		transform: none !important;
	}
</style>
