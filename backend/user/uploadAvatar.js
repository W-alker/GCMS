const express = require('express');
const images = require('images');
const mysql = require('mysql');
const fs = require('fs')

const router = express.Router();   //二级路由

const timeLimit = {};
const id_avatarFile = {};

router.use('/', function (req, res) {
    const idCode = req.fields.idCode;
    //防止用户恶意多次上传
    if (timeLimit[idCode]) return res.send({ err: 1, msg: '同一用户三分钟只能上传一次！' })

/*     if (id_avatarFile[idCode] === undefined) {
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "walker314",
            database: "gcms",
            charset: 'utf8'
        });
        connection.connect(function (err) {
            err ? console.log("数据库链接失败") : console.log("链接成功！");
        });
        connection.query(
            `select profile from user_info where idCode=${idCode}`,
            (err, row) => {
                console.log(row[0].profile)
                //绑定头像路径和id
                id_avatarFile[idCode] = row[0].profile.replace('http://localhost:8100', '.');
                connection.end();
            }
        );
    } */

    if (id_avatarFile[idCode])
        //异步删除前一次的图片
        fs.unlinkSync('' + id_avatarFile[idCode], (err) => {
            if (err) console.log(err);
            console.log('删除成功');
        })

    const imgPath = `./assets/img/avatars/${new Date().getTime() + Math.random().toFixed(3) * 1000}.jpg`;
    return new Promise((resolve, reject) => {
        try {
            images(req.files.avatar.path)
                .size(1920)
                .save(imgPath, {
                    quality: 80
                })
            resolve()
        }
        catch {
            reject()
        }
    }).then(() => {
        const link = imgPath.replace('.', 'http://localhost:8100')
        // console.log(link)
        //将图片链接存入数据库
        const connection = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "walker314",
            database: "gcms",
            charset: 'utf8'
        });
        connection.connect(function (err) {
            err ? console.log("数据库链接失败") : console.log("链接成功！");
        });
        connection.query(
            `update user_info set profile='${link}' where idCode=${idCode}`,
            (err, row) => {
                if (err) return res.send({ err: 1, msg: '上传失败' });
                connection.end()

                res.send({ err: 0, msg: '头像已上传', link })
                //设置时限
                timeLimit[idCode] = true;
                //绑定头像路径和id
                id_avatarFile[idCode] = imgPath;
                //防止用户恶意多次上传
                setTimeout(() => {
                    timeLimit[idCode] = false;
                }, 18000)
            }
        );

    }).catch(() => res.send({ err: 1, msg: '上传失败' }))
});


module.exports = router;
