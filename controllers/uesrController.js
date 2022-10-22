const M = require("./MController");
const datas = require("../initjson/movies.json");
const TB="userTable";

class userController {
    async test(req,res){
        try{
            let data=await M.GetOne(TB)
            res.json({status:true,data,tb:TB})
        }catch (err) {
            res.json({status:false,data:err})
        }
    }
    async findOne(req,res){
        try{
            let name = req.query.name;
            let pwd = req.query.pwd;
            let data=await M.GetOne("userTable",{name,pwd})
            res.json({status:true,data})
        }catch (err) {
            res.json({status:false,data:err})
        }
    }
    async findById(req,res){
        try{
            let _id = req.query.id;
            let data=await M.GetOne("userTable",{_id})
            res.json({status:true,data})
        }catch (err) {
            res.json({status:false,data:err})
        }
    }
    async updataUser(req,res){
        try {
            let obj =  req.body
            const data = await M.Update("userTable",{_id:obj._id},obj)

            res.json({data, status: data.modifiedCount ==1  ? true : false})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    async getUser(req, res) {
        let pageSize = req.query.pageSize * 1;
        let page = req.query.page * 1;
        let start = (page - 1) * pageSize;
        const data = await M.Page("userTable", {__v: 0}, {}, {}, pageSize, start); //分页
        const count = await M.Total("userTable"); //总数据
        const maxPage = Math.ceil(count / pageSize)
        res.json({count, data, maxPage, status: true})

    }

    async initUser(req, res) {
        //const data = M.InserMany("moviesTable", movie)
        let datas = require("../initjson/user.json")

        const data = await M.InserMany("userTable", datas)

        res.json({datas, status: true})
    }
    async delOneUser(req, res) {
        let _id = req.body.id;
        let {deletedCount:data} = await M.Del("userTable",{_id})
        res.json(data == 1 ? {status:true,data}:{status:false})

    }
    async delArrUser(req, res) {
        let {arr} = req.body
        let {deletedCount:data} = await M.Del("userTable",{_id:{$in:arr}})
        res.json(data > 0 ? {status:true,data}:{status:false})
    }
    async searchUser(req, res) {
        console.log(req.query)
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

            const data = await M.Page("userTable", {__v: 0}, {name: {$regex: word}}, {}, pageSize, start); //分页
            const count = await M.Total("userTable", {name: {$regex: word}}); //总数据
            const maxPage = Math.ceil(count / pageSize)
            res.json({count, data, maxPage, status: true})

        } catch (e) {
            res.json({e: e.message, status: false})
        }

    }

    async getUserCharts(req, res) {
        try {
            const piple = [
                {
                    $group: {
                        _id: "$state",
                        state: {
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
            let data = await M.Aggregate(TB, piple);  //管道 聚合 查询
            console.log("管道 聚合 查询",data);
            data = data.reduce((a, b) => a.push(b.state) && a, [])
            res.json({data, status: true})

        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }




}
module.exports =userController;