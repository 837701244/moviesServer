const M = require("./MController");
const TB="moviesTable";

class movieController {

    async getcate(req,res){
        try{

            let cate=Number(req.query.cate)||0
            const data=await M.GetRow(TB,{category:cate},{
                title:1,
                image:1,
                rating:1,
                pbtime:1,
                category:1
            })


            res.json({status:true,data})

        }catch (err) {
            res.json({status:false,message:err.message})
        }
    }

    async gettop(req, res) {
        try{
            const num = req.query.num || 24
            const data = await M.FetchAll("moviesTable", {}, {
                _id: 1,
                title: 1,
                image: 1,
                rating: 1,
                category: 1
            }, {rating: -1}, num * 1)
            res.json({data, status: true})
        }catch (e) {
            res.json({e, status: false})
        }

    }

    async savemovie(req,res){
        try {
            let data = await M.Update("moviesTable",{_id:req.body._id},req.body)
            res.json({data,status:true})
        }catch (e) {
            res.json({e,status:false})
        }
    }

    async getCatePage(req,res){
        console.log(req.body,"111111111111")
        try{
            let pageSize = req.body.pageSize * 1;
            let page = req.body.page * 1;
            let category = (req.body.cate)*1;
            let start = (page - 1) * pageSize;
            category = category ? {state: 1, category} : {state: 1};
            // let cate=Number(req.query.cate)||0

            // const data=await M.GetRow(TB,{category:cate},{
            //     title:1,
            //     image:1,
            //     rating:1,
            //     pbtime:1,
            //     category:1
            // })
            const data = await M.Page("moviesTable", {__v: 0}, category, {}, pageSize, start); //分页
            const count = await M.Total("moviesTable", category); //总数据
            const maxPage = Math.ceil(count / pageSize)
            res.json({count, data, maxPage, status: true})
            // res.json({status:true,data})

        }catch (err) {
            res.json({status:false,message:err.message})
        }
    }

}
module.exports = movieController;