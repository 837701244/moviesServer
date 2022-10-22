const M = require("./MController");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = "shuke";
const movie = require("../www/upload/movie.json")
const md5 = require("md5")
const request = require("request")
const querystring = require("querystring")


function setToken(obj) {
    return jwt.sign({user: obj}, //在token里面保存用户信息
        TOKEN_SECRET, //需要一个密钥,是一个字符串，内容自己定义
        {expiresIn: 60 * 60 * 24} //当前这个token在100s以内是有效果，超过这个时间失效
    )
}

class routeController {
    async Login(req, res) {
        try {
            req.body.pwd = md5(md5(req.body.pwd))
            console.log(req.body)
            const data = await M.GetOne("userTable", req.body, {
                age: 1,
                email: 1,
                gender: 1,
                name: 1,
                nickname: 1,
                image: 1,
                state: 1
            });
            if (data) {
                const token = setToken(data)
                res.json({data, token, status: true})
            } else {
                res.json({message: "登录失败", status: false})
            }
        } catch (err) {
            res.json({message: err.message, status: false})
        }
    }

    loginOut(req, res) {
        console.log(jwt)
        res.json({})
    }

    loginCheck(req, res) {
        try {
            const token = req.body.token
            console.log(token)
            const data = jwt.verify(token, TOKEN_SECRET);
            res.json({
                status: data?true:false,
                data
            })
        } catch (err) {
            res.json({err: err.message, status: false})
        }

    }

    async getUserInfo(req, res) {
        try {
            // 获取请求头headers 中的 token //,拆分字符串把之前拼接的去掉
            const token = req.query.token //req.get('Token') //req.query.token //req.get('Authorization').split(' ')[1];
            // 解码 token
            const data = jwt.verify(token, TOKEN_SECRET);

            res.json({
                message: '用户信息获取成功',
                code: 200,
                data
            })
        } catch (err) {
            res.json({err: err.message, status: false})
        }

    }

    async getuserData(req, res) {
        try {
            let pageSize = req.query.pagesize * 1;
            let page = req.query.page * 1;
            let star = (page - 1) * pageSize;
            const data = await M.Page("userTable", {__v: 0}, {}, {}, pageSize, star); //分页
            const count = await M.Total("userTable"); //总数据
            res.json({count, data, status: true})

        } catch (e) {
            res.json({e: e.message, status: false})
        }

    }

    async addUserData(req, res) {
        try {
            console.log(req.body)
            if (!req.body.image){
                req.body.image = "http://localhos:6600/upload/top250/1.jpg"
            }
            req.body.pwd = md5(md5(req.body.pwd))
            const data = await M.Create("userTable", req.body); //保存
            res.json({data, status: true})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    upload(req, res) {
        console.log(req.file);
        res.json({status: true, msg: "success", path: `/upload/${req.file.filename}`});

    }

    async initMovie(req, res) {
        //const data = M.InserMany("moviesTable", movie)
        let datas = require("../initjson/movies.json")
        const data = await M.InserMany("moviesTable", datas)
        res.json({datas, status: true})
    }
    async addMovie(req,res){
        let obj = req.body
        // if (!obj.image){
        //     obj.image = "http://localhost:6600/upload/top250/120.jpg"
        // }
        // if (!obj.link){
        //     obj.link = "https://www.baidu.com"
        // }
        // console.log(obj)
        const  data = await M.InserMany("moviesTable",obj)
        res.json(data.length>0?{status:true,data}:{status:false})
    }
    async delOneMovie(req,res){
        let {id} = req.body
       let {deletedCount:data} = await M.Del("moviesTable",{_id:id})
        res.json(data == 1 ? {status:true,data}:{status:false})
    }
    async delArrMovie(req,res){
        let {arr} = req.body
        let {deletedCount:data} = await M.Del("moviesTable",{_id:{$in:arr}})
        res.json(data > 0 ? {status:true,data}:{status:false})
    }


    async getMovie(req, res) {
        let pageSize = req.query.pageSize * 1;
        let page = req.query.page * 1;
        let category = req.query.cate * 1; //0 1,2,3
        category = category ? {state: 1, category} : {state: 1};
        let start = (page - 1) * pageSize;
        const data = await M.Page("moviesTable", {__v: 0}, {}, {}, pageSize, start); //分页
        const count = await M.Total("moviesTable", category); //总数据
        const maxPage = Math.ceil(count / pageSize)
        res.json({count, data, maxPage, status: true})

    }


    async gettop12(req, res) {
        const num = req.query.num || 24
        const data = await M.FetchAll("moviesTable", {}, {
            _id: 1,
            title: 1,
            image: 1,
            rating: 1,
            category: 1
        }, {rating: -1}, num * 1)
        res.json({data, status: true})
    }

    async randMovie(req, res) {
        const max = await M.Total("moviesTable", {state: 1});
        const skip = parseInt(Math.random() * (max - 10))
        const data = await M.Page("moviesTable", {
            title: 1,
            image: 1,
            rating: 1,
            actor: 1
        }, {state: 1}, {rating: -1}, 10, skip);
        res.json({max, data, status: true})
    }

    async getCinema(req, res) {
        let pageSize = req.query.pagesize * 1;
        let page = req.query.page * 1;
        let category = req.query.cate * 1; //0 1,2,3
        category = category ? {state: 1, category} : {state: 1};

        let star = (page - 1) * pageSize;
        const data = await M.Page("cinemaTable", {__v: 0}, {}, {}, pageSize, star); //分页
        const count = await M.Total("cinemaTable"); //总数据
        res.json({count, data, status: true})

    }

    async getSession(req, res) {
        let pageSize = req.query.pagesize * 1;
        let page = req.query.page * 1;
        let category = req.query.cate * 1; //0 1,2,3
        category = category ? {state: 1, category} : {state: 1};

        let star = (page - 1) * pageSize;
        //const data = await M.Page("sessionTable", {__v: 0},{}, {}, pageSize, star); //分页
        let piple = [
            {
                $project: {
                    _id: "$_id",
                    money: "$money",
                    mid: {
                        $toObjectId: "$mid"
                    }

                    ,
                    cid: {
                        $toObjectId: "$cid"
                    },
                    startTime: "$startTime",
                    state: "$state"
                }
            },
            {

                $lookup: {
                    from: "moviesinfo",
                    localField: "mid",
                    foreignField: "_id",
                    as: "movies"
                }
            },
            {

                $lookup: {
                    from: "cinemainfo",
                    localField: "cid",
                    foreignField: "_id",
                    as: "cinema"
                },

            },
            {
                $project: {
                    __v: 0
                }
            }, {
                $skip: star
            }, {
                $limit: pageSize,

            }];
        const data = await M.Aggregate("sessionTable", piple)
        const count = await M.Total("sessionTable"); //总数据
        res.json({count, data, status: true})

    }

    async getOrder(req, res) {
        let pageSize = req.query.pagesize * 1;
        let page = req.query.page * 1;
        let category = req.query.cate * 1; //0 1,2,3
        category = category ? {state: 1, category} : {state: 1};
        let star = (page - 1) * pageSize;

        let piple = [
            {
                $project: {
                    _id: "$_id",
                    sid: {
                        $toObjectId: "$sid"
                    },
                    uid: {
                        $toObjectId: "$uid"
                    },
                    cid: {
                        $toObjectId: "$cid"
                    },
                    orderTime: "$orderTime",
                    state: "$state"
                }
            },
            {

                $lookup: {
                    from: "userinfo",
                    localField: "uid",
                    foreignField: "_id",
                    as: "users"
                }
            },
            {

                $lookup: {
                    from: "sessioninfo",
                    localField: "sid",
                    foreignField: "_id",
                    as: "sessions"
                }
            },
            {

                $lookup: {
                    from: "cinemainfo",
                    localField: "cid",
                    foreignField: "_id",
                    as: "cinemas"
                }
            },
            {
                $project: {
                    "orderTime": 1,
                    "state": 1,
                    "users.nickname": 1,
                    "users.name": 1,
                    "sid": 1,
                    "uid": 1,
                    "cid": 1,
                    "sessions.money": 1,
                    "sessions.startTime": 1,
                    "cinemas.brandName": 1,
                    "cinemas.cinemaAddress": 1,
                    "cinemas.cinemaPhone": 1,
                }
            }
            , {
                $skip: star
            }, {
                $limit: pageSize,

            }];
        const data = await M.Aggregate("orderTable", piple)
        const count = await M.Total("orderTable"); //总数据
        res.json({count, data, status: true})

    }

    async getShow(req, res) {

        try {
            console.log(req.query)
            let _id = req.query.id;
            const data = await M.GetOne("moviesTable", {_id, state: 1})
            res.json({data, status: data ? true : false})
        } catch (e) {
            res.json({e: e.message, status: false})
        }

    }
    async updataMov(req,res){
        try {
          let obj =  req.body
            const data = await M.Update("moviesTable",{_id:obj._id},obj)

            res.json({data, status: data.modifiedCount ==1  ? true : false})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    async searchMove(req, res) {
        try {
            let word = req.query.word,
                page = req.query.page * 1 ||1,
                pageSize = req.query.pageSize * 1||10;

            /* const data = await M.GetRow("moviesTable", {title: {$regex: word}}, {
                 _id: 1,
                 image: 1,
                 title: 1,
                 rating: 1
             });*/

            let start = (page - 1) * pageSize;

            console.log(word, page, pageSize, start);

            const data = await M.Page("moviesTable", {__v: 0}, {title: {$regex: word}}, {pbtime:"-1"}, pageSize, start); //分页
            const count = await M.Total("moviesTable", {title: {$regex: word}}); //总数据
            const maxPage = Math.ceil(count / pageSize)
            res.json({count, data, maxPage, status: true})

        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    async wxlogin(req, res) {
        /*发送给微信服务器*/
        let data = {
            'appid': "wx4d3771592d9cf2c5",
            'secret': "600e574879b9caef3813b1a1958e62e2",
            'js_code': req.body.code,
            'grant_type': 'authorization_code'
        };
        let params = querystring.stringify(data); //拼接成字符串
        console.log(params);
        /*发送请求给微信服务器,携带参数 get*/
        request.get({
            url: 'https://api.weixin.qq.com/sns/jscode2session?' + params
        }, async (error, response, body) => {
            //openid 以字符串的形式 在 body 中

            const {openid} = JSON.parse(body)  //从body中获取openid
            //判断用户信息是否存在 预防数据重复录入

            const user = await M.GetOne("userTable", {openid: openid}, {pwd: 0})
            /*判断用户是否存在*/
            if (user) {   //存在
                const token = setToken(user);  //用户数据转化为TOKEN
                res.json({status: true,data:user, token, message: "获取用户数据成功"});
            } else {  //数据库中不存在微信用户

                //保存数据到用户表中
                if (openid) {
                    const user = {
                        name: "",
                        nickname: req.body.userInfo.nickName,
                        age: 0,
                        pwd: "",
                        pic: req.body.userInfo.avatarUrl,
                        card: "",
                        gender: req.body.userInfo.gender,
                        openid,
                        email: "",
                        state: 1
                    }

                    M.Create("userTable", user).then(result => {  //用户在数据库中完整的数据信息
                        delete result.pwd;    //删除该数据对象中的 pwd
                        const token = setToken(result);  //用户数据转化为TOKEN
                        res.json({status: true,data:result,token, message: "录入数据成功"});
                    })


                } else {  //没有获取openid
                    res.json({status: false, message: "微信服务器验证失败"});
                }

            }




            //


        });
    }

    async getCharts(req, res) {
        try {
            const piple = [
                {
                    $group: {
                        _id: "$category",
                        category: {
                            $sum: 1
                        }
                    }
                },
                {
                    $sort: {
                        _id: 1
                    }
                },
            ]
            let data = await M.Aggregate("moviesTable", piple);  //管道 聚合 查询
            console.log("管道 聚合 查询",data);
            data = data.reduce((a, b) => a.push(b.category) && a, [])
            res.json({data, status: true})

        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    async movieOptions(req, res) {
        try {
            let word = req.query.word;
            const data = await M.GetRow("moviesTable", {title: {$regex: word}}, {_id: 1, title: 1});
            res.json({data, status: true})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    async cinemaOptions(req, res) {
        try {
            let word = req.query.word;
            const data = await M.GetRow("cinemaTable", {brandName: {$regex: word}}, {_id: 1, brandName: 1});
            res.json({data, status: true})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }
    async getCount(req,res){
        try {

            const cinemaCount = await M.Total("cinemaTable");
            const userCount = await M.Total("userTable");
            const moviesCount = await M.Total("moviesTable");
            res.json({cinemaCount,userCount,moviesCount, status: true})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }
}

module.exports = routeController;