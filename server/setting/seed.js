'use strict'

var Samples = require('../api/samples/samples.model');


console.log(process.env.isFirst);

if( process.env.isFirst ) {
  Samples.find({}).remove( function(){
    for(var i = 0; i < 30; ++i) {
      Samples.create( {key: 'KEY_' + i, value: 'VALUE_' + i});
    }
  });
}
 
