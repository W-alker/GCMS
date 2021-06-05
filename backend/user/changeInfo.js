const express = require('express');
const formidable = require("express-formidable"); //解析FormData
const mysql = require('mysql');

const router = express.Router();   //二级路由
//formdata解析挂载中间件
router.use(formidable());

/* 修改密码验证 */
//用户提交修改密码需求
router.use("/", (req, res) => {
    const { idCode, email, phone } = req.fields;
    console.log("用户" + idCode + "尝试修改信息中");

    // 链接数据库
    let connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "walker314",
        database: "gcms",
    });
    connection.connect(function (err) {
        err ? console.log("数据库链接失败") : console.log("链接成功！");
    });
    //修改昵称和手机号
    connection.query(
        `update user_info set phone="${phone}",email="${email}" where idCode=${idCode}`,
        (err, row) => {
            if (err) return res.send({ err: 1, msg: '数据库错误' })
            connection.end();
            console.log("信息修改成功");
            res.send({ err: 0, msg: "信息修改成功" });
        }
    );
});

module.exports = router;