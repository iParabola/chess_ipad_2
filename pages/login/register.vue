<template>
	<view class="xinyi-content">

		<view class="register-form__view">
			<view class="register-top__view">
				<view class="register-title__view">新用户注册</view>
			</view>
			<uni-forms class="form" ref="regForm" :modelValue="user" label-width="80px" :rules="rules">
				<uni-forms-item label="姓名"  required name="userName">
					<uni-easyinput
						v-model="user.userName"
						placeholder="请输入姓名"
						clearable
						trim
						primaryColor="#215e21"
					></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="密码" required name="password">
					<uni-easyinput
						v-model="user.password"
						placeholder="请输入密码"
						type="password"
						clearable
						trim
						primaryColor="#215e21"
					></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="确认密码" required name="confirmPassword">
					<uni-easyinput
						v-model="user.confirmPassword"
						placeholder="请确认密码"
						type="password"
						trim
						:errorMessage="user.password != user.confirmPassword"
						primaryColor="#215e21"
						@blur="checkConfirmPwd"
					></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="手机号" required name="mobile">
					<uni-easyinput
						v-model="user.mobile"
						placeholder="请输入手机号"
						trim
						primaryColor="#215e21"
					></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="昵称" required name="nickName">
					<uni-easyinput
						v-model="user.nickName"
						placeholder="请输入昵称"
						clearable
						trim
						primaryColor="#215e21"
					></uni-easyinput>
				</uni-forms-item>

				<uni-forms-item label="介绍" required name="institution">
					<uni-easyinput
						v-model="user.institution"
						placeholder="请输入介绍"
						clearable
						trim
						primaryColor="#215e21"
					></uni-easyinput>
				</uni-forms-item>
			</uni-forms>

      <button class="register__btn" hover-class="register-hover" type="primary" @click="register()">注 册</button>
      <view class="back-to-login__text" @click="redirectToLogin">返回登录</view>

    </view>
	</view>
</template>

<script>
import { register } from '@/api/user.js';
export default {
	data() {
		return {
			user: {
				permission: 'normal'
			},
			// 校验规则
			rules: {
				userName: {
					rules: [
						{
							required: true,
							errorMessage: '姓名不能为空'
						}
					]
				},
				password: {
					rules: [
						{
							required: true,
							errorMessage: '密码不能为空'
						}
					]
				},
				mobile: {
					rules: [
						{
							required: true,
							errorMessage: '手机号不能为空'
						}
					]
				},
				nickName: {
					rules: [
						{
							required: true,
							errorMessage: '昵称不能为空'
						}
					]
				},
				institution: {
					rules: [
						{
							required: true,
							errorMessage: '介绍不能为空'
						}
					]
				}
			}
		};
	},
	onReady() {
		// 需要在onReady中设置规则
		this.$refs.regForm.setRules(this.rules);
	},
	methods: {
		register() {
			this.$refs.regForm
				.validate()
				.then((res) => {
					register(this.user)
						.then((res) => {
							if (res.data.code == 200) {
								this.user = {};
								uni.showToast({
									title: '注册成功',
									icon: 'none',
									complete() {
										setTimeout(function () {
											uni.reLaunch({
												url: '/pages/login/login'
											});
										}, 1000);
									}
								});
							}
						})
						.catch((err) => {});
				})
				.catch((err) => {});
		},

		// 检查确认密码
		checkConfirmPwd() {
			if (this.user.password != this.user.confirmPassword) {
				uni.showToast({
					title: '两次输入密码不一致',
					icon: 'none'
				});
				return false;
			}
		},
    redirectToLogin() {
      uni.reLaunch({
        url: '/pages/login/login'
      });
    }
	}
};



</script>

<style lang="scss" scoped>

.xinyi-content {
  background: linear-gradient(135deg, #0f2027, #203a43, #2c5364);
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 20rpx;
}
.register-form__view {
  position: relative;
  width: 50%;
  padding: 20rpx 30rpx;
  margin-top: 0;
  background: rgba(0, 20, 30, 0.7);
  border: 1px solid rgba(0, 240, 255, 0.3);
  border-radius: 16px;
  box-shadow:
      0 0 15px rgba(0, 217, 235, 0.3),
      inset 0 0 10px rgba(0, 217, 235, 0.1);
  backdrop-filter: blur(10px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg,
        rgba(0, 217, 235, 0),
        rgba(0, 217, 235, 0.5),
        rgba(0, 217, 235, 0));
    z-index: -1;
    border-radius: 18px;
    animation: border-glow 3s infinite alternate;
  }
  .register-top__view {
    margin-bottom: 10rpx;
    width: 100%;
    text-align: center;
    .register-title__view {
      font-size: 15rpx;
      font-weight: bold;
      background: linear-gradient(to right, #00ddeb, #00a6b3);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      text-shadow: 0 0 10px rgba(0, 217, 235, 0.4);
      letter-spacing: 2rpx;
      position: relative;
      padding-bottom: 8rpx;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 25%;
        width: 50%;
        height: 2px;
        background: linear-gradient(to right,
            transparent,
            rgba(0, 217, 235, 0.8),
            transparent);
      }
    }
  }

  .form {
    width: 75%;

    // 修复标签颜色问题 - 使用更精确的选择器
    //:deep(.uni-forms-item) {
    //  .uni-forms-item__label {
    //    color: #00ddeb !important; // 使用纯色确保覆盖
    //    text-shadow: 0 0 5px rgba(0, 217, 235, 0.6) !important;
    //    opacity: 0.9 !important;
    //    font-weight: bold;
    //  }
    //}

    //// 修复输入框样式 - 使用更精确的选择器
    //:deep(.uni-easyinput) {
    //  .uni-easyinput__content {
    //    background: rgba(0, 30, 40, 0.5) !important;
    //    border: 1px solid rgba(0, 217, 235, 0.4) !important;
    //    border-radius: 8px;
    //    color: #fff !important;
    //    transition: all 0.3s ease;
    //
    //    &:hover {
    //      border-color: rgba(0, 217, 235, 0.8) !important;
    //      box-shadow: 0 0 10px rgba(0, 217, 235, 0.3);
    //    }
    //
    //    &:focus-within {
    //      border-color: #00ddeb !important;
    //      box-shadow: 0 0 15px rgba(0, 217, 235, 0.5);
    //    }
    //  }
    //
    //  .uni-easyinput__placeholder-class {
    //    color: rgba(200, 220, 230, 0.6) !important;
    //  }
    //}
  }


  .register__btn {
    font-size: 18px;
    width: 50%;
    height: 20rpx;
    background: linear-gradient(to right, #00ddeb, #007a82);
    color: #fff;
    border: none;
    position: relative;
    overflow: hidden;
    box-shadow:
        0 0 15px rgba(0, 217, 235, 0.5),
        inset 0 0 10px rgba(255, 255, 255, 0.2);
    transition: all 0.3s ease;
    letter-spacing: 4rpx;
    font-weight: bold;
    z-index: 1;


    display: flex; /* Enables flexbox */
    justify-content: center; /* Centers text horizontally */
    align-items: center;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
              90deg,
              transparent,
              rgba(255, 255, 255, 0.3),
              transparent
      );
      transition: all 0.5s ease;
      z-index: -1;
    }

    &:hover::before,
    &:active::before {
      left: 100%;
    }
  }

  .register-hover {
    transform: scale(1.05);
    box-shadow:
        0 0 25px rgba(0, 217, 235, 0.8),
        inset 0 0 15px rgba(255, 255, 255, 0.3);
  }

  .back-to-login__text {
    position: absolute;
    bottom: 5rpx;  // 增加底部间距
    right: 5rpx;   // 增加右侧间距
    margin-top: 5rpx;
    color: rgba(0, 217, 235, 0.8);
    font-size: 14px; // 添加固定字体大小
    cursor: pointer;
    text-decoration: none; // 添加下划线
    transition: all 0.3s ease;
    text-shadow: 0 0 5px rgba(0, 217, 235, 0.3);


    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      right: 0; // 从右下角开始
      width: 0;
      height: 1px;
      background: #00ddeb;
      transition: width 0.3s ease;
    }

    &:hover {
      color: #00ddeb;
      text-shadow: 0 0 10px rgba(0, 217, 235, 0.6);
      &::after {
        width: 100%; // 动画展开到100%宽度
        left: 0; // 覆盖整个文字区域
        right: auto; // 重置右侧定位
      }

    }
  }

}
@keyframes border-glow {
  0% {
    opacity: 0.3;
  }
  100% {
    opacity: 0.8;
  }
}

</style>
