const express = require('express');
const uploader = require("../utils/upload.config.js");


/*路由控制器*/
const routeController = require("../controllers/routeController");
const RC = new routeController();

/*
* 电影控制器
* */
const movieController = require("../controllers/movieController");
const MC=new movieController();
/*
* 用户控制器
* */
const userController=require("../controllers/uesrController")
const UC=new userController();

/*场次控制器*/
const sessionController=require("../controllers/sessionController")
const SC=new sessionController();

/*影院控制器*/
const cinemaController=require("../controllers/cinemaController")
const CM=new cinemaController();


/*接口路由表*/
const router = express.Router();
router.get('/', (req, res, next) => res.json({ info: "root" }))
    .post("/login", RC.Login)
    .get("/loginout", RC.loginOut)
    .get("/getUserInfo", RC.getUserInfo)
    .get("/getuserData", RC.getuserData)
    .post("/loginCheck", RC.loginCheck)
    .post("/adduserdata", RC.addUserData)
    .post("/upload", uploader.single('img'), RC.upload)
    .get("/initMovie", RC.initMovie)
    .post("/addMovie",RC.addMovie)
    .post("/delOne",RC.delOneMovie)
    .post("/delArr",RC.delArrMovie)
    .get("/getMovDate",RC.getShow)
    .post("/updata",RC.updataMov)
    .get("/getmovie", RC.getMovie)
    .get("/gettop12", RC.gettop12)
    .get("/gettop",MC.gettop)
    .get("/getsession", RC.getSession)
    .get("/getorder", RC.getOrder)
    .get("/movieoptions", RC.movieOptions)
    .get("/getShow", RC.getShow)
    .get("/searchMove", RC.searchMove)
    .post("/wxlogin", RC.wxlogin)
    .post("/getCharts",RC.getCharts)
    .get("/randmovie", RC.randMovie)
    .get("/getcate", MC.getcate)
    .get("/testuc",UC.test)
    .get("/searchSession",SC.searchSession)
    .post("/updateMovie",MC.savemovie)
    .get("/findOne",UC.findOne)
    .post("/getCatePage",MC.getCatePage)
    .post("/updataUser",UC.updataUser)
    .get("/getUser",UC.getUser)
    .get("/initUser",UC.initUser)
    .post("/delOneUser",UC.delOneUser)
    .post("/delArrUser",UC.delArrUser)
    .get("/searchUser",UC.searchUser)
    .get("/findById",UC.findById)
    .get("/getcinema", RC.getCinema)
    .get("/cinemaoptions", RC.cinemaOptions)
    .get("/initCm",CM.initCm)
    .get("/getCm",CM.getdata)
    .get("/searchCm",CM.searchCm)
    .post("/delOneCm",CM.delOneCm)
    .post("/delArrCm",CM.delArrCm)
    .post("/addCm",CM.addCm)
    .post("/updataCm",CM.updataCm)
    .post("/findByIdCm",CM.findByIdCm)
    .post("/getUserCharts",UC.getUserCharts)
    .post("/getCount",RC.getCount)
    .get("/getCity",CM.getCity)
module.exports = router;