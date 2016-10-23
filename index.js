const express = require('express');
const app = express();

const port = process.env.PORT || 5000;

const timestamp = require('./timestamp');

app.use('/timestamp', timestamp);


app.listen(port, () => {
  console.log('Listening on port', port);
});
