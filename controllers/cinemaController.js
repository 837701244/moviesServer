const M = require("./MController");
const TB = "cinemaTable";

//使用 Aggregate 查询_id 如果要转换数据类型时使用
const {Types} = require("mongoose");
const datas = require("../initjson/user.json");
const {ObjectId} = Types;


class cinemaController {
    async updatecinema(req, res) {
        try {
            const {id} = req.query;
            const piple = [
                {
                    $match: {_id: ObjectId(id)}
                },
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


                        cid: 0,
                        __v: 0
                    }
                }

            ];
            const data = await M.Aggregate(TB, piple)
            res.json({data, status: true})
        } catch (message) {
            res.json({message, status: false})
        }

    }

    async initCm(req, res) {
        let datas = require("../initjson/cinema.json")
        const data = await M.InserMany(TB, datas)
        res.json({datas, status: true})
    }

    async getdata(req, res) {
        try {
            let pageSize = req.query.pageSize * 1 ;
            let page = req.query.page * 1 ;
            let star = (page - 1) * pageSize;
            const data = await M.Page("cinemaTable", {__v: 0}, {}, {}, pageSize, star); //分页
            const count = await M.Total("cinemaTable"); //总数据
            const maxPage = Math.ceil(count / pageSize)
            res.json({count, data, status: true, maxPage})
        } catch (e) {
            res.json({e: e.message, status: false})
        }

    }

    async searchCm(req, res) {
        try {
            let word = req.query.word;
            const data = await M.GetRow("cinemaTable", {brandName: {$regex: word}});
            res.json({data, status: true})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    async delOneCm(req, res) {
        try {
            let _id = req.body.id;
            let {deletedCount: data} = await M.Del(TB, {_id})
            res.json(data === 1 ? {status: true, data} : {status: false})
        } catch (e) {
            res.json({e: e.message, status: false})
        }

    }

    async delArrCm(req, res) {
        try {
            let {arr} = req.body
            let {deletedCount: data} = await M.Del(TB, {_id: {$in: arr}})
            res.json(data > 0 ? {status: true, data} : {status: false})
        } catch (e) {
            res.json({e: e.message, status: false})
        }

    }

    async addCm(req, res) {
        try {
            let obj = req.body
            const data = await M.InserMany(TB, obj)
            res.json(data.length > 0 ? {status: true, data} : {status: false})
        } catch (e) {
            res.json({e: e.message, status: false})
        }

    }

    async updataCm(req, res) {
        try {
            let obj = req.body
            const data = await M.Update(TB, {_id: obj._id}, obj)

            res.json({data, status: data.modifiedCount == 1 ? true : false})
        } catch (e) {
            res.json({e: e.message, status: false})
        }
    }

    async findByIdCm(req, res) {
        try {
            let _id = req.body.id;
            let data = await M.GetOne(TB, {_id})
            res.json({status: true, data})
        } catch (err) {
            res.json({status: false, data: err})
        }
    }

    async getCity(req,res){
        res.json(require("../initjson/city.json"))
    }

}



module.exports = cinemaController;