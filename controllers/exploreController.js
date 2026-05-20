'use strict';

/*
 * exploreController.js
 *
 * Powers the /explore page — the main CCA directory with search,
 * school-umbrella filters, and load-more pagination.
 *
 * Two routes share this controller:
 *   GET /explore           → no pre-filter, show everything
 *   GET /explore/:school   → pre-filter to one umbrella (e.g. /explore/acf)
 *
 * The activeSchool value is picked up by explore.js on the client
 * via window.VIVACE_ACTIVE_SCHOOL to highlight the right chip on load.
 */

const schools   = require('../models/schools');
const catalogue = require('../models/cca-catalogue');

// Show all CCAs with no filter active
exports.all = (req, res) => {
  res.render('explore-page', {
    schools,
    ccas: catalogue,
    activeSchool: null,
  });
};

// Pre-filter by a specific school umbrella
exports.bySchool = (req, res) => {
  const school = req.params.school.toLowerCase();
  const validIds = schools.map(s => s.id);

  // Silently fall back to "all" if the slug doesn't match any school
  const activeSchool = validIds.includes(school) ? school : null;

  res.render('explore-page', {
    schools,
    ccas: catalogue,
    activeSchool,
  });
};
