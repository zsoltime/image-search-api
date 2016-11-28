const express = require('express');
const router = express.Router();
const flickr = require('../models/flickr');
const log = require('../middlewares/logger').log;

router.get('/:search', log, (req, res) => {

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

module.exports = router;
