<template>
	<u-form :model="form" ref="uForm" class="u-p-l-40 u-p-r-40" :error-type="errorType">
		<u-form-item label="昵称" prop="name" required :border-bottom="false">
			<u-input v-model="form.name" />
		</u-form-item>
		<u-button shape="circle" @click="submit" class="u-m-t-50">提交</u-button>
	</u-form>
</template>

<script>
export default {
	// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
	onReady() {
		this.$refs.uForm.setRules(this.rules);
	},
	onShow() {
		this.$u.utils.isAndroid();
	},
	data() {
		return {
			form: {
				name: '',
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入昵称',
						// 可以单个或者同时写两个触发验证方式 
						trigger: ['change', 'blur'],
					}
				],
			},
			errorType: ['message']
		}
	},
	methods: {
		submit() {
			this.$refs.uForm.validate(async (valid) => {
				if (valid) {
					await this.$u.api.userMsgUpdata(this.form);
					this.$u.utils.getUserInfo(this.form);
					this.$u.toast('更新成功');


				}
			});
			//更新用户信息
		}
	}
}
</script>

<style>
</style>
