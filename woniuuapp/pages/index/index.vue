<template>
	<view class="content">
		<HeaderCom></HeaderCom>
		<view >
			<swiper :indicator-dots="true" indicator-color="gray" autoplay indicator-active-color="white" :interval="2000" :circular="true">
			    <block  v-for="(item,index) in imgArr"   :key="index">
			      <swiper-item>
			        <image :src="item" mode="aspectFill" style="width: 100%;height: 150px;"></image>
			      </swiper-item>
			    </block>
			  </swiper>
		</view>
		
		
		
		
		<view class="padding" v-if="movies">
			<block v-for="(item,index) in movies" :key="index">
				
				<view class="flex margin-large-bottom ">
					<view class="margin-big-right">
						<u--image mode="scaleToFill" :src="item.image"
							width="90px" height="130px" @click="click"></u--image>
					</view>
					<view class="text-father">
						<navigator :url="'/pagesB/detail/detail?id='+item._id"><view class="text-center" style="font-size: 14px; ">{{item.title}}</view></navigator>
							
							<view class="shenglv text-small" style="color: #555; height: 30px;">{{item.brief}}</view>
							<view class="flex">
								<text>评分</text>
								:<u-rate active-color="#ffcc00" size="15":value="item.rating/2" readonly></u-rate>
							</view>
							<view>
								<text>上映时间</text>
								:{{item.pbtime|skSetDate('yyyy年MM月dd日')}}
							</view>
							<view>
								<text>类型</text>
								:{{categoryList[item.category]}}
							</view>
							<view>
								<text>时长</text>
								:{{item.timeCount}}分钟
							</view>
					</view>
				</view>
			</block>
				<u-loadmore :status="status"></u-loadmore>
		</view>
		
	</view>
</template>

<script>
	import HeaderCom from "@/components/HeaderCom/HeaderCom.vue"
	import {mapState} from "vuex"
	
	
	export default {
		data() {
			return {
				status:'loadmore',
				 imgArr:[
				      "https://img1.baidu.com/it/u=997317338,2727204479&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500",
				      "https://img1.baidu.com/it/u=3330216196,2347193259&fm=253&fmt=auto&app=138&f=PNG?w=500&h=211",
				      "https://img2.baidu.com/it/u=2971482805,3641477735&fm=253&fmt=auto&app=138&f=JPEG?w=1600&h=500"
				    ],
				i:1,
				pageInfo:{
					page:1,
					pageSize:10
				},
				movies:[]
			}
		},
		computed:{
			...mapState(["categoryList"])
		},
		onLoad() {

		},
		onPullDownRefresh() {
			this.pageInfo.page = 1;
			this.moviesData = [];
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
			this.getAjax()
		},
		onReachBottom() {
			if (this.status !== 'nomre') {
				this.status = 'loading';
				this.pageInfo.page++
				this.getAjax();
			}
		},
		methods: {
				add(){
					this.i++
				},
				getAjax(){
					uni.request({
						url:"/api/getmovie",
						data:{...this.pageInfo},
						success: (res) => {
							console.log(res.data);
							let {status,data,maxPage,count} = res.data
							if(status){
								if (this.pageInfo.page > maxPage) this.status = "nomore"
								this.movies = this.movies.concat(data)
							}
							
						}
					})
				}
		},mounted() {
			this.getAjax()
		}
	}
</script>

<style lang="scss">
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
