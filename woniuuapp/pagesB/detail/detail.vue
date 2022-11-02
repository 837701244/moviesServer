<template>
	<view class="pos-rativ" v-if="movies">
		<view class="pos-abs bg-blu" >
			<view class="">
				<image :src="movies.image" mode="scaleToFill" style="width: 100%;"></image>
			</view>
		</view>
		<view class="Movie-main">
			<view style="width: 90%;margin: 20px auto;">
				<view class="flex">
					<view class="flex-item-0" style="margin-right: 14px;">
						<u--image :src="movies.image" width="90px" height="120px"></u--image>
					</view>
					<view class="flex-item-1">
						<view class="h3"> <text class="h4">{{movies.title}}</text></view>
						<view class="flex">
							<text>评分</text>
							:<u-rate inactive-color='#ffcc00' active-color="#ffcc00" size="15":value="movies.rating/2" readonly></u-rate>
							<text style="color: #ffcc00;">({{movies.judge}}评分)</text>
						</view>
						<view>
							<text>类型</text>
							:{{categoryList[movies.category]}}
						</view>
						<view>
							<text>语言</text>
							:{{movies.language}}
						</view>
						
						<view>
							<text>上映时间</text>
							:{{movies.pbtime|skSetDate('yyyy年MM月dd日')}}
						</view>
					</view>
					
				</view>
				<view class="flex detai-but">
					<view v-if="want" @click="wantLook" class="icon-box text-center margin-big-right" ><u-icon name="heart-fill"color="red" style="display: inline-block;margin-right: 3px;"></u-icon>想看</view>
					<view v-if="!want" @click="wantLook" class="icon-box text-center margin-big-right" ><u-icon name="heart"color="red" style="display: inline-block;margin-right: 3px;"></u-icon>想看</view>
					<view class="icon-box text-center"><u-icon name="star"color="#ffcc00" style="display: inline-block;margin-right: 3px;"></u-icon>评分</view>
				</view>
				
				<view style="overflow: hidden;" >
					<view style="margin-top: 40px;">
						<navigator :url="'/pagesB/ticket/ticket?id='+movies._id"><view class="bg-red text-center goBuy" style="margin: 0 auto; ">立即购票</view></navigator>
						
					</view>
				</view>
			</view>
			<view class="padding">
				<u-read-more :toggle="true" showHeight="65" closeText="">
						<rich-text :nodes="movies.brief" ></rich-text>
				</u-read-more>
			</view>
			<view style="color: #000;" class="margin-big-left">
				<view style="color: #000;">相关电影</view>
				<view  v-if="hotMovies">
					<u-scroll-list @right="right" class="scroll-list" style="flex-direction: row;">
						        <view   class="scroll-list__goods-item" v-for="(item, index) in hotMovies" :key="index">
						             <image @click="change(item._id)" class="scroll-list__goods-item__image" :src="item.image"></image>
									<text  style="display: block; width: 100px; white-space: nowrap; overflow: hidden;text-overflow: ellipsis;" class="scroll-list__goods-item__text">{{item.title}}</text>
						        </view>
								 <view class="scroll-list__show-more">
								                <text class="scroll-list__show-more__text">查看更多</text>
								                <u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
								    </view>
					</u-scroll-list>
				</view>
			</view>
		</view>
		<view>
			<u-modal :showCancelButton="true" @cancel="closeFn" @confirm="gotoLogin" :show="show" :title="title" :content='content'></u-modal>
		</view>
		
	</view>
</template>

<script>
	import {mapState} from "vuex"
	export default {
		data() {
			return {
				show:false,
				title:'未登录',
				content:'是否需要登录',
				id:"",
				movies:null,
				hotMovies:null,
				list: [],
				want:false
			}
		},
		computed:{
			...mapState(["categoryList","user"])
		},
		methods: {
			panduanWant(){
				uni.request({
					url:"/api/findByUidMid",
					method:"POST",
					data:{uid:this.user._id,mid:this.id},
					success: (res) => {
						console.log(res.data,"iiiiiiiiiiiiiiiiii");
						let {status,data} = res.data
						if(status){
							this.want = true
						}
					}
				})
			},
			closeFn(){
				this.show=false
			},
			gotoLogin(){
				this.show=false
				uni.navigateTo({
					url:"/pagesB/login/login"
				})
			},
			wantLook(){
				if(!uni.getStorageSync("token")){
					return this.show=true
				}
				this.want =!this.want
				uni.request({
					url:"/api/setWantInfo",
					method:"POST",
					data:{uid:this.user._id,mid:this.id},
					success: (res) => {
						console.log(res.data);
						let {status,data} = res.data
						
					}
				})
				
			},
			getData(){
				uni.request({
					url:"/api/getMovDate",
					data:{id:this.id},
					success: (res) => {
						console.log(res.data);
						let {data,status} = res.data
						if(status){
							this.movies= data
						}
					}
				})
				
			},
			right(){
				console.log(11111);
				uni.switchTab({
					url:"/pages/find/find"
				})
			},
			change(word){
				console.log(word);
				this.id = word
				this.getData()
			},
			randomArr(arr){
				let newArr=[]
				for(let i=0;i<10;i++){
					let num = Math.floor(Math.random()*10)
					newArr.push(...arr.splice(num,1))
				}
				return newArr
			},
			getFiveData(){
				uni.request({
					url:"api/gettop12",
					success: (res) => {
						console.log(res.data);
						let {status,data} = res.data
						if(status){
							let newArr = this.randomArr(data)
							this.hotMovies =newArr.map(item=>{
								return {title:item.title,image:item.image,_id:item._id}
							})
							
							
						}
					}
				})
			},
			
		},mounted() {
			this.id=this.options.id
			this.getData()
			this.getFiveData()
			this.panduanWant()
		}
		
	}
</script>

<style scoped lang="scss">
.pos-rativ{
	position: relative;
}
.pos-abs{
	position: absolute;
	top: 0;
}
.bg-blu{
	width: 100%;
	height: 170px;
	z-index: -10;
	background-size: 100%;
	filter: blur(70px);
	overflow: hidden;
}
.Movie-main{
	width: 100%;
	height: 170px;
	
	uni-view{
		color: #fff;
		font-size: 13px;
		margin-bottom: 3px;
	}
	
}


.detai-but{
	margin-top: 10px;
}
.icon-box{
	width: 150px;
	line-height: 30px;
	background-color: rgba(255, 255, 255, .3);
	border-radius: 8px;
	border: 1px solid #ddd;
}
.goBuy{
	line-height: 30px;
}

.scroll-list {
	@include flex(column);

	&__goods-item {
		margin-right:2px;

		&__image {
			width: 90px;
			height: 120px;
			border-radius: 4px;
		}

		&__text {
			width: 150px;
			color: #000;
			text-align: center;
			font-size: 10px;
			margin-top: 5px;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}
}
</style>
