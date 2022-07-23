<template>
	<view>
		<u-row gutter="16" class="u-skeleton">
			<!--  [{},{},{},{}]骨架框用到 -->
			<u-col span="6" v-for="(good, index) in goodslist.length ? goodslist : [{}, {}, {}, {}, {}, {}]" :key="index">
				<goods-card :good="good.goods"></goods-card>
			</u-col>
		</u-row>

		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
export default {
	onShow() {
		this.getGoodsData();
	},
	data() {
		return {
			goodslist: [],
			loading: true, // 是否显示骨架屏组件
		}
	},
	methods: {
		async getGoodsData() {
			this.loading = true;
			const params = {
				page: 1,
			}
			const res = await this.$u.api.collection(params);
			this.loading = false;
			this.goodslist = res.data;
			console.log(this.goodslist);
		}
	}
}
</script>

<style>
</style>
