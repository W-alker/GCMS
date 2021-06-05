const express = require('express');
const formidable = require("express-formidable"); //解析FormData
const mysql = require('mysql')

const router = express.Router();   //二级路由
//formdata解析挂载中间件
router.use(formidable());

/* 修改密码验证 */
//用户提交修改密码需求
router.use("/", (req, res) => {
    console.log(req.fields);
    const { oldPwd, newPwd, confirmPwd, idCode } = req.fields;
    console.log("用户" + idCode + "正在尝试修改密码");
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "walker314",
        database: "gcms",
    });
    connection.connect(function (err) {
        err ? console.log("数据库链接失败") : console.log("链接成功！");
    });
    connection.query(
        `select pwd from user_account where idCode=${idCode}`,
        (err, row) => {
            if (err) return console.log(err);
            if (oldPwd !== row[0]["pwd"])
                return res.send({ err: 1, msg: "旧密码验证错误" });
            connection.query(
                `update user_account set pwd='${newPwd}' where idCode=${idCode} and school="${SName}"`
            );
            connection.end();
            res.clearCookie("curToken").send({ err: 0, msg: "修改成功,请重新登录" });
        }
    );
});

module.exports = router;
