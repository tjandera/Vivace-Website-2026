'use strict';

/*
 * routes/index.js
 *
 * Defines every URL the app responds to and maps each one to the
 * right controller method. No business logic lives here — just the
 * routing table. If you need to add a new page, register it here
 * and write its logic in the appropriate controller.
 */

const express = require('express');
const router  = express.Router();

const homeController    = require('../controllers/homeController');
const exploreController = require('../controllers/exploreController');
const pageController    = require('../controllers/pageController');

// ── Home ──────────────────────────────────────────────────────────────────────
router.get('/', homeController.index);

// ── CCA Explorer ──────────────────────────────────────────────────────────────
router.get('/explore',          exploreController.all);
router.get('/explore/:school',  exploreController.bySchool);   // e.g. /explore/acf

// ── Static-ish pages ──────────────────────────────────────────────────────────
router.get('/about',       pageController.about);
router.get('/faq',         pageController.faq);
router.get('/partners',    pageController.partners);
router.get('/events',      pageController.events);
router.get('/map',         pageController.map);
router.get('/programmes',  pageController.programmes);

// ── CCA detail ────────────────────────────────────────────────────────────────
router.get('/cca/:id',     pageController.ccaDetail);

// ── Saved CCA receipt ─────────────────────────────────────────────────────────
router.get('/saved-cca',   pageController.savedCca);

module.exports = router;
