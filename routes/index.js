'use strict';

const express = require('express');

const router = express.Router();

router.use('/search', require('./search'));
router.use('/recent', require('./recent'));
router.use('/', require('./sample'));

module.exports = router;
