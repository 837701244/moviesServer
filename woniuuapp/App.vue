<script>
	import {mapState,mapMutations} from "vuex"
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			...mapMutations(["changeUser"]),
			getUser(){
				let token = uni.getStorageSync("token")
				if(!token)return
				uni.request({
					url:"/api/loginCheck",
					method:"POST",
					data:{token:token},
					success: (res) => {
						console.log(res.data);
						let {status,data} = res.data
						if(status){
							this.changeUser(data.user)
						}
					}
				})
			}
		},
		mounted() {
			this.getUser()
		}
	}
</script>

<style lang="scss">
	@import "/static/css/main.min.css";
	 @import "/uni_modules/uview-ui/index.scss";
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
	/*每个页面公共css */
</style>
