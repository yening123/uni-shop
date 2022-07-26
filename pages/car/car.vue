<template>
	<view class="container">
		<view class="goods">
			<view class="goods-item" v-for="(item, index) in cartsList" :key="item.id">
				<view class="goods-item-left">
					<u-checkbox shape="circle" @change="handleCheck(item)" v-model="item.checked"></u-checkbox>
				</view>

				<view class="goods-item-right">
					<u-image width="250" height="300" :src="item.goods.cover_url"></u-image>
					<view class="goods-con">
						<view class="goods-title">{{ item.goods.title }}</view>
						<view class="goods-desc">{{ item.goods.description }}</view>
						<view class="goods-total">库存：<text class="goods-total__num">{{ item.goods.stock }}</text></view>
						<view class="goods-control">
							<text>￥{{ item.goods.price }}</text>
							<view class="num-control">
								<text class="num-control__btn" @click="changeGoodsNum('minus', item)">-</text>
								<text class="num-control__num">{{ item.num }}</text>
								<text class="num-control__btn" @click="changeGoodsNum('add', item)">+</text>
							</view>
							<u-icon color="red" name="trash" @click="rmGoods(item.id, index)"></u-icon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<view class="shop">
			<u-checkbox shape="circle" @change="handleCheckAll" v-model="isCheckAll">全选</u-checkbox>
			<view class="u-flex">
				<view class="u-m-r-40">
					<text class="total">合计</text>
					<text class="totalprice">￥{{ sum }}</text>
				</view>
				<u-button class="settlement" type="primary">结算</u-button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			src: "",
			cartsList: [],
			isCheckAll: false,
			num: 0,
			sum: 0,
		}
	},
	onShow() {
		this.getCartList();
		this.isCheckAll = false;
	},
	watch: {
		cartsList: {
			handler() {
				this.sum = this.cartsList.reduce((pre, cur) => {
					return cur.checked ? pre + cur.goods.price * cur.num : pre;
				}, 0)
			},
			immediate: true,
			deep: true
		}
	},
	methods: {
		async changeGoodsNum(type, item) {
			const originNum = item.num;

			type == 'add' ? item.num++ : item.num--;

			const res = await this.$u.api.changeGoodsNum({
				id: item.id,
				num: item.num
			});

			if (!res.success) {
				item.num = originNum;
			};
		},
		async getCartList() {
			const params = {
				include: 'goods'
			};

			const res = await this.$u.api.cartsList(params);

			if (!res.success) return;

			res.data.forEach(item => item.checked = false);
			this.cartsList = res.data;
		},
		rmGoods(id, index) {
			this.$u.debounce(async () => {
				const res = await this.$u.api.moveCart(id);

				if (!res.success) {
					return this.$u.toast('删除失败！');
				}
				this.cartsList.splice(index, 1)
				this.isCheckAll = this.cartsList.every(item => item.checked) ? true : false;
				// this.getCartList();
			}, 500)
		},
		handleCheck(item) {
			item.checked = !item.checked;

			if (this.cartsList.every(item => item.checked)) {
				this.isCheckAll = true;
			} else {
				this.isCheckAll = false;
			}
		},
		handleCheckAll() {
			if (this.cartsList.every(item => item.checked)) {
				this.cartsList.forEach(item => item.checked = false);
				this.isCheckAll = false;
			} else {
				this.cartsList.forEach(item => item.checked = true);
				this.isCheckAll = true;
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.container {
	padding: 10px 10px 60px 10px;
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
		padding: 10rpx;
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

	/* #ifndef H5 */
	&__num {
		margin: 0 20rpx;
	}

	/*  #endif  */

	&__btn {
		background-color: #f2f3f5;
		padding: 0 4px;
	}
}

.shop {
	display: flex;
	align-items: center;
	position: fixed;
	left: 0%;
	/* #ifdef H5 */
	bottom: 100rpx;
	/*  #endif  */

	/* #ifndef H5 */
	bottom: 0;
	/*  #endif  */
	width: 100%;
	height: 120rpx;
	background-color: white;
	padding: 0 20px;
	justify-content: space-between;
	border-top: 1px solid #efefef;

	.settlement {
		margin: 0;
		width: 70px !important;
		height: 36px !important;
		font-size: 13px !important;
	}

	.total {
		font-size: 13px;
		font-weight: 800;
	}

	.box {
		display: flex;
		align-items: center;
	}

	.totalprice {
		font-weight: 800;
		color: rgb(196, 45, 45);
		font-size: 16px;
	}

	/deep/ .u-btn {
		width: 100rpx;
		height: 60rpx;
		background: rgb(230, 44, 137);
		margin-top: 6rpx;
	}
}
</style>
