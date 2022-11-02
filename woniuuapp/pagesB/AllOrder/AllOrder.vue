<template>
	<view>
		<view> <u-subsection :list="list" :current="curNow" @change="sectionChange"></u-subsection></view>
		<view v-if="curNow == 0">
			<block v-for="(item,index) in orderData" v-if="orderData" :key="item._id">
				<view  style="padding: 20px;">
					<view>
						<view class="margin-big-bottom text-center text-small" style="line-height: 25px; background-color:rgba(128, 128, 128, .2)  ;">票号: <text>{{item._id}}</text></view>
						<view class="h3" style="font-weight: 700;">{{item.moviesInfo[0].title}}</view>
						<view class="clearfix text-small" style="color: #555;">
							<view class="float-left">
								<view>{{item.cinemaInfo[0].brandName}}</view>
								<view>{{item.cinemaInfo[0].cinemaAddress}}2号厅</view>
								<view><text>6排07座</text> <text>6排08座</text></view>
								<view>放映时间: <text style="color: #ff0000;">{{item.sessionInfo[0].startTime|skSetDate("yyyy-MM-dd HH:mm")}}</text> </view>
								<view>下单时间: <text style="color: #ff0000;"> {{item.orderTime|skSetDate("yyyy-MM-dd HH:mm")}}</text></view>
							</view>
							<view class="float-right">
								<view>
									<u--image :showLoading="true" :src="item.moviesInfo[0].image" width="80px" height="100px" ></u--image>
								</view>
							</view>
						</view>
					</view>
					<view>
						<view class="btn-err" v-if="item.sessionInfo[0].startTime<nowTime ">已过期</view>
						<view class="btn-success" v-else>未过期</view>
					</view> 
				</view>
			</block>
		</view>
		<view v-if="curNow==1">
			<block v-for="(item,index) in orderData" v-if="orderData" :key="item._id">
				<view  style="padding: 20px;">
					<view>
						<view class="margin-big-bottom text-center text-small" style="line-height: 25px; background-color:rgba(128, 128, 128, .2)  ;">票号: <text>{{item._id}}</text></view>
						<view class="h3" style="font-weight: 700;">{{item.moviesInfo[0].title}}</view>
						<view class="clearfix text-small" style="color: #555;">
							<view class="float-left">
								<view>{{item.cinemaInfo[0].brandName}}</view>
								<view>{{item.cinemaInfo[0].cinemaAddress}}2号厅</view>
								<view><text>6排07座</text> <text>6排08座</text></view>
								<view>放映时间: <text style="color: #ff0000;">{{item.sessionInfo[0].startTime|skSetDate("yyyy-MM-dd HH:mm")}}</text> </view>
								<view>下单时间: <text style="color: #ff0000;"> {{item.orderTime|skSetDate("yyyy-MM-dd HH:mm")}}</text></view>
							</view>
							<view class="float-right">
								<view>
									<u--image :showLoading="true" :src="item.moviesInfo[0].image" width="80px" height="100px" ></u--image>
								</view>
							</view>
						</view>
					</view>
					<view>
						<view class="btn-success">未过期</view>
					</view> 
				</view>
			</block>
		</view>
		<view v-if="curNow==2">
			<block v-for="(item,index) in orderData" v-if="orderData" :key="item._id">
				<view  style="padding: 20px;">
					<view>
						<view class="margin-big-bottom text-center text-small" style="line-height: 25px; background-color:rgba(128, 128, 128, .2)  ;">票号: <text>{{item._id}}</text></view>
						<view class="h3" style="font-weight: 700;">{{item.moviesInfo[0].title}}</view>
						<view class="clearfix text-small" style="color: #555;">
							<view class="float-left">
								<view>{{item.cinemaInfo[0].brandName}}</view>
								<view>{{item.cinemaInfo[0].cinemaAddress}}2号厅</view>
								<view><text>6排07座</text> <text>6排08座</text></view>
								<view>放映时间: <text style="color: #ff0000;">{{item.sessionInfo[0].startTime|skSetDate("yyyy-MM-dd HH:mm")}}</text> </view>
								<view>下单时间: <text style="color: #ff0000;"> {{item.orderTime|skSetDate("yyyy-MM-dd HH:mm")}}</text></view>
							</view>
							<view class="float-right">
								<view>
									<u--image :showLoading="true" :src="item.moviesInfo[0].image" width="80px" height="100px" ></u--image>
								</view>
							</view>
						</view>
					</view>
					<view>
						<view class="btn-err">已过期</view>
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
				nowTime:"",
				 list: ['全部', '待使用', '已过期'],
				 curNow: 0,
				 orderData:""
			}
		},
		computed: {
			...mapState(["user"])
		},
		methods: {
			getOrder(){
				uni.request({
					url:"/api/geUserAllOrder",
					method:"POST",
					data:{uid:this.user._id},
					success: (res) => {
						console.log(res.data);
						let {data,status} = res.data
						if(status){
							let a  = [...data]
							if(this.curNow == 0){
								this.orderData = data
							}else if(this.curNow == 1 ){
								this.orderData = a.filter(item=>{
									if(item.sessionInfo[0].startTime>this.nowTime){
										return item
									}
								})
								
							}else{
								this.orderData = a.filter(item=>{
									if(item.sessionInfo[0].startTime<this.nowTime){
										return item
									}
								})
							}
							
						
						}
					}
				})
			},
			sectionChange(index) {
				console.log(index);
							this.curNow = index;
							this.getOrder()
			}
		},mounted(){
			this.getOrder()
			this.nowTime =+new Date();
		}
	}
</script>

<style scoped>
.btn-success{
	
	width: 80px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background-color: #5ac725;
	color: #fff;
}
.btn-err{
	width: 80px;
	height: 50px;
	line-height: 50px;
	text-align: center;
	background-color: #f56c6c;
	color: #fff;
}
</style>
