const express = require('express');
const mongoose = require('mongoose');
const crypto = require('crypto');
const app = express.Router();
const ShortLink = require('./shortLink');

const dbPath = process.env.DB_SHORTEN || 'localhost:27017/shorten';

mongoose.connect(dbPath);
mongoose.connection.on('error', console.error);


app.get('/', (req, res) => {
  res.send('Hello there! You can fins some usage instructions over on https://little-url.herokuapp.com/');
});

function generateRandomId() {
  return crypto.randomBytes(8)
    .toString('base64')
    .slice(0, 10)
}

app.get('/new/:url(*)', (req, res) => {
  const baseURL = req.protocol + '://' + req.get('host') + '/shorten/';
  const url = req.params.url;
  console.log(baseURL, url);

  if (!url.match(/^https?:\/\/\w+.[a-z]{2,}.*$/gi)) {
    return res.json({
      error: 'Wrong URL format. Please enter a valid URL and try again.'
    });
  }

  const id = generateRandomId();

  const newLink = new ShortLink({ id, url });
  newLink.save((err) => {
    if (err) return console.error(err);

    res.json({
      original_url: url,
      short_url: baseURL + id
    });
  });
});

app.get('/:id', (req, res) => {
  const id = req.params.id;

  ShortLink.findOne({ id }, (err, link) => {
    if (err) return console.error(err);

    if (!link) {
      return res.json({
        error: 'There is no link with this ID.'
      });
    }

    res.redirect(link.url);
  });
});


module.exports = app;
