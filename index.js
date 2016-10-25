const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

const timestamp = require('./timestamp');
const whoami = require('./whoami');
const shorten = require('./shorten');
const imageSearch = require('./image-search');
const filesize = require('./filesize');

app.use('/timestamp', timestamp);
app.use('/whoami', whoami);
app.use('/shorten', shorten);
app.use('/image-search', imageSearch);
app.use('/filesize', filesize);

app.listen(port, () => {
  console.log('Listening on port', port);
});
