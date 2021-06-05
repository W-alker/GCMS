const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();

//私钥
const scrict = 'cw923hr998chwh22sdfbhj';

//cookie签名

const token = {};
token.scrict = scrict;
//生成token
token.createToken = palyload => {
    //生成token，以Bearer开头
    //给palyload添加一个时间戳参数
    palyload.curtime = Date.now();
    const token = 'Bearer ' + jwt.sign(
        palyload,
        scrict, {
        expiresIn: 3600 * 24 * 3   //过期时间
    })
    return token;
};

module.exports = token;