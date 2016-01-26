'use strict'

var Samples = require('./samples.model');
var _ = require('lodash');

exports.index = function( req, res ) {

  Samples.find( function( err, rows ) {
    if( err || !rows ) {
      console.log( err );
      return res.status(500).send(err);

    }
    global.logger.info( 'rows.length:' + rows.length );

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
  global.logger.info('Create samples: ', req.body);

  Samples.create(req.body, function(err, row) {
    if(err) { return errorHandler(500, res, err); }
    return res.status(201).json(row);
  });
};

exports.update = function( req, res ) {
  if(req.body.key) { delete req.body.key; }

  global.logger.info('Update samples: ', req.body);

  Samples.findOne({ key: req.params.key }, function(err, row) {
    if(err) { return errorHandler(500, res, err); }
    if(!row) { return errorHandler(404, res, 'Not Found'); }

    var updated = _.merge(row, req.body);

    updated.save(function(err, row) {
      if(err) { return errorHandler(500, res, err); }
      return res.sendStatus(200);
    });

  });
};

exports.delete = function( req, res ) {
  global.logger.info('Delete samples: key=', req.params.key);

  Samples.findOne({ key: req.params.key }, function(err, row) {
    if(err) { return errorHandler(500, res, err); }
    if(!row) { return errorHandler(404, res, 'Not Found'); }

    row.remove( function(err) {
      if(err) { return errorHandler(500, res, err); }
      return res.sendStatus(204);
    });
  });
};

function errorHandler(status, res, err) {
  global.logger.warn(err);
  return res.sendStatus(status);
}
