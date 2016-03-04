'use strict'

var express = require('express');
var controller = require('./user.controller');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', auth.isAuthed, controller.index);
router.post('/', controller.create);
router.put('/:userId', controller.update);
router.delete('/:userId', controller.delete);

module.exports = router;
