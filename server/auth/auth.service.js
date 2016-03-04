'use strict';

module.exports.isAuthed = function(req, res, next) {
  if (req.session.user) {
    next();
  }
  else {
    res.status(401).send('Unauthorized');
  }
};
