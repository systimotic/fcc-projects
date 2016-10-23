const express = require('express');
const app = express.Router();

const port = process.env.PORT || 7001;

app.get('/', (req, res) => {
  res.send('Hello World! Usage instructions over on https://timestamp-ms.herokuapp.com/');
});


function getTimestampType(timestamp) {
  if (parseInt(timestamp, 10) >= 0) {
    return 'unix';
  }

  if (Date.parse(timestamp)) {
    return 'natural';
  }

  return 'invalid';
}

function toNatural(date) {
  const options = {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }

  return date.toLocaleDateString('en-US', options);
}

app.get('/:timestamp', (req, res) => {
  const output = {
    unix: null,
    natural: null
  };

  const userTimestamp = req.params.timestamp;
  const timestampType = getTimestampType(userTimestamp);

  if (timestampType === 'unix') {
    const unixTime = parseInt(userTimestamp, 10);
    const userDate = new Date();
    userDate.setTime(unixTime * 1000);

    output.unix = unixTime;
    output.natural = toNatural(userDate);
  }

  if (timestampType === 'natural') {
    output.unix = Date.parse(userTimestamp) / 1000;
    output.natural = userTimestamp;
  }

  res.json(output);
});

module.exports = app;
