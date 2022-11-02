<template>
	<view>
		<view> <u-notice-bar :text="text1"></u-notice-bar></view>
		<view>
			<view class="padding clearfix margin-big-top " v-if="orderInfo">
				
					<view class="float-left">
						<view class="h4 " style="font-weight: 700;">{{orderInfo[0].moviesInfo[0].title}}</view>
						<view class="margin-big-top " style="color: #ff2828;">{{orderInfo[0].sessionInfo[0].startTime|skSetDate("MM月dd日 HH:mm") }} <text class="margin-big-left">({{orderInfo[0].moviesInfo[0].language}}3D)</text> </view>
						<view class="text-small" style="color: gray;">{{orderInfo[0].cinemaInfo[0].cinemaAddress}}2号厅</view>
						<view class="text-small" style="color: gray;">6排07座</view>
						
					</view>
					<view class="float-right">
						<u--image :showLoading="true" :src="orderInfo[0].moviesInfo[0].image" width="80px" height="100px" ></u--image>
					</view>
				
			</view>
		</view>
		<viwe>
			<view class="padding">
				<view style="background-color: #f4f4f4;line-height: 30px;color: gray;"  class="text-center">
					票号:<text style="color: #ff2828;">{{orderId}}</text>
				</view>
			</view>
		</viwe>
		<view class="padding text-small" style="color: #ffcc00;">
			订票中,若30分钟内订票失败。将自动退款。您也可以到订单详情查看订票状态。
		</view>
		
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				text1:"是否成功购票请以爱电影客户端为准，短信仅供参考",
				orderId:"",
				orderInfo:""
			}
		},
		methods: {
			getOrder(){
				uni.request({
					url:"/api/getOrderData",
					data:{id:this.orderId},
					success: (res) => {
						console.log(res.data);
						let {data,status} = res.data
						if(status){
							this.orderInfo=data
						}
					}
				})
			}
		},mounted() {
			this.orderId = this.options.id
			this.getOrder()
		}
	}
</script>

<style>

</style>
