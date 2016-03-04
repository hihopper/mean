'use strict';


var express = require('express');
var router = express.Router();


router.post('/', function(req, res) {
  console.log('try auth:', req.body);
  if (req.body.userid !== 'AAA') {
    console.log('auth fail');
    return res.status(401).json({message: '인증에 실패하였습니다.'});
  }

  req.session.user = {userid: req.body.userid};
  console.log('auth succ');
  res.json(req.session.user);
});

module.exports = router;
