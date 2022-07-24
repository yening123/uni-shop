<template>
	<view class="wrap u-p-20">
		<u-form :model="form" ref="uForm" :rules="formRule" :error-type="['message']" label-width="160">
			<u-form-item label="昵称" prop="name">
				<u-input v-model="form.name" placeholder="请输入昵称" />
			</u-form-item>
			<u-form-item label="邮箱" prop="email">
				<u-input v-model="form.email" placeholder="请输入邮箱" />
			</u-form-item>
			<u-form-item label="密码" prop="password">
				<u-input type="password" v-model="form.password" placeholder="请输入密码" />
			</u-form-item>
			<u-form-item label="确认密码" prop="password_confirmation">
				<u-input type="password" v-model="form.password_confirmation" placeholder="请输入确认密码" />
			</u-form-item>
		</u-form>
		<u-button class="u-m-t-30 ubutton" type="primary" @click="register">注册</u-button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			form: {
				name: '', // 昵称
				email: '', // 邮箱
				password: '', // 密码
				password_confirmation: '', // 确认密码
			},
			// 表单验证规则
			formRule: {
				name: [{
					required: true,
					message: '请输入昵称',
					trigger: ['change', 'blur']
				}],
				email: [{
					required: true,
					message: '请输入邮箱',
					trigger: ['change', 'blur']
				},
				{
					validator: (rule, value, callback) => {
						return this.$u.test.email(value);
					},
					message: '邮箱格式不正确',
					trigger: ['change', 'blur'],
				}
				],
				password: [{
					required: true,
					message: '请输入密码',
					trigger: ['change', 'blur']
				}],
				password_confirmation: [{
					required: true,
					message: '请输入确认密码',
					trigger: ['change', 'blur']
				}, {
					validator: (rule, value, callback) => {
						if (this.form.password !== value) {
							return false;
						}
						return true;
					},
					message: '确认密码和密码不一致',
					trigger: ['change', 'blur'],
				}]
			}
		}
	},
	onReady() {
		this.$refs.uForm.setRules(this.formRule)
	},
	methods: {
		register() {
			// console.log('注册');
			this.$refs.uForm.validate(async valid => {
				if (!valid) return false;
				// 调用接口
				this.$u.api.authRegister(this.form)

				//跳转到登录页面
				this.$u.route({
					type: 'reLaunch',
					url: 'pages/auth/login'
				})

				this.$u.toast('注册成功')
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wrap {
	font-size: 28rpx;

	.ubutton {
		background-color: #d4237a !important;
	}

	.content {
		width: 600rpx;
		margin: 80rpx auto 0;

		.title {
			text-align: left;
			font-size: 60rpx;
			font-weight: 500;
			margin-bottom: 40rpx;
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
			background-color: $u-type-primary;
			color: #fff;
			border: none;
			font-size: 30rpx;
			padding: 12rpx 0;

			&::after {
				border: none;
			}
		}
	}
}
</style>
