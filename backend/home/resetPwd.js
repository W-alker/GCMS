const express = require("express");
const formidable = require("express-formidable"); //解析FormData
const nodemailer = require("nodemailer"); //发送邮件模块
const mail = require("./nodemail"); //发送邮件方法
const mysql = require("mysql"); //mysql

let verify_codes = {}; //保存验证码，用于后续验证

let app = express.Router();

//formdata解析挂载中间件
app.use(formidable());

//获得验证码
app.post("/getVerifyCode", (req, res) => {
  const email = req.fields.email;

  if (verify_codes[email] && verify_codes[email] !== 'timeout')
    return res.send({ err: 1, msg: '请勿重复获取！' })

  //生成验证码
  let code = parseInt(Math.random().toFixed(6) * 1000000);

  mail
    .sendMail(email, code)
    .then(() => {
      res.send({ err: 0, msg: "验证码已发送" });
      verify_codes[email] = code; //保存验证码
      console.log(verify_codes);
    })
    .catch((err) => {
      res.send({ err: 1, msg: "验证码发送失败" })
      console.log(err);
    });

  setTimeout(() => {
    verify_codes[email] = 'timeout'
  }, 60000);
});

app.post("/resetPwd", (req, res) => {
  const { SName, idCode, email, verifyCode, newPwd } = req.fields;
  console.log("用户" + idCode + "正在尝试重置密码");

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
    `select count(*) from user_account where school="${SName}" and idCode=${idCode}`,
    (err, row) => {
      if (err) return res.send({ err: 1, msg: '未知错误' })
      console.log(row);
      //如果不存在
      if (row[0]["count(*)"] === 0) {
        console.log("学号/工号不存在，返回错误信息");
        res.send({ err: "idCode", msg: "学号/工号不存在" });
      } else {
        connection.query(
          `select email from user_info where idCode="${idCode}"`,
          (err, row) => {
            if (err) console.log(err);
            if (row[0]["email"] !== email) {
              return res.send({ err: "email", msg: "邮箱与账号不符合！" });
            } else {
              //判断验证码
              if (verifyCode != verify_codes[email]) {
                return res.send({ err: "verifyCode", msg: "验证码错误！" });
              } else {
                connection.query(`update user_account set pwd="${newPwd}" where idCode=${idCode} and school="${SName}"`, (err, row) => {
                  if (err) console.log(err)
                  else {
                    console.log("密码重置成功");
                    res.send({ err: 0, msg: '密码重置成功！' })
                  }
                })
              }
            }
          }
        );
      }
    }
  );
});

module.exports = app;
