<template>
	<view class="container">
		<view class="goods">
			<view class="goods-item" v-for="item in cartsList" :key="item.id">
				<view class="goods-item-left">
					<u-checkbox></u-checkbox>
				</view>

				<view class="goods-item-right">
					<u-image width="100%" height="300rpx" :src="item.goods.cover_url"></u-image>
					<view class="goods-con">
						<view class="goods-title">{{ item.goods.title }}</view>
						<view class="goods-desc">{{ item.goods.description }}</view>
						<view class="goods-total">库存：<text class="goods-total__num">{{ item.goods.stock }}</text></view>
						<view class="goods-control">
							<text>￥{{ item.goods.price }}</text>
							<view class="num-control">
								<text class="num-control__minus">-</text>
								<text class="num-control__num">{{ item.goods.is_on }}</text>
								<text class="num-control__add">+</text>
							</view>
							<u-icon name="trash" @click="rmGoods(item.id)"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="shop"></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src: "",
			cartsList: [],
			goodsList: [],
		}
	},
	onShow() {
		this.getCartList();
	},
	methods: {
		async getCartList() {
			const params = {
				include: 'goods'
			};

			const res = await this.$u.api.cartsList(params);
			this.cartsList = res.data;
		},
		rmGoods(id) {
			this.$u.debounce(async () => {
				const res = await this.$u.api.moveCart(id);

				if (!res.success) {
					return this.$u.toast('删除失败！');
				}

				this.getCartList();
			}, 500)
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 10px;
}

.goods {
	&-item {
		padding: 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border: 1px solid #f2f2f2;
		border-radius: 10px;
		margin-bottom: 10px;

		&-left {
			flex: 1;
		}

		&-right {
			flex: 11;
			display: flex;
		}
	}

	&-pic {
		width: 200rpx;
		border: 1px solid red;
	}

	&-con {
		padding: 20rpx;
		width: 100%;
	}

	&-title {
		font-weight: bold;
		font-size: 30rpx;
		margin: 10rpx 0;
	}

	&-desc {
		color: #ced1d9;
	}

	&-total {
		text-align: right;

		&__num {
			color: red;
		}
	}

	&-control {
		display: flex;
		margin-top: 30rpx;
		align-items: center;
		justify-content: space-around;
	}
}

.num-control {
	>* {
		margin: 0 10px;
	}
}
</style>
