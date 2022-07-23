<template>
	<view class="u-rela u-skeleton">
		<!-- 商品信息 -->
		<view class="goods-item">
			<u-image class="u-skeleton-rect" width="100%" height="500rpx" :src="goodsInfo.cover_url"></u-image>
			<view class="name u-line-1 u-p-t-20 u-p-b-20 u-skeleton-rect">{{ goodsInfo.title }}</view>
			<view class="u-flex u-row-between">
				<view class="price u-skeleton-rect">￥ {{ goodsInfo.price }}</view>
				<view class="sales u-skeleton-rect">销量: {{ goodsInfo.sales }}</view>
			</view>
		</view>

		<!-- tab组件 -->
		<u-tabs class="u-m-l-20 u-m-r-20 u-skeleton-rect" :list="list" :is-scroll="false" :current="current"
			@change="changeTabs"></u-tabs>
		<view class="content u-m-l-20 u-m-r-20 u-p-b-80 u-skeleton-rect">
			<!-- 商品详情 -->
			<template v-if="current === 0">
				<u-parse :html="goodsInfo.details"></u-parse>
			</template>

			<!-- 商品评论 -->
			<template v-if="current === 1">
				<view class="comment" v-for="(res, index) in commentList" :key="res.id">
					<view class="left">
						<image :src="res.url" mode="aspectFill"></image>
					</view>
					<view class="right">
						<view class="top">
							<view class="name">{{ res.name }}</view>
							<view class="like" :class="{ highlight: res.isLike }">
								<view class="num">{{ res.likeNum }}</view>
								<u-icon v-if="!res.isLike" name="thumb-up" :size="30" color="#9a9a9a" @click="getLike(index)"></u-icon>
								<u-icon v-if="res.isLike" name="thumb-up-fill" :size="30" @click="getLike(index)">
								</u-icon>
							</view>
						</view>
						<view class="content">{{ res.contentText }}</view>
						<view class="reply-box">
							<view class="item" v-for="item in res.replyList" :key="item.index">
								<view class="username">{{ item.name }}</view>
								<view class="text">{{ item.contentStr }}</view>
							</view>
							<view class="all-reply" @tap="toAllReply" v-if="res.replyList != undefined">
								共{{ res.allReply }}条回复
								<u-icon class="more" name="arrow-right" :size="26"></u-icon>
							</view>
						</view>
						<view class="bottom">
							{{ res.date }}
							<view class="reply">回复</view>
						</view>
					</view>
				</view>
			</template>

			<!-- 推荐商品 -->
			<template v-if="current === 2">
				<u-row gutter="16">
					<u-col span="6" v-for="(item, index) in like_goodsList" :key="index">
						<goods-card :good="item"></goods-card>
					</u-col>
				</u-row>
			</template>
		</view>

		<view class="navigation u-absolute">
			<view class="left">
				<view class="item" @click="collectionHandle()">
					<u-icon name="star-fill" :size="40" :color="isCollect === 1 ? '#ed3f14' : ''"></u-icon>
					<view class="text u-line-1">收藏</view>
				</view>
				<view class="item car" @click="toCart">
					<u-badge class="car-num" :count="cartCount" type="error" :offset="[-3, -6]"></u-badge>
					<u-icon name="shopping-cart" :size="40" :color="$u.color['contentColor']"></u-icon>
					<view class="text u-line-1">购物车</view>
				</view>
			</view>
			<view class="right">
				<view class="cart btn u-line-1" @click="addCart">加入购物车</view>
				<view class="buy btn u-line-1">立即购买</view>
			</view>
		</view>
		<!--引用组件-->
		<u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton>
	</view>
</template>

<script>
export default {
	data() {
		return {
			goodsInfo: {}, // 单个商品信息
			list: [{
				name: '商品详情'
			}, {
				name: '商品评论'
			}, {
				name: '推荐商品'
			}], // tab列表
			current: 0, //当前选中的tab选项
			commentList: [], // 评论列表
			isCollect: 0, // 是否收藏
			like_goodsList: [], // 推荐商品列表
			loading: false, // 信息加载
			cartCount: 0, // 购物车数量
			cartsList: [] //购物车商品信息,提示已有
		}
	},
	onLoad(options) {
		this.getGoodsDetail(options.id)
		this.getCartsCount()
	},
	methods: {
		// 获取商品信息
		async getGoodsDetail(goodsId) {
			this.loading = true
			const res = await this.$u.api.goodsDetail(goodsId)
			this.loading = false
			// console.log(res)
			// 获取商品信息
			this.goodsInfo = res.goods
			// 收藏状态判断
			this.isCollect = res.goods.is_collect
			// 评论列表
			this.commentList = res.goods.comments
			// 推荐商品列表
			this.like_goodsList = res.like_goods
		},
		// 切换tab选项
		changeTabs(index) {
			this.current = index
		},
		// 点击收藏取消
		async collectionHandle() {
			if (!this.$u.utils.ifLogin()) return;
			await this.$u.api.CollectAndCancel(this.goodsInfo.id)
			if (this.isCollect === 0) {
				this.isCollect = 1
				this.$u.toast('收藏成功')
			} else {
				this.isCollect = 0
				// this.$u.api.collection(); //刷新数据
				this.$u.toast('取消收藏成功')
			}
		},

		// 加入购物车
		async addCart() {
			const params = {
				goods_id: this.goodsInfo.id
			}
			
			//判断是否在购物车内
			if (this.cartsList.some(item => item.goods_id === this.goodsInfo.id)) {
				return this.$u.toast('该商品已在购物车');
			}

			const res = await this.$u.api.cartsAdd(params)

			if (!res.success) return;

			this.$u.toast('添加成功');
			this.getCartsCount();

			return;
			this.cartsList.forEach(item => {
				if (item.goods_id === this.goodsInfo.id) {
					console.log(item.goods_id);
					this.$u.toast('该商品已在购物车');
				} else {
					// 更新购物车数量
					this.getCartsCount();
					this.$u.toast('添加成功');
				}
			});


		},
		// 获取购物车数量
		async getCartsCount() {
			if (this.$u.utils.ifLogin()) {
				const res = await this.$u.api.cartsList()
				// console.log(res)
				this.cartCount = res.data.length
				this.cartsList = res.data;
				// console.log(res.data);
			}
		},

		// 跳转到购物车页面
		toCart() {
			this.$u.route({
				type: 'switchTab',
				url: 'pages/car/car'
			})
		}
	}
}

</script>

<style lang="scss" scoped>
// 商品信息
.goods-item {
	padding: 20rpx;
	margin-bottom: 20rpx;
	// box-shadow: 0 12rpx 20rpx rgba(0, 0, 0, .1);

	// 标题
	.name {
		font-size: 36rpx;
		font-weight: bold;
		margin-top: 20rpx;
		margin-bottom: 20rpx;
		width: 100%;
	}

	// 价格
	.price {
		width: 40%;
		color: red;
		padding-left: 20rpx;
		font-weight: bold;
		font-size: 32rpx;
	}

	// 销量
	.sales {
		width: 40%;
		color: #888;
		font-weight: bold;
		font-size: 32rpx;
		padding-right: 20rpx;
	}
}

.content {
	min-height: 360rpx;
}

// 底部
.navigation {
	display: flex;
	// margin-top: 100rpx;
	border: solid 2rpx #f2f2f2;
	background-color: #ffffff;
	padding: 16rpx 0;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;

	.left {
		display: flex;
		font-size: 20rpx;
		margin-right: 80rpx;

		.item {
			margin: 0 30rpx;

			&.car {
				text-align: center;
				position: relative;

				.car-num {
					position: absolute;
					top: -10rpx;
					right: -10rpx;
				}
			}
		}
	}

	.right {
		display: flex;
		font-size: 28rpx;
		align-items: center;

		.btn {
			line-height: 66rpx;
			padding: 0 30rpx;
			border-radius: 36rpx;
			color: #ffffff;
		}

		.cart {
			background-color: #ed3f14;
			margin-right: 30rpx;
		}

		.buy {
			background-color: #ff7900;
		}
	}
}
</style>
