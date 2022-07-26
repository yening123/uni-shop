<template>
	<view>
		<u-upload :action="action" max-count="1" :custom-btn="true" :before-upload="beforeUpload" :form-data="formData"
			:multiple="false" :deletable="false" width="0" height="0" @on-success="onSuccess"
			:max-size="5 * 1024 * 1024" ref="upload">
			<!-- 头像代替加好+ -->
			<u-avatar slot="addBtn" :src="vuex_user.avatar_url" size="180"></u-avatar>
		</u-upload>
	</view>
</template>

<script>
	let _this = {};
	export default {
		name: "oss-upload",
		created() {
			_this = this
		},
		data() {
			return {
				url: '',
				formData: {},
				action: '',
				// progressFlag: true
			};
		},
		methods: {
			async beforeUpload(index, list) {
				const ossInfo = await _this.$u.api.userOss();

				_this.action = ossInfo.host;

				const {
					file
				} = list[0];

				// #ifdef H5
				const fileName = file.name
				//#endif

				//不是H5
				// #ifndef H5
				const fileName = file.path
				//#endif

				const suffix = fileName.slice(fileName.lastIndexOf('.'));
				// const suffix = file.name.;

				const upKeyName = _this.$u.guid(20) + suffix;

				this.upKeyName = upKeyName;


				_this.formData = {
					'key': upKeyName,
					'policy': ossInfo.policy,
					'OSSAccessKeyId': ossInfo.accessid,
					'success_action_status': '200',
					'signature': ossInfo.signature
				}
				return true;
			},
			async onSuccess() {
				// 移出预览区域的图片
				this.$refs.upload.remove(0);
				await this.$u.api.putUserAvatar({
					avatar: this.upKeyName
				})
				const res = await this.$u.utils.getUserInfo();
				this.$u.toast("修改成功");
				this.progressFlag = false;
			},
		},
	}
</script>

<style>
</style>
