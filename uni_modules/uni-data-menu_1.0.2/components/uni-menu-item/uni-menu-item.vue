<template>
	<view class="uni-menu-item" :class="{'is-active':active,'is-disabled':disabled}" :style="{paddingLeft:paddingLeft,'color':disabled?'#999':(active?activeTextColor:textColor),'background-color':active?activeBackgroundColor:''}"
	 @click="onClickItem">
		<slot></slot>
	</view>
</template>

<script>
	import rootParent from '../uni-nav-menu/mixins/rootParent.js'
	export default {
		name: 'uniMenuItem',
		mixins: [rootParent],
		props: {
			// 唯一标识
			index: {
				type: [String,Object],
				default(){
					return ''
				}
			},
			// TODO 是否禁用
			disabled: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				active: false,
				activeTextColor: '#42B983',
				textColor: '#303133',
				activeBackgroundColor: ''
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
			if (this.$menuParent) {
				const menuIndex = this.$menuParent.itemChildrens.findIndex(item => item === this)
				this.$menuParent.itemChildrens.splice(menuIndex, 1)
			}
		},
		methods: {
			init() {
				this.rootMenu = {
					NavMenu: [],
					SubMenu: []
				}
				this.indexPath = []
				// 获取直系的所有父元素实例
				this.getParentAll('SubMenu', this)
				// 获取最外层父元素实例
				this.$menuParent = this.getParent('uniNavMenu', this)
				this.$subMenu = this.rootMenu.SubMenu

				this.activeTextColor = this.$menuParent.activeTextColor
				this.textColor = this.$menuParent.textColor
				this.activeBackgroundColor = this.$menuParent.activeBackgroundColor

				// 将当前插入到menu数组中
				if (this.$menuParent) {
					this.$menuParent.itemChildrens.push(this)
					this.$menuParent.isActive(this)
				}
			},

			// 点击 menuItem
			onClickItem(e) {
				if (this.disabled) return
				// 关闭其他已经选中的 itemMenu
				this.$menuParent.closeOtherActive(this)
				this.active = true
				this.indexPath.unshift(this.index)
				this.indexPath.reverse()
				if(e !== 'init'){
					// this.$menuParent.activeIndex=this.index
					this.$menuParent.select(this.index, this.indexPath)
				}
			}

		}
	}
</script>

<style lang="scss">
	.uni-menu-item {
		display: flex;
		align-items: center;
		padding: 0 20px;
		height: 56px;
		width: 100%;
		line-height: 56px;
		color: #c8d9c8 !important; /* 更亮的军绿色白色文字 */
		background-color: rgba(20, 35, 20, 0.8) !important; /* 深军绿色背景 */
		transition: all 0.3s;
		cursor: pointer;
		border-bottom: 1px solid rgba(139, 195, 74, 0.3) !important; /* 明亮绿色分隔线 */
		font-family: 'Courier New', monospace !important; /* 科幻字体 */
		font-size: 15px !important; /* 稍大字体 */
		font-weight: 600 !important; /* 加粗字体 */
		letter-spacing: 1px !important; /* 字母间距 */
	}

	.uni-menu-item:hover {
		outline: none;
		background-color: rgba(76, 175, 80, 0.3) !important; /* 更明显的悬停绿色背景 */
		color: #8bc34a !important; /* 明亮绿色文字 */
		transition: all 0.3s;
		transform: translateX(3px) !important; /* 轻微右移动画效果 */
	}

	.is-active {
		color: #a5d6a7 !important; /* 激活状态更亮的绿色文字 */
		background-color: rgba(76, 175, 80, 0.4) !important; /* 激活状态更明显的绿色背景 */
		border-left: 3px solid #8bc34a !important; /* 左边框高亮 */
	}

	.is-disabled {
		background-color: rgba(20, 35, 20, 0.5) !important;
		color: #666 !important; /* 禁用状态灰色 */
	}

	.uni-menu-item.is-disabled:hover {
		background-color: rgba(20, 35, 20, 0.5) !important;
		color: #666 !important;
		cursor: not-allowed;
		transform: none !important;
	}
</style>
