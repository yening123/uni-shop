<template>
	<view class="container">
		<view class="goods">
			<view class="goods-item" v-for="(item, index) in cars" :key="index">
				<view class="goods-item-left">
					<u-checkbox></u-checkbox>
				</view>

				<view class="goods-item-right">
					<view class="goods-pic">图片</view>
					<view class="goods-con">
						<view class="goods-title">{{ item.name }}</view>
						<view class="goods-desc">{{ item.desc }}</view>
						<view class="goods-total">库存：<text class="goods-total__num">{{ item.total }}</text></view>
						<view class="goods-control">
							<text>￥{{ item.price }}</text>
							<view class="num-control">
								<text class="num-control__minus">-</text>
								<text class="num-control__num">{{ item.num }}</text>
								<text class="num-control__add">+</text>
							</view>
							<u-icon name="trash"></u-icon>
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
			cars: [
				{
					id: 1,
					name: '《人工智能》',
					price: 100,
					total: 999,
					num: 1,
					desc: '无敌'
				},
				{
					id: 1,
					name: '《JAVA程序设计》',
					price: 48,
					total: 999,
					num: 1,
					desc: '很好'
				},
				{
					id: 1,
					name: '《python教程》',
					price: 50,
					total: 999,
					num: 1,
					desc: 'hello'
				},
			]
		}
	},
	onLoad() {

	},
	methods: {

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
	> * {
		margin: 0 10px;
	}
}
</style>
