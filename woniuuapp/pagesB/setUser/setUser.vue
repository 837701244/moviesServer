<template>
	<view>
			<view class="padding">
				<u-button type="primary" text="退出登陆" @click="tuihcu"></u-button>
			</view>
			<view>
				<u-toast ref="uToast"></u-toast>
			</view>
	</view>
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			...mapMutations(['changeUser']),
			tuihcu(){
				uni.removeStorageSync("token")
				this.changeUser()
				this.$refs.uToast.show({
					type:"success",
					message:"退出成功",
					complete(){
						uni.reLaunch({
							url:"/pages/ucenter/ucenter"
						})
					}
				})
			}
		}
	}
</script>

<style>

</style>
