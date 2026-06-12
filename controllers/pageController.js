'use strict';

/*
 * pageController.js
 *
 * Handles all the "static-ish" pages — pages that just pull from a
 * data model and render a view without any request-specific logic.
 *
 * Keeping these together avoids creating a one-function file for
 * every single page, while still cleanly separating routing from rendering.
 */

const partners  = require('../models/partners');
const faq       = require('../models/faq');
const catalogue = require('../models/cca-catalogue');

// About page — receipt-print animation, team slider, e-voucher
exports.about = (req, res) => {
  res.render('about-page', { page: 'about' });
};

// FAQ page — accordion of common questions
exports.faq = (req, res) => {
  res.render('faq-page', { faq, page: 'faq' });
};

// Partners & Deals — sponsor shelf grid
exports.partners = (req, res) => {
  res.render('partners-page', { partners, page: 'partners' });
};

// Venue map — zoomable campus map + location cards
exports.map = (req, res) => {
  res.render('map-page');
};

// Programmes / schedule — day-by-day lineup
exports.programmes = (req, res) => {
  res.render('programmes-page');
};

// Individual CCA detail page
exports.ccaDetail = (req, res) => {
  const cca = catalogue.find(c => c.id === req.params.id);
  if (!cca) return res.status(404).send('CCA not found');
  res.render('cca', { cca });
};

// Saved CCA receipt page
exports.savedCca = (req, res) => {
  res.render('saved-cca', { ccas: catalogue });
};

// SMOO Run 2026 event page
exports.smooRun = (req, res) => {
  res.render('smoo-run', { page: 'events' });
};

// SMU Artfest 2026 event page
exports.artfest = (req, res) => {
  res.render('artfest', { page: 'events' });
};
