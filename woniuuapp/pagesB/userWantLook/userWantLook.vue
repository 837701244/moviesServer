<template>
	<view>
		<view class="padding" v-if="moviesInfo">
			<block v-for="(item,index) in moviesInfo" :key="index">
				
				<view class="flex margin-large-bottom ">
					<view class="margin-big-right">
						<u--image mode="scaleToFill" :src="item.moviesInfo[0].image"
							width="90px" height="130px" @click="click"></u--image>
					</view>
					<view class="text-father">
						<navigator :url="'/pagesB/detail/detail?id='+item.moviesInfo[0]._id"><view class="text-center" style="font-size: 14px; ">{{item.moviesInfo[0].title}}</view></navigator>
							<view class="shenglv text-small" style="color: #555; height: 30px;">{{item.moviesInfo[0].brief}}</view>
							<view class="flex">
								<text>评分</text>
								:<u-rate active-color="#ffcc00" size="15":value="item.moviesInfo[0].rating/2" readonly></u-rate>
							</view>
							<view>
								<text>上映时间</text>
								:{{item.moviesInfo[0].pbtime|skSetDate('yyyy年MM月dd日')}}
							</view>
							<view>
								<text>类型</text>
								:{{categoryList[item.moviesInfo[0].category]}}
							</view>
							<view>
								<text>时长</text>
								:{{item.moviesInfo[0].timeCount}}分钟
							</view>
					</view>
				</view>
			</block>
				
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				moviesInfo:null
			}
		},
		computed:{
			...mapState(["user","categoryList"])
		},
		methods: {
			getWant(){
				uni.request({
					url:"/api/findWantAllInfo",
					data:{uid:this.user._id},
					method:"GET",
					success: (res) => {
						console.log(res.data,"111111111");
						let {status,data} = res.data
						if(status){
							this.moviesInfo=data
						}
					}
				})
			}
		},mounted() {
			this.getWant()
		}
	}
</script>

<style scoped lang="scss">
.text-father{
		uni-view{
			margin-bottom: 2px;
			font-size: 10px
			
		}
	}
	uni-text{
		color: #aaa;
	}
</style>
