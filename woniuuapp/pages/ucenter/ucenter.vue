<template>
	<view>
		<view v-if="num == 1">
			<view class="top">
				<view class="box">
					<view>
						<u-avatar v-if="!userState" @click="login" style="margin: 0 auto;" bg-color="#bbc0c6" color="#807e7f" icon="account-fill"
							fontSize="65" size="80"></u-avatar>
						<u-avatar v-if="userState" :src="user.image" style="margin: 0 auto;"
								fontSize="65" size="80"></u-avatar>
					</view>
					<view class="margin-big-top margin-big-bottom text-center" v-if="!userState">未登录</view>
					<view class="margin-big-top margin-big-bottom text-center" v-if="userState">{{user.name}}</view>
					<view class="flex flex-space-around">
						<view  style="position: relative;">
							<u-icon name="chat" color="#2979ff" size="28"
								style="display: inline-block;">
								
							</u-icon>
							<u-badge  type="error" max="99" :value="1" :absolute="true" :offset="[-5,-14]"></u-badge>
							<text>消息</text>
						</view>
						<view style="position: relative;" @click="gotoWantFn">
							<u-icon name="heart"  color="#2979ff" size="28" style="display: inline-block;"></u-icon> 
							<u-badge v-if="wantInfo" type="error" max="99" :value="wantInfo" :absolute="true" :offset="[-5,-14]"></u-badge>
							<text>想看</text>
						</view>
						<view >
							<u-icon name="eye" color="#2979ff" size="28" style="display: inline-block;"></u-icon> <text>看过</text>
						</view>
						<view style="position: relative;">
							<u-icon name="more-circle" color="#2979ff" size="28" style="display: inline-block;"></u-icon> 
							<u-badge type="error" max="99" :value="1" :absolute="true" :offset="[-5,-14]"></u-badge>
							<text>评论</text>
						</view>
					</view>
				</view>
			</view>
			<view class="mainBottm margin-big-top">
			<u-gap height="10" bgColor="#f5f5f5"></u-gap>
			<view class="bg-white">
				<view class="padding clearfix border-bottom" @click="goToOrder">
					<view class="float-left">我的订单</view>
					<view class="float-right">
						
						<u-icon labelPos='left' label="全部" name="play-right-fill" color="#555" size="18" ></u-icon> 	
					</view>
				</view>
				<view class="mianSon padding flex flex-space-between">
					<view>
						<text class="border-right" style="padding: 0px 12px 0 0">
					 <u-icon name="eye" color="#555" size="18" style='display: inline-block;'></u-icon> 
					 待观影</text>
					 </view>
					<view>
						<text class="border-right" style="padding: 0 12px;"> 
							<u-icon name="rmb" color="#555" size="18" style='display: inline-block;'></u-icon> 
						待付款</text>
					</view>
					<view>
						<text class="border-right" style="padding: 0 12px;">
							<u-icon name="chat" color="#555" size="18" style='display: inline-block;'></u-icon> 
						待评论</text>
					</view>
					<view>
						<text style="padding: 0 12px;">
						<u-icon name="question-circle" color="#555" size="18" style='display: inline-block;'></u-icon> 
						已退款</text>
					</view>
				</view>
				
			</view>	
			<u-gap height="20" bgColor="#f5f5f5"></u-gap>
			<view class="bg-white">
				<view class="padding clearfix">
					<view class="float-left">
						我的优惠券
					</view>
					<view class="float-right">
						<u-icon  name="play-right-fill" color="#555" size="18" ></u-icon> 
					</view>
				</view>
			</view>
			<u-gap height="20" bgColor="#f5f5f5"></u-gap>
			<view class="bg-white">
					
						<view class="border-bottom">
							<view class="padding clearfix">
								<view class="float-left">
									帮助中心
								</view>
								<view class="float-right">
									<u-icon  name="play-right-fill" color="#555" size="18" ></u-icon> 
								</view>
							</view>
						</view>
						<view>
							<view class="padding clearfix" @click="goSet">
								<view class="float-left">
									设置
								</view>
								<view class="float-right">
									<u-icon  name="play-right-fill" color="#555" size="18" ></u-icon> 
								</view>
							</view>
						</view>
					
			</view>
			<u-gap height="200" bgColor="#f5f5f5"></u-gap>
		</view>
		</view>
		
		
	</view>
	
</template>

<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		data() {
			return {
				num :1,
				wantInfo:null
				
			}
		},
		computed: {
			...mapState(["user","userState"])
		},
		methods: {
			gotoWantFn(){
				if(!uni.getStorageSync("token"))return
				uni.navigateTo({
					url:"/pagesB/userWantLook/userWantLook"
				})
			},
			getWant(){
				if(uni.getStorageSync("token")){
				
					uni.request({
						url:"/api/findwnatByUid",
						data:{uid:this.user._id},
						success: (res) => {
							let {status,data} = res.data
							if(status){
								this.wantInfo = data.length*1
							}
						}
					})
				}else{
					
				}
			},
			
			goToOrder(){
				uni.navigateTo({
					url:"/pagesB/AllOrder/AllOrder"
				})
			},
			goSet(){
				uni.navigateTo({
					url:"/pagesB/setUser/setUser"
				})
			},
			login(){
				uni.navigateTo({
					url:"/pagesB/login/login"
				})
			}
		},mounted() {
			this.getWant()
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.top {
		height: 240px;
		background-color: #fff;
		overflow: hidden;
	
	.box {
			width: 80%;
			margin: 20px auto;
		}
	}
	.mainBottm{
		.mianSon{
			>view{
				>text{
					color: #555;
				}
			}
		}
	}
	.log{
		height: 260px;
		
		.box-center{
			width: 250px;
			height: 250px;
			margin: 0px auto;
		}
	}
	.login{
		width: 70%;
		margin: 0 auto;
	}
	.login-btn{
		margin-top: 30px;
		text-align: center;
		background-color: #22cccc;
		line-height: 40px;
		border-radius: 20px;
		color: #fff;
	}
	.login-tip{
		margin-top: 10px;
		text-align: center;
		color: #555;
		font-size: 12px;
		>text{
			color: #22cccc;
		}
	}
</style>
