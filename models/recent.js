'use strict';

const db = require('../db');
const ObjectID = require('mongodb').ObjectID;

module.exports.get = (callback) => {
  const col = db.collection('searches');

  col.find({})
    .limit(10)
    .sort({ _id: -1 })
    .toArray()
    .then(arr => (arr.map((x) => {
      x.time = ObjectID(x._id).getTimestamp();
      delete x._id;
      return x;
    })))
    .then(arr => callback(null, arr))
    .catch(err => callback(err));
};
