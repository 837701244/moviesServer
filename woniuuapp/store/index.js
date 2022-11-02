import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		user: null,
		userState:false,
		titel: "蜗牛看电影",
		categoryList: ["默认", "喜剧", "爱情", "动作", "科幻", "动画", "悬疑", "犯罪", "惊悚", "冒险", "音乐", "历史", "奇幻", "恐怖", "战争",
			"传记", "歌舞", "武侠", "情色", "灾难", "西部", "纪录片", "短片"
		],
	},
	getters:{
		
	},
	mutations:{
		changeUser(state,obj){
			if(obj){
				state.user = obj,
				state.userState=true
			}else{
				state.user = null,
				state.userState=false
			}
		}
	},
	actions:{
		
	},
	modules:{
		
	}
})
