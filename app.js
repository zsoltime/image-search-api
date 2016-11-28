require('dotenv').config({ silent: process.env.NODE_ENV === 'production' });
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./db');
const uri = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/image-search';

if (app.get('env') === 'development') {
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

app.use(require('./routes'));

db.connect(uri, err => {
  if (err) {
    console.error('Unable to connect to MongoDB');
    process.exit(1);
  }
  else {
    console.log('Connected to MongoDB');
    app.listen(port, () => console.log('Server is listening on port %s', port));
  }
});
