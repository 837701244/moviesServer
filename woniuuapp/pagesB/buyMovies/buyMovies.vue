<template>
	<view v-if="moviesDate">
		<view > 
			<u-notice-bar :text="text1"></u-notice-bar>
		</view>
		<view class="margin-big-top clearfix padding" >
			<view class="float-left">
				<view class="h4">{{cinemaInfo.brandName}}</view>
				<view class="text-small" style="color: #ddd;">{{cinemaInfo.cinemaAddress}}</view>
			</view>
			<view class="float-right " style="margin-top: 10px;" >
				<u-icon name="map" label="965m" labelSize='12px' color="#55aaff"></u-icon>
			</view>
		</view>
		
		<view class="margin-large-top" style="position: relative;">
			<view class="bg-img-box">
				<view class="bg-img" :style="{backgroundImage:'url('+moviesDate.image+')'}"></view>
			</view>
			<view style="position: absolute;top: 15px;left: 38%;">
				<view style="width: 100px; height: 120px;" class="bg-black">
					<u--image :showLoading="true" :src="moviesDate.image" width="100px" height="120px" ></u--image>
				</view>
			</view>
			<view  class="sanjiao"style="position: absolute;bottom:0;left:48% ">
				
			</view>
		</view>
		<view class="margin-big-top">
			<view class="padding">
				<view class="text-center" style="font-weight: 600;">
				{{moviesDate.title}}
					<text class="text-small" style="margin-left: 5px; color: #ffcc00 ">评分</text> <text style="color: #ffcc00;font-weight: bold;margin-left: 5px;">{{moviesDate.rating}}</text>
				</view>
				
				<view style="color: gray;margin: 10px 0;" class="text-small btn text-center">
					<text>{{moviesDate.timeCount}}分钟</text>
					<text>{{categoryList[moviesDate.category]}}</text>
					<text style="border: 0;">{{moviesDate.actor}}</text>
				</view>
				<view>
					<u-rate class="flex-center" active-color="#ffcc00" size="15":value="moviesDate.rating/2" readonly></u-rate>
				</view>
			</view>
		</view>
		
		<block v-for="(item,index) in cinemaData " :key="item._id">
			<view class="margin-smail-top padding" >
				<view class="padding flex" style="background-color: #f5f6f8;border-radius: 10px;" >
					<view class="margin-big-right">
						<view style="font-size: 8px;">{{item.startTime|skSetDate('MM月dd日')}}</view>
						<view class="h3 ">{{item.startTime|skSetDate(' HH:mm')}}</view>
						<view class="text-small" style="color: gray;">{{item.startTime*1 +item.moviesInfo[0].timeCount *60*1000 | skSetDate('HH:mm')}}散场</view>
					</view>
					<view style="width: 100px;" class="margin-small-right">
						<view class="text-small" style="margin-top: 5px;">{{item.moviesInfo[0].language}}2D</view>
						<view style="color: gray;font-size: 12px;">7号至爱影院厅(禁止饮食)</view>
					</view>
					<view class="margin-small-right">
						<view class="text-red" style="font-size: 13px;" >到手价格 ￥<text class="h3 text-big">{{item.money}}</text> </view>
						<view class="text-small" style="color: #7bcbc0;">影城卡价格{{item.money}}</view>
					</view>
					<view class="flex-item-1">
						<view @click="buyTikcet(item._id)" class="text-red text-center" style="margin-top: 10px; border-radius: 20px; width: 60px;line-height: 30px; height: 30px; background-color:#f9eaeb;">购票</view>
					</view>
					
				</view>
				<view><u-modal @confirm="quedingFn" @cancel="show=false" :showCancelButton="true" :show="show" :title="title" :content='content'></u-modal></view>
			</view>
			<!-- <view v-else-if="nowTime>item.startTime">
				<view>暂时</view>
			</view> -->
		</block>
		
		<view v-if="cinemaData.length == 0">
			<view class="padding">
				<view class="h1 text-red">当前暂无场次</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				show:false,
				title:'购票',
				content:'确定购买？',
				orderInfo:"",
				cinemaInfo:"",
				moviesDate:"",
				nowTime:"",
				cid:"",
				mid:"",
				cinemaData:"",
				text1:"进入电影院须持72小时核酸阴性证明或核酸采样证明。严格做好围合式管理，落实测温、扫场所码、查验健康码和行程卡等措施，并提醒出入人员正确佩戴口罩"
			}
		},
		computed:{
			...mapState(["categoryList","user"])
		},
		methods: {
			quedingFn(){
				this.show=false
				uni.navigateTo({
					url:'/pagesB/onceOrder/onceOrder?id='+this.orderInfo._id
				})
				
			},
			buyTikcet(id){
				this.show = true
				uni.request({
					url:"/api/generateOrder",
					method:"POST",
					data:{sid:id,cid:this.cinemaInfo._id,uid:this.user._id},
					success: (res) => {
						console.log(res.data,"555555555555");
						let {status,data} = res.data
						if(status){
							this.orderInfo = data
						}
					}
				})
			},
			getCinema(){
				uni.request({
					url:"/api/getSessionsInfoByCid",
					method:"POST",
					data:{cid:this.cid,mid:this.mid},
					success: (res) => {
						console.log(res.data);
						let {status,data} = res.data
						if(status){
							
							// this.cinemaData =data.filter(item=>item.startTime >= this.nowTime)
						
							let a = [...data]
							this.cinemaData=a.filter(item=>item.startTime >= this.nowTime)
							
							
						}
					}
				})
			},
			getMovies(){
				uni.request({
					url:"/api/getMovDate",
					data:{id:this.mid},
					success: (res) => {
						console.log(res);
						let {data,status} = res.data
						if(status){
							console.log(data);
							this.moviesDate =data
						}
						
					}
				})
			},
			getcinemaInfo(){
				uni.request({
					url:"/api/findByIdCm",
					method:"POST",
					data:{id:this.cid},
					success: (res) => {
						let {status,data}=res.data
						if(status){
							this.cinemaInfo = data
						}
					}
				})
			}
		},
		mounted() {
			this.cid=this.options.cid
			this.mid=this.options.mid
			this.getCinema()
			this.getMovies()
			this.getcinemaInfo()
			this.nowTime = +new Date()
		}
	}
</script>

<style scoped>
	.btn>text{
		display: inline-block;
		line-height: 10px;
		padding: 0 2px 0 2px ;
		border-right: 1px solid #555;
		
	}
.sanjiao{
	z-index: 10;
	width: 0px;
	height: 0px;
	border-top: 10px solid transparent;
	border-left: 10px solid transparent;
	border-bottom: 10px solid #fff;
	border-right: 10px solid transparent;
}
.bg-img-box{
	width: 100%;
	height: 300rpx;
	overflow: hidden;
}
.bg-img{
	width: 100%;
	height: 100%;
	background-repeat: no-repeat;
	background-size: cover;
	filter: blur(20px);
	transform: scale(1.5);
	background-position: 50%;
}
.bg-img::after{
	content: "";
	display: block;
	width: 100%;
	height: 300rpx;
	background: rgba(17, 17, 17, .2);
	z-index: 1;
}
</style>
