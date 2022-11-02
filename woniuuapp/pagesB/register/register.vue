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
					fontSize="13px"
					clearable
					 prefixIcon="account-fill"
					   placeholder="手机号"
					   border="bottom"
					   clearable
					 ></u--input>
				</view>
				<view class="flex " style="padding: 10px 0 10px 0;margin-top: 20px;">
					<view class="margin-middle-right">
						<u--input
						 prefixIcon="tags"
						   placeholder="输入验证码"
						   border="bottom"
						   clearable
						 ></u--input>
					</view>
					<view class="text-white text-small text-center" style="border-radius: 10px; line-height: 36px; width: 80px; background-color: #22cccc;">
						获取验证码
					</view>
					 
				</view>
				<view class="margin-large-top" >
					<u--input
					fontSize="13px"
					clearable
					:password="true"
					 prefixIcon="lock-fill"
					   placeholder="密码"
					   border="bottom"
					   clearable
					 ></u--input>
				</view>
				<view class="margin-large-top" >
					<u--input
					fontSize="13px"
					clearable
					:password="true"
					 prefixIcon="lock-fill"
					   placeholder="再次输入密码"
					   border="bottom"
					   clearable
					 ></u--input>
				</view>
				
				<view class="login-btn">注册</view>
				<view class="login-tip" @click="loginFn">已有账号？ <text style="color: #22cccc;">前往登陆</text></view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			loginFn(){
				uni.redirectTo({
					url:"/pagesB/login/login"
				})
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
