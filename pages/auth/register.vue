<template>
	<view class="box">
		<view class="rgsbox">
			<view class="rgs-item1">
				<u-icon name="account" color="#ccc" size="40"></u-icon>
				<input type="text" placeholder="dasdasd">
			</view>

			<view class="rgs-item2">
				<u-icon name="account" color="#ccc" size="40"></u-icon>
				<input type="text">
			</view>
			<view class="rgs-item3">
				<u-icon name="account" color="#ccc" size="40"></u-icon>
				<input type="text">
			</view>
			<view class="rgs-item4">
				<u-icon name="account" color="#ccc" size="40"></u-icon>
				<input type="text">
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			username: '',
		}
	},
	methods: {

	}
}
</script>

<style lang="scss" scoped>
.box {

	.rgsbox {
		display: flex;
		// justify-content: space-around;
		// align-items: center;
		flex-direction: column;

		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 344px;
		height: 230px;
		border: 3px solid rgba(210, 235, 235, 0.333);
		border-radius: 10px;

		padding: 10px 10px;

		.rgs-item1,
		.rgs-item2,
		.rgs-item3,
		.rgs-item4 {
			display: flex;
			align-items: center;
			border-bottom: 2px solid #f6f6f6;
			padding: 7px 0px;

			input {
				margin-left: 20px;
				display: inline-block;
				width: 250px;
				height: 30px;
				border: 1px solid #ccc;
				text-align: center;
				font-size: 16px;
				color: #ccc;
			}


		}




	}
}
</style>
