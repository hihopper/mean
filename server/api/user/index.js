'use strict'

var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.create);
router.put('/:userId', controller.update);
router.delete('/:userId', controller.delete);

module.exports = router;
