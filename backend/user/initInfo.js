const express = require('express');
const mysql = require('mysql')

const router = express.Router();   //二级路由

router.use("/initInfo", (req, res) => {
    console.log(req.user)
    const idCode = req.user.idCode;
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
        `select name,profile,email,phone from user_info where idCode=${idCode}`,
        (err, row) => {
            if (err) console.log(err);
            else {
                res.send({
                    name: row[0]["name"],
                    profile: row[0]["profile"],
                    email: row[0]["email"],
                    phone: row[0]["phone"],
                });
            }
        }
    );
});

module.exports = router;
