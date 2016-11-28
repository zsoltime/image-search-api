const db = require('../db');

module.exports.log = function(req, res, next) {
  // @todo if there is req.query, shouldn't log?
  if (req.params.search) {
    const col = db.collection('searches');

    col.insertOne({query: req.params.search})
    .catch(err => console.error(err));
  }
  next();
}
