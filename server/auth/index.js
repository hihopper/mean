'use strict';


var express = require('express');
var router = express.Router();

require('./local/passport').setup();

router.use('/local', require('./local'));

module.exports = router;
