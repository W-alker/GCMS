//总逻辑调用
const express = require('express');
const fs = require('fs');
const resetPwd = require('./logining/resetPwd');
// const admin = require('./routes/admin');
const user= require('./user');
const login =require('./logining/login');

//开启服务器
const app = express();
app.listen(8100);
//express托管访问静态资源
app.use('/',express.static(__dirname));

app.all("*",function(req,res,next){
    console.log(req.headers.origin);
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin",req.headers.origin);
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式 
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    res.header("Access-Control-Allow-Credentials",true); //需要加上这个
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
})
app.use('/getSchoolName',(req,res)=>{
    fs.readFile('./assets/data/universitiesNameList.json',(err,data)=>{
        if(err) res.send('error')
        else {
            res.send(data)
        }
    })
})
//引入路由
app.use('/',resetPwd)
app.use('/user', user);
// app.use('/admin.html', admin);
app.use('/login', login);
/* app.use("/logout",(req,res)=>{
    res.clearCookie('curToken').send({err:0,msg:'退出登录'})
}) */