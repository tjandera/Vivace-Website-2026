'use strict';

/*
 * server.js — application entry point
 *
 * Sets up the Express server, registers middleware, wires up the
 * view engine, and mounts the route table. The actual page logic
 * lives in /controllers; the data lives in /models.
 *
 * To run locally:  node server.js
 * Default port:    3000  (override with PORT env variable)
 */

const express     = require('express');
const path        = require('path');
const compression = require('compression');

const app  = express();
const PORT = process.env.PORT || 3000;

// Gzip every response — meaningfully reduces payload size for CSS/HTML
app.use(compression());

// EJS templates live in /views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve everything in /public as static files.
// 7-day browser cache keeps repeat visits fast; ?v= query strings
// on CSS/JS links bust the cache whenever a file changes.
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  etag: true,
}));

// All page routes are defined in routes/index.js
app.use('/', require('./routes/index'));

// Only start the server when this file is run directly (not when
// imported by a test runner or Vercel's serverless handler)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Vivace 2026 running at http://localhost:${PORT}`);
  });
}

module.exports = app;
