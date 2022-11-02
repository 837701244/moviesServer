<template>
	<view>
		<view class="padding">
			<u-search placeholder="搜索电影" @clear="clear" :clearabled="true" v-model.trim="word"  @change="searchFn" :focus="true" height="30":showAction="false" inputAlign="center" ></u-search>
		</view>
		<view >
			<view class=" text-small text-center " style="margin-left: 5px; width: 70px; line-height: 28px;border-radius: 10px;background-color: rgba(177, 177, 177, .3);">搜索记录:</view>
			<view style="padding: 5px;margin: 10px 10px 0 20px;" v-if="historicWord">
				<block v-for="(item,index) in historicWord" :key="index">
					<text @click="historySerach(item)" class="text-small margin-big-right " style="margin-bottom: 10px; background-color: rgba(177, 177, 177, .3);border-radius: 7px;padding: 3px 5px 3px 5px">{{item}}</text>
				</block>
				
				<!-- <text class="text-small" style="background-color: rgba(177, 177, 177, .3);border-radius: 7px;padding: 3px">111111</text> -->
			</view>
		</view>
		<view>
				<view class="padding" v-if="moviesData">
					<block v-for="(item,index) in moviesData" :key="index">
					<view class="flex margin-large-bottom ">
						<view class="margin-big-right">
							<u--image mode="scaleToFill" :src="item.image"
								width="90px" height="130px" @click="click"></u--image>
						</view>
						<view class="text-father">
								<view class="text-center" style="font-size: 14px; ">{{item.title}}</view>
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
	</view>
</template>

<script>
	import {
		mapState
	} from "vuex"
	export default {
		data() {
			return {
				historicWord:null,
				word:"",
				pageInfo:{
					page:1,
					pageSize:5
				},
				moviesData:[],
				status:'loadmore'
			}
		},
		 watch: {
				word(n,o){
					if(n=o)return
					let historicWord = uni.getStorageSync("historicWord")
						if(!historicWord){
							uni.setStorageSync("historicWord",JSON.stringify([this.word]) )
						}else{
							const tmp=[...new Set([...JSON.parse(uni.getStorageSync("historicWord")),this.word])]
							console.log(tmp);
							uni.setStorageSync("historicWord",JSON.stringify(tmp))
						}
						
						
						
				}
		 },
		computed: {
			...mapState(["categoryList"])
		},
		onPullDownRefresh() {
			this.status = 'loadmore';
			this.pageInfo.page = 1;
			this.moviesData = [];
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
			this.searchFn()
		},
		onReachBottom() {
			if (this.status !== 'nomre') {
				this.status = 'loading';
				this.pageInfo.page++
				this.searchFn();
			}
		},
		methods: {
			historySerach(word){
				console.log(word);
				this.word = word
			},
			clear(){
				this.moviesData=[]
				this.status = 'nomre'
			},
			searchFn(){
				
				console.log(this.word);
				if(this.word == ""){this.moviesData=[];return}
				
				if(this.word.trim()){
					let obj =uni.getStorageSync("historicWord")
					if(obj){
						this.historicWord =JSON.parse(obj)
						console.log(JSON.parse(obj));
					}
					uni.request({
						url:"/api/searchMove",
						data:{word:this.word,...this.pageInfo},
						success: (res) => {
							console.log(res.data);
							let {status,data,maxPage,count} = res.data
							if (status) {
								if (this.pageInfo.page > maxPage)  this.status = "nomore"
								if(data.length == 0 && count ==0){
									return this.moviesData = []
								}
								this.moviesData = this.moviesData.concat(data)
							}
						}
					})
				}
				
			}
		},mounted(){
			
				let obj =uni.getStorageSync("historicWord")
				if(obj){
					this.historicWord =JSON.parse(obj)
					console.log(JSON.parse(obj));
				}
				
		}
	}
</script>

<style scoped lang="scss">
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
