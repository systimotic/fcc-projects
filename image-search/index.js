const express = require('express');
const mongoose = require('mongoose');
const app = express.Router();
const ShortLink = require('./querySchema');

const dbPath = process.env.DB || 'localhost:27017/image-search';

mongoose.connect(dbPath);
mongoose.connection.on('error', console.error);


app.get('/', (req, res) => {
  res.send('Hello there!');
});

app.get('/:query', (req, res) => {
  // const newLink = new ShortLink({ id, url });
  // newLink.save((err) => {
  //   if (err) return console.error(err);
  //
  //   res.json({
  //     original_url: url,
  //     short_url: baseURL + id
  //   });
  // });
});

app.get('/recent', (req, res) => {
  // ShortLink.findOne({ id }, (err, link) => {
  //   if (err) return console.error(err);
  //
  //   if (!link) {
  //     return res.json({
  //       error: 'There is no link with this ID.'
  //     });
  //   }
  //
  //   res.redirect(link.url);
  // });
});


module.exports = app;
