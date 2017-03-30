const db = require('../db');

module.exports.log = (req, res, next) => {
  // @todo if there is req.query, shouldn't log?
  if (req.params.search) {
    const col = db.collection('searches');

    col.insertOne({ query: req.params.search })
    // eslint-disable-next-line no-console
    .catch(err => console.error(err));
  }
  next();
};
