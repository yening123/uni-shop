<template>
	<navigator class="goods-item">
		<u-image width="100%" height="300rpx" :src="good.cover_url" class="u-skeleton-rect">
		</u-image>
		<view class="title u-line-1 u-skeleton-rect">
			{{good.title ? good.title : "商品标题"}}
		</view>
		<view class="u-flex u-row-between">
			<view class="price u-skeleton-rect">
				￥{{good.price}}
			</view>
			<view class="sales u-skeleton-rect">
				销量：{{good.sales}}
			</view>
		</view>
	</navigator>
</template>

<script>
	export default {
		name: "goods-card",
		props: {
			good: {
				type: Object,
				default () {
					return {}
				}
			}
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.goods-item {
		// border: 1px solid #ccc;
		padding: 40rpx;
		box-shadow: 0 10rpx 10rpx rgba(0, 0, 0, 0.1);

		.title {
			margin: 10rpx 0;
			font-weight: 800;
			font-size: 26rpx;
			width: 100%;
		}

		.price {
			color: red;
			width: 40%;
		}

		.sales {
			color: #888;
			width: 40%;
		}

	}
</style>
