import Vue from "vue";


Vue.filter("skSetDate",function (self,str="yyyy年MM月dd日 HH:mm:ss") {

    let skDate=new Date(self);

    //获取时间对象
    let year = skDate.getFullYear()   //获取年
        , moth = skDate.getMonth() + 1   //获取月
        , _day = skDate.getDate()      //获取日
        , hours = skDate.getHours()    //小时
        , minutes = skDate.getMinutes() //分钟
        , seconds = skDate.getSeconds(); //秒
    hours = hours < 10 ? "0" + hours : hours;             //判断小时如果小于10则与0字符拼接
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    str = str.replace("yyyy", year);
    str = str.replace("MM", moth);
    str = str.replace("dd", _day);
    str = str.replace("HH", hours);
    str = str.replace("mm", minutes);
    str = str.replace("ss", seconds);
    return str; //返回
})
Vue.filter("skSetState",function (self) {
    return self == 1 ? "上架":"下架"
})