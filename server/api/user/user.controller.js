'use strict'

var User = require('./user.model');
var _ = require('lodash');
var winston = require('winston');

exports.index = function( req, res ) {
  var query = {};//{ userId: req.user.userId };

  if( req.query.search && req.query.value ) {
    query[req.query.search] = new RegExp('^'+req.query.value, "i");
  }

  var options = {
    select: '-_id userId name role regDate',
    page: parseInt(req.query.page) || 1,
    limit: parseInt(req.query.limit) || 0,
    sort: {}
  };

  options.sort[(req.query.sort || 'userId')] = parseInt(req.query.order) || -1 ;

  User.paginate( query, options,
    function (err, result) {
      if(err) { return errorHandler(500, res, err); }
      if(!result.docs.length) { return errorHandler(404, res, 'Not Found'); }

      global.logger.debug( 'total:' + result.total + ' page:' + result.page + ' rows:' + result.docs.length);
      return res.status(200).json({
        total: result.total,
        page: result.page,
        rows: result.docs
      });
    });

};

exports.create = function(req, res) {
  global.logger.info('Create user: ', req.body);
  if( !req.body.userId ) req.body.userId = '';

  req.body.regDate = new Date();
  User.create(req.body, function(err, row) {
    if(err) { return errorHandler(500, res, err); }
    return res.status(201).json(row);
  });
};

exports.update = function( req, res ) {
  global.logger.info('Update user: ', req.body);

  if(req.body.userId) { delete req.body.userId; }
  User.findOne({ userId: req.params.userId }, function(err, row) {
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
  global.logger.info('Delete user: userId=', req.params.userId);

  if( !req.params.userId || req.params.userId === '' ) {
    return errorHandler(404, res, 'Not Found');
  }

  User.findOne({ userId: req.params.userId }, function(err, row) {
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
  return res.status(status).json(err);
}
