<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30">
			<view class="u-m-r-10 u-m-t-30 avatar">
				<oss-upload></oss-upload>
			</view>
			<view class="u-flex-1">
				<view class="username">{{ vuex_user.name }}</view>
				<view class="u-font-14 u-tips-color u-m-t-10 useremail">邮箱:{{ vuex_user.email }}</view>
			</view>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="account" title="个人信息" @click="toUserInfo"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="rmb-circle" title="所有订单"></u-cell-item>
				<u-cell-item icon="star" title="商品收藏"></u-cell-item>
				<u-cell-item icon="map" title="收货地址"></u-cell-item>
			</u-cell-group>
		</view>

		<view class="u-m-t-20">
			<u-cell-group>
				<u-cell-item icon="reload" title="退出登录" @click="logout"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			pic: 'https://uviewui.com/common/logo.png',
			show: true
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


	},
	methods: {
		toUserInfo() {
			this.$u.route({
				type: 'navigateTo',
				url: '/pages/my/baseInfo'
			})
		},
		async logout() {
			await this.$u.api.userLogout();
			this.$u.toast('退出成功');

			this.$u.vuex('vuex_token', null);
			this.$u.vuex('vuex_user', {});
			setTimeout(() => {
				this.$u.route({
					type: 'reLaunch',
					url: '/pages/home/home'
				})
			}, 1000)
		}
	}
}
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}

.camera {
	width: 54px;
	height: 44px;

	&:active {
		background-color: #ededed;
	}
}

.user-box {
	background-color: #fff;
}

.avatar {
	height: 100px;
	width: 110px;
}

.username {
	font-size: 22px;
	margin-top: 20px
}

.email {
	font-size: 16px;
}
</style>
