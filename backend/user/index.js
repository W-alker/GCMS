const express = require('express');
const expressJwt = require('express-jwt')
const Token = require('../logining/token');    //token方法

let router = express.Router();   //二级路由


//express-jwt挂载，验证token
router.use(
    expressJwt({
        secret: Token.scrict,
        algorithms: ["HS256"],
        getToken: function fromCookie(req) {
            //更改默认尝试从cookie读取token进行验证
            if (req.cookies.curToken) return req.cookies.curToken.split(" ")[1];
            return null;
        },
    }).unless({
        path: ["/"], //白名单，不作解析
    })
);
router.use(function (err, req, res, next) {
    if (err.name === "UnauthorizedError") {
        res.status(401).send({ msg: "invalid token..." });
        console.log("token校验失败");
    }
});

module.exports = router;
