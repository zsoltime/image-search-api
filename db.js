const MongoClient = require('mongodb').MongoClient;

const state = {
  db: null,
};

module.exports.connect = (uri, done) => {
  if (state.db) {
    return done();
  }

  MongoClient.connect(uri, (err, db) => {
    if (err) {
      return done(err);
    }
    state.db = db;
    done();
  });
};

module.exports.get = () => state.db;

module.exports.collection = (col) => {
  if (state.db) {
    return state.db.collection(col);
  }
};

module.exports.close = (done) => {
  if (state.db) {
    state.db.close((err, result) => {
      state.db = null;
      done(err);
    });
  }
};
