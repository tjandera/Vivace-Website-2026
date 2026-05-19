const express    = require('express');
const path       = require('path');
const compression = require('compression');

const app  = express();
const PORT = process.env.PORT || 3000;

// Gzip all responses
app.use(compression());

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets with 7-day browser cache
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '7d',
  etag: true,
}));

app.use('/', require('./routes/index'));

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Vivace 2026 running at http://localhost:${PORT}`);
  });
}

module.exports = app;
