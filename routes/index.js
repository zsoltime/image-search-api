const express = require('express');
const router = express.Router();
const flickr = require('../models/flickr');
const log = require('../middlewares/logger').log;
const recent = require('../models/recent');

router.get('/search/:search', log, (req, res) => {

  const offset = req.query.offset || 0;
  const search = req.params.search;

  flickr.get(search, offset, (err, images) => {

    if (err) {
      res.json({
        error: true,
        message: err
      });
    }

    res.json(images);
  });
});

router.get('/latest', (req, res) => {
  recent.get((err, searches) => {

    if (err) {
      res.json({
        error: true,
        message: err
      });
    }

    res.json(searches);
  });
});

module.exports = router;
