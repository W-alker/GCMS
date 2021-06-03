//获取学校名称
const express = require('express');
const fs = require('fs');

const router = express.Router();   //二级路由

router.use('/getSchoolName', (req, res) => {
    fs.readFile('./assets/data/universitiesNameList.json', (err, data) => {
        err ? res.send('error') : res.send(data)
    })
})

module.exports = router;
