<template>
	<view>
		<u-swiper :list="slides" name="img_url" height="320"></u-swiper>
		<view class="u-m-t-20 u-text-center">
			<u-tabs :list="tabslist" :is-scroll="false" bar-width="100" item-width="160" :current="currentIndex"
				active-color="#d4237a" font-size="26rpx" @change="change"></u-tabs>
		</view>


		<u-row gutter="16" class="u-skeleton">
			<!--  [{},{},{},{}]骨架框用到 -->
			<u-col span="6" v-for="(good, index) in goodsList.length ? goodsList : [{}, {}, {}, {}]" :key="index">
				<goods-card :good="good"></goods-card>
			</u-col>
		</u-row>

		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
	export default {
		onLoad() {
			// this.$u.utils.ifLogin(); 测试用的
			this.getData();
		},
		data() {
			return {
				//录播图图片
				slides: [],
				goodsList: [],

				tabslist: [{
					name: '首页'
				}, {
					name: '热销'
				}, {
					name: '推荐',
				}, {
					name: '最新',
				}],
				currentIndex: 0,
				page: 1,
				loading: true, // 是否显示骨架屏组件
			}
		},
		methods: {
			change(index) {
				this.currentIndex = index;
				this.goodsList = [];
				//重置不同商品的页数
				this.page = 1;
				this.getData();
			},
			async getData() {
				this.loading = true;
				const params = {
					page: this.page,
				}
				if (this.currentIndex == 1) params.sales = 1;
				if (this.currentIndex == 2) params.recommend = 1;
				if (this.currentIndex == 3) params.new = 1;
				const res = await this.$u.api.index(params);
				// console.log(res);
				this.loading = false;
				this.slides = res.slides;
				// console.log(this.slides);
				this.goodsList = [...this.goodsList, ...res.goods.data];
				// console.log(this.goodsList);

			}
		},
		onReachBottom() {
			this.page = this.page + 1;
			this.getData();

		}
	}
</script>

<style lang="scss" scoped>
	.tabs {
		padding: 20rpx 0;
	}
</style>
