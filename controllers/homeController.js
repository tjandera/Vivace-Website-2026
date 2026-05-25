'use strict';

/*
 * homeController.js
 *
 * Handles the main landing page. Passes the schools data down to the
 * hero partial so the basket items (ACF, SICS, SMUX, etc.) are
 * rendered from a single source of truth rather than hardcoded in the view.
 */

const schools = require('../models/schools');

exports.index = (req, res) => {
  res.render('index', { schools });
};
