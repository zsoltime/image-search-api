const express = require('express');
const recent = require('../models/recent');

const router = express.Router();

router.get('/', (req, res) => {
  recent.get((err, searches) => {
    if (err) {
      res.json({
        error: true,
        message: err,
      });
    }

    res.json(searches);
  });
});

module.exports = router;
