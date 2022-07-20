<template>
	<view>
		my
	</view>
</template>

<script>
export default {
	data() {
		return {

		}
	},
	async onLoad() {
		// const res = await this.$u.get('/api/index1');
		// console.log(res);
		// const res = this.$u.get('/api/index').then(res => {
		// console.log(res);	
		// });
		// console.log(res);	

		// 封装patch
		// const res = await this.$u.post('/api/auth/wx/bind');
		// const res = await this.$u.patch('/api/orders/1/confirm'); //patch 测试
		// console.log(res);

		//集中管理api
		// const res = await this.$u.api.index();
		// console.log(res);

		//设置vuex中的值和拿到vuex中的值
		// this.$u.vuex('vuex_name','YeNing')
		// console.log(this.vuex_name);
		if (!this.$u.utils.ifLogin()) return; //如果没有登录，防止输出下面数据信息

		console.log(111);
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
</style>
