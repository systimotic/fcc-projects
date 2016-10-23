const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

const timestamp = require('./timestamp');
const whoami = require('./whoami');
const shorten = require('./shorten');

app.use('/timestamp', timestamp);
app.use('/whoami', whoami);
app.use('/shorten', shorten);

app.listen(port, () => {
  console.log('Listening on port', port);
});
