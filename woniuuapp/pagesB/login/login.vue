<template>
	<view>
	
			<view class="log ">
				<view class="box-center " style="margin-left: 60px;">
						<u--image :showLoading="true" src="/static/images/logo.jpg" width="250px" height="250px" ></u--image>
				</view>
			</view>
			<view>
				<view class="login">
					<view >
						<u--input
						v-model="username"
						fontSize="13px"
						clearable
						 prefixIcon="account-fill"
						   placeholder="请输入账号"
						   border="bottom"
						   clearable
						 ></u--input>
					</view>
					<!-- <view>{{username}}{{password}}</view> -->
					<view class="margin-large-top" >
						<u--input
						v-model="password"
						fontSize="13px"
						clearable
						:password="true"
						 prefixIcon="lock-fill"
						   placeholder="密码"
						   border="bottom"
						   clearable
						 ></u--input>
					</view>
					<view class="text-right text-small" >忘记密码?</view>
					
					<view class="login-btn" @click="loginUser">登陆</view>
					<view class="login-tip" @click="regFn">还没有账号？ <text style="color: #22cccc;">马上注册</text></view>
				</view>
				
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
				userInfo:null,
				username:"",
				password:""
			}
		},
		methods: {
			...mapMutations(["changeUser"]),
			regFn(){
				uni.navigateTo({
					url:"/pagesB/register/register"
				})
			},
			loginUser(){
				let that = this
				if(!this.username || !this.password){
					this.$refs.uToast.show({
						type:"error",
						message:"请填写用户名或密码"
					})
				}else{
					uni.request({
						url:"/api/login",
						method:"POST",
						data:{pwd:this.password,name:this.username},
						success: (res) => {
							console.log(res.data,"33333333333333333");
							let {status,token,data} = res.data
							if(status){
								console.log("zzzzzzzzzzzzzzz");
								uni.setStorageSync("token",token);
								this.changeUser(data)
								that.$refs.uToast.show({
									type:"success",
									message:"登陆成功",
									complete(){
										uni.reLaunch({
											url:"/pages/ucenter/ucenter"
										})
										console.log("跳转回个人中心");
									}
								})
								
							}else{
								that.$refs.uToast.show({
									type:"error",
									message:"用户名或密码错误"
								})
								
							}
						}
					})
				}
				
			}
		}
	}
</script>

<style scoped>
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
