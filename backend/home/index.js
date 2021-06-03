const express = require('express');
const resetPwd = require('./resetPwd');
const getSchoolName = require('./getSchoolName');

let router = express.Router();   //二级路由

router.use('/', getSchoolName);
router.use('/', resetPwd)

module.exports = router;


