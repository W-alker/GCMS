const express = require('express');
const expressJwt = require('express-jwt')
const Token = require('../logining/token');    //token方法

const router = express.Router();   //二级路由

const initInfo = require('./initInfo')

//express-jwt挂载，验证token
router.use(
    expressJwt({
        secret: Token.scrict,
        algorithms: ["HS256"],
        getToken: function fromCookie(req) {
            //更改默认尝试从cookie读取token进行验证
            if (req.headers.cookie) return req.headers.cookie.split("%20")[1];
            return null;
        },
    }).unless({
        path: ['/post'], //白名单，不作解析
    })
);
router.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        console.log(err)
        res.status(401).send({ err: 0, msg: "invalid token..." });
        console.log("token校验失败");
    }
});

//进入页面
router.post("/", (req, res) => {
    console.log("用户进入user界面");
    res.send({ err: 0, msg: "登录成功，欢迎使用垃圾分类管理系统！" });
});
//加载个人信息
router.get("/initInfo", initInfo);


module.exports = router;
