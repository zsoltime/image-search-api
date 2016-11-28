const express = require('express');
const router = express.Router();
const recent = require('../models/recent');

router.get('/', (req, res) => {
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
