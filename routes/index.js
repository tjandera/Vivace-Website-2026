const express = require('express');
const router = express.Router();

const schools  = require('../models/schools');
const ccas     = require('../models/ccas');
const partners = require('../models/partners');
const faq      = require('../models/faq');
const events   = require('../models/events');

router.get('/', (req, res) => {
  res.render('index', { schools, ccas, partners, faq, events });
});

module.exports = router;
