<template>
	<view class="wrap">
		<view class="top"></view>
		<view class="content">
			<view class="title">欢迎来到图书商城</view>
			<input class="u-border-bottom" v-model="form.email" placeholder="请输入邮箱" />
			<input class="u-border-bottom" type="password" v-model="form.password" placeholder="请输入密码" />
			<button @tap="submit" :style="[inputStyle]" class="getCaptcha">登录</button>
			<view class="alternative">
				<view class="password">找回密码</view>
				<view class="issue" @click="toRegister">注册</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {

	data() {
		return {
			form: {
				email: 'test@a.com',
				password: '123123'
			},
		}
	},
	computed: {
		inputStyle() {
			let style = {};
			if (this.$u.test.email(this.form.email) && this.form.password) {
				style.color = "#fff";
				style.backgroundColor = "#d4237a";
			}
			return style;
		}
	},
	methods: {
		//提交登录信息
		async submit() {
			if (!this.$u.test.email(this.form.email) || !this.form.password) return //不符合格式时点了没作用

			const res = await this.$u.api.authLogin(this.form);

			//将token存到vuex中
			this.$u.vuex('vuex_token', res.access_token);
			this.$u.toast('登录成功')

			//拿到user的数据
			// const LoginRef = await this.$u.api.userMsg({ email: this.form.email });
			// this.$u.vuex('vuex_user', LoginRef);
			this.$u.utils.getUserInfo();

			const path = uni.getStorageSync('back_path') || 'pages/my/my';


			setTimeout(() => {
				this.$u.route({
					type: 'reLaunch',
					url: path
				})
			}, 1000)

		},
		toRegister() {
			this.$u.route({
				type: 'navigateTo',
				url: '/pages/auth/register'
			})
		}
	}
};
</script>

<style lang="scss" scoped>
.wrap {
	.u-border-bottom {
		margin-top: 30rpx !important;
	}


	.getCaptcha {
		margin-top: 50rpx !important;
	}

	font-size: 28rpx;

	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 100rpx;
		}

		input {
			text-align: left;
			margin-bottom: 10rpx;
			padding-bottom: 6rpx;
		}

		.tips {
			color: $u-type-info;
			margin-bottom: 60rpx;
			margin-top: 8rpx;
		}

		.getCaptcha {
			background-color: #f599bf;
			color: #ffffff;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;

			&::after {
				border: none;
			}
		}

		.alternative {
			color: $u-tips-color;
			display: flex;
			justify-content: space-between;
			margin-top: 30rpx;
		}
	}

	.buttom {
		.loginType {
			display: flex;
			padding: 350rpx 150rpx 150rpx 150rpx;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				color: $u-content-color;
				font-size: 28rpx;
			}
		}

		.hint {
			padding: 20rpx 40rpx;
			font-size: 20rpx;
			color: $u-tips-color;

			.link {
				color: $u-type-warning;
			}
		}
	}
}
</style>
