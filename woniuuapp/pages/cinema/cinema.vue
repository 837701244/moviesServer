<template>
	<view>
		<view>
			<swiper :indicator-dots="true" indicator-color="gray" autoplay indicator-active-color="white" interval="3000" :circular="true">
				<block v-for="(item,index) in imgArr"  :key="index">
				  <swiper-item>
					<image :src="item" mode="aspectFill" style="width: 100%;height: 150px;"></image>
				  </swiper-item>
				</block>
			  </swiper>
		  </view>
		  <view class="margin-big-top">
			    <block v-for="(item,index) in cinmae" :key="item._id">
			          <view  style="border-bottom: 1px dashed  #ddd;" @click="gotoFn(item._id)">
			              <view  class="padding" style="font-size: 13px;">
			                  <view class="clearfix">
			                      <text class="h2 float-left">{{item.brandName}}</text>
			                      <text class="float-right" style="color: red;font-size: 16px;">￥{{Math.floor(Math.random() * 80) + 20}}元<text style="color: #ddd; font-size: 12px;"> 起</text></text>
			                  </view>
			                  <view class="clearfix" style="color: #aaa; margin-top: 3px;">
			                      <text class="float-left"> 地址:{{item.cinemaAddress}}</text>
			                      <text class="float-right">{{Math.floor(Math.random() * 910) + 90}}m</text>
			                  </view>
			                  <view style="margin-top: 5px;">
			                      <text style="color: #555;">联系电话: <text style="color: red;">{{item.cinemaPhone}} </text> </text>
			                  </view>
			              </view>
			          </view>
			        </block>
		  </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				 imgArr:[
				        "https://img0.baidu.com/it/u=2698154706,1937388185&fm=253&fmt=auto&app=138&f=JPEG?w=658&h=282",
				        "https://img1.baidu.com/it/u=138766740,1225137739&fm=253&fmt=auto&app=138&f=JPEG?w=1635&h=500",
				        "https://img0.baidu.com/it/u=4076745525,2095946255&fm=253&fmt=auto&app=138&f=JPEG?w=1635&h=500"
				      ],
					pageInfo: {
						page: 1,
						pagesize: 5,
					},
					status: 'loadmore',
					cinmae:[]
					
			}
		},
		methods: {
			gotoFn(id){
				console.log(id);
				uni.navigateTo({
					url:"/pagesB/cinemaMovieSession/cinemaMovieSession?cid="+id
				})
			},
			 getDate(){
			    wx.request({
			      url: '/api/getcinema',
			      data:{...this.pageInfo},
			      success:(res)=>{
			        let {status,data,maxPage,count} = res.data
			        if(status){
						if (this.pageInfo.page > maxPage) this.status = "nomore"
						this.cinmae = this.cinmae.concat(data)
			        }
			      }
			    })
			  },
		},
		onPullDownRefresh() {
			this.status = 'loadmore';
			this.pageInfo.page = 1;
			this.cinmae = []
			this.getDate()
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			if (this.status !== 'nomre') {
				this.status = 'loading';
				this.pageInfo.page++
				this.getDate();
			}
		},
		mounted() {
			this.getDate()
		}
	}
</script>

<style>

</style>
