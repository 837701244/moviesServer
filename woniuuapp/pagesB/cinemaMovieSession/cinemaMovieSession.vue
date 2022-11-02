<template>
	<view>
		{{cid}}
		
		<view class="padding" v-if="info">
			<block v-for="(item,index) in info" :key="index">
				
				<view class="flex margin-large-bottom ">
					<view class="margin-big-right">
						<u--image mode="scaleToFill" :src="item.moviesInfo[0].image"
							width="90px" height="130px" ></u--image>
					</view>
					<view class="text-father">
						<navigator :url="'/pagesB/buyMovies/buyMovies?cid='+item.cid+'&mid='+item.mid" ><view class="text-center" style="font-size: 14px; ">{{item.moviesInfo[0].title}}</view></navigator>
							
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
				cid:"",
				info:""
			}
		},
		computed:{
			...mapState(["categoryList"])
		},
		methods: {
			getSession(){
				uni.request({
					url:"/api/getSessionByCid",
					data:{cid:this.cid},
					method:"GET",
					success: (res) => {
						console.log(res.data);
						let {status,data} = res.data
						if(status){
							this.info = data
						}
						
					}
				})
			}
			
		},mounted() {
			this.cid = this.options.cid
			this.getSession()
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
