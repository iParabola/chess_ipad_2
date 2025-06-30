<template>
	<view>
		<uni-nav-bar
			:border="false"
			shadow
			:title="title"
			:left-icon="leftIcon"
			:right-text="rightText"
			@clickLeft="back"
			@clickRight="beforeLogout"
			background-color="#215E21"
			color="#ffffff"
		></uni-nav-bar>
		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog
				type="warning"
				cancelText="取消"
				confirmText="确认"
				title="提示"
				content="即将退出登录？"
				@confirm="logout"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>
<script>
export default {
	name: 'XinyiNavBar',
	props: {
		title: {
			type: String,
			default: ''
		},
		rightText: {
			type: String,
			default: ''
		},
		leftIcon: {
			type: String,
			defult: ''
		}
	},
	methods: {
		back() {
			if (this.leftIcon) {
				uni.navigateBack();
			}
		},
		beforeLogout() {
			this.$refs.alertDialog.open();
		},
		logout() {
			uni.setStorageSync('token', null);
			uni.setStorageSync('user', null);
			uni.reLaunch({
				url: '/pages/login/login'
			});
		}
	}
};
</script>
<style lang="scss"></style>
