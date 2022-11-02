<template>
	<view>
		
		<u-tabs v-if="category" @click="clickFn" :list="category" lineWidth="30" lineColor="#ffcc00" :activeStyle="{
		            color: '#303133',
		            fontWeight: 'bold',
		            transform: 'scale(1.05)'
		        }" :inactiveStyle="{
		            color: '#606266',
		            transform: 'scale(1)'
		        }" itemStyle="padding-left: 15px; padding-right: 15px; height: 34px;">
		</u-tabs>
		
		<view class="padding">
			<block v-for="item in moviesData" :key="item._id">
			<view class="flex margin-large-bottom ">
				<view class="margin-big-right">
					<u--image mode="scaleToFill" :src="item.image"
						width="90px" height="130px" @click="click"></u--image>
				</view>
				<view class="text-father">
					
						<view class="text-center" style="font-size: 14px; "><navigator :url="'/pagesB/detail/detail?id='+item._id">{{item.title}} </navigator></view>
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







		</view>
		<u-loadmore :status="status"></u-loadmore>

	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"

	export default {
		data() {
			return {
				category: null,
				cate: 0,
				moviesData: [],
				pageInfo: {
					page: 1,
					pageSize: 5,
				},
				status: 'loadmore'

			}
		},
		computed: {
			...mapState(["categoryList"])
		},
		methods: {
			changeCat() {
				let newCate = [...this.categoryList]
				this.category = newCate.map(item => {
					return {
						name: item
					}
				})
			},
			clickFn(item) {
				console.log(item.index, "22222222222");
				this.cate = item.index;
				this.moviesData=[];
				this.pageInfo.page=1
				this.getdata()

			},
			getdata() {
				uni.request({
					url: "/api/getCatePage",
					method: "POST",
					data: {
						cate: this.cate,
						...this.pageInfo
					},
					success: (res) => {
						console.log(res.data);
						let {
							status,
							data,
							count,
							maxPage
						} = res.data
						if (status) {
							if (this.pageInfo.page > maxPage) this.status = "nomore"
							this.moviesData = this.moviesData.concat(data)
						}
					}
				})
			}
		},
		onPullDownRefresh() {
			this.status = 'loadmore';
			this.pageInfo.page = 1;
			this.moviesData = []
			this.getdata()
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom() {
			if (this.status !== 'nomre') {
				this.status = 'loading';
				this.pageInfo.page++
				this.getdata();
			}
		},
		created() {
			this.changeCat()
		},
		mounted() {
			this.getdata()
		}
	}
</script>

<style scoped lang="scss">
	.shenglv{
		width: 100%;
		/* 溢出部分隐藏 */
		 overflow: hidden;
		 /* 溢出部分用省略号代替 */
		 text-overflow: ellipsis;
		 /* 弹性伸缩盒子模型显示 */
		 display: -webkit-box;
		 /* 限制一个块元素显示的文本行数 */
		 -webkit-line-clamp: 2;
		 /* 设置伸缩盒对象子元素的排列方式 */
		 -webkit-box-orient: vertical;
	}
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
