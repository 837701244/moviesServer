<template>
	<view>
		<view style="position: relative;">
			<view class="bg-img-box">
				<view class="bg-img" :style="{backgroundImage:'url('+moviesDate.image+')'}">
				</view>
				<view style="width: 100%; height: 100%; position: absolute;top: 0; z-index: 10;">

					<view style="width: 90%;margin: 20px auto;">
						<view class="flex text-white text-small">
							<view class="flex-item-0" style="margin-right: 14px;">
								<u--image :src="moviesDate.image" width="90px" height="120px"></u--image>
							</view>
							<view class="flex-item-1 textStyle">
								<view class="h3"> <text class="h4">{{moviesDate.title}}</text></view>
								<view class="flex">
									<text>评分</text>
									:<u-rate inactive-color='#ffcc00' active-color="#ffcc00" size="15"
										:value="moviesDate.rating/2" readonly></u-rate>
									<text style="color: #ffcc00;">({{moviesDate.judge}}评分)</text>
								</view>
								<view>
									<text>类型</text>
									:{{categoryList[moviesDate.category]}}
								</view>
								<view>
									<text>语言</text>
									:{{moviesDate.language}}
								</view>

								<view>
									<text>上映时间</text>
									:{{moviesDate.pbtime|skSetDate('yyyy年MM月dd日')}}
								</view>
							</view>

						</view>
						<!-- <view class="flex detai-but margin-big-top">
							<view class="icon-box text-center margin-big-right">
								<u-icon name="heart" color="red" style="display: inline-block;margin-right: 3px;">
								</u-icon>想看
							</view>
							<view class="icon-box text-center">
								<u-icon name="star" color="#ffcc00" style="display: inline-block;margin-right: 3px;">
								</u-icon>评分
							</view>
						</view> -->
					</view>
				</view>

			</view>
		</view>
		<!-- <view class="margin-big-top ">
			<view class="big-btn text-center  bg-red">
				立即购票
			</view>
		</view> -->
		<view class=" margin-large-top">
			<block v-for="(item,index) in cinemaDate" :key="item._id">
				<view class="border-bottom">
					<view class="padding">
						<navigator :url="'/pagesB/buyMovies/buyMovies?cid='+item.cid+'&mid='+item.mid" >
						<view class="clearfix">
							<view class="float-left" style="width: 70%;">
								<view class="h4">{{item.cinemaInfo[0].brandName}}</view>
								<view class="text-small" style="color: #ddd;margin: 3px 0;">
									{{item.cinemaInfo[0].cinemaAddress}}</view>
								<view style="line-height: 12px; font-size: 10px;" >
									<text class="btn-cinema" >座</text>
									<text class="btn-cinema">小吃</text>
									<text v-if="index % 2 == 0 && index>=2" class="btn-cinema-red">3Dmax</text>
									<text v-if="!index % 2 == 0 && index>=2" class="btn-cinema-red">杜比全景声</text>
								</view>
							</view>
							<view class="float-right " >
								<view class="text-red">￥{{item.money[0]}} <text
										style="margin-left: 2px; font-size: 10px;color: #ddd; "> 起</text></view>
								<view class="text-small text-center " style="color: #ddd;">
									 {{Math.floor(Math.random() * 910) + 90}}m
								</view>
								<view
									style="margin-top: 10px; border: 2px solid red;font-size: 13px;border-radius: 5px;"
									class="text-center text-red" >购票</view>
							</view>
						</view>
						</navigator>
					</view>
				</view>
			</block>

		</view>
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				mid: "",
				cinemaDate: "",
				moviesDate: "",

			}
		},
		computed: {
			...mapState(["categoryList"])
		},
		methods: {
			getCinemaDate() {
				uni.request({
					url: "/api/getSessionsGroupByCid",
					method: "POST",
					data: {
						mid: this.mid
					},
					success: (res) => {
						let {
							data,
							status
						} = res.data
						if (status) {
							this.cinemaDate = data
							console.log(data, "cinemaDate");
						}

					}
				})
			},
			getmoviesDate() {
				uni.request({
					url: "/api/getMovDate",
					data: {
						id: this.mid
					},
					success: (res) => {

						console.log(res.data);
						let {
							data,
							status
						} = res.data
						if (status) {
							this.moviesDate = data
						}
					}
				})
			}

		},
		mounted() {
			this.mid = this.options.id
			this.getCinemaDate()
			this.getmoviesDate()
		}
	}
</script>

<style scoped lang="scss">
	.btn-cinema {
		border-radius: 4px;
		margin-right: 5px;
		padding: 1px 3px;
		text-align: center;
		color: #039af7;
		border: 1px solid #039af7;
		display: inline-block;
	}
	.btn-cinema-red {
		border-radius: 4px;
		margin-right: 5px;
		padding: 1px 3px;
		text-align: center;
		color: red;
		border: 1px solid red;
		display: inline-block;
	}

	.bg-img-box {
		width: 100%;
		height: 400rpx;
		overflow: hidden;
	}

	.bg-img {

		width: 100%;
		height: 100%;
		background-repeat: no-repeat;
		background-size: cover;
		filter: blur(20px);
		transform: scale(1.5);
		background-position: 50%;
	}

	.bg-img::after {
		content: " ";
		display: block;
		width: 100%;
		height: 400rpx;
		background: rgba(17, 17, 17, .2);
		z-index: 1;
	}

	.textStyle {
		>view {
			margin-bottom: 5px;
		}
	}

	.detai-but {
		>view {
			width: 800px;
			line-height: 35px;
			border-radius: 10px;
			background-color: rgba(255, 255, 255, .3);
		}
	}

	.big-btn {
		width: 80%;
		margin: 0 auto;
		line-height: 35px;
		color: #fff;
	}
</style>
