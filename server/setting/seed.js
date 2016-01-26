'use strict'

var Samples = require('../api/samples/samples.model');


var express = require('express');

var router = express.Router();
router.get('/',  function( req, res ) {

  global.logger.info('--------------- seed DB ---------------');
  Samples.find({}).remove( function(){
    for(var i = 0; i < 30; ++i) {
      Samples.create( {key: 'KEY_' + i, value: 'VALUE_' + i});
    }
  });

  return res.status(200).json({
  });
});


module.exports = router;
