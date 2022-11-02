<template>
	<view>
		<view class="padding">
			<u-search placeholder="搜索电影"  :disabled="true" height="22":showAction="false" inputAlign="center" @click="clickFn"></u-search>
		</view>
	</view>
</template>

<script>
	
	export default {
		name:"HeaderCom",
		props:["i"],
		data() {
			return {
				
			};
		},
		methods:{
			clickFn(){
				console.log("1");
				uni.navigateTo({
					url:`/pagesB/search/search`
				})
			}
		}
	}
</script>

<style>

</style>