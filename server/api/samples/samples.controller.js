'use strict'

var Samples = require('./samples.model');

exports.index = function( req, res ) {

  Samples.find( function( err, rows ) {
    if( err || !rows ) {
      console.log( err );
      return res.status(500).send(err);

    }
    console.log( 'rows.length:' + rows.length );

    return res.status(200).json({
      count:rows.length,
      rows:rows.map(function(row) {
        return {
          key: row.key,
          value: row.value
        }
      })
    });
  });
};

exports.create = function(req, res) {
  console.log('create:' + req.body);
  Samples.create(req.body, function(err, row) {
    if(err) { return res.status(500).send(err); }
    return res.status(201).json(row);
  });
};
