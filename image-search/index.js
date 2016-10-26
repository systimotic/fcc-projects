const express = require('express');
const mongoose = require('mongoose');
const request = require('request');
const app = express.Router();
const querySchema = require('./querySchema');

const dbPath = process.env.DB_IMAGE_SEARCH || 'localhost:27017/image-search';
const key = process.env.BING_SEARCH_KEY;

function composeURL(query, offset) {
  query = encodeURIComponent(query);
  return `https://api.cognitive.microsoft.com/bing/v5.0/images/search?count=10&safeSearch=Moderate&q=${query}&offset=${offset}`;
}

const database = mongoose.createConnection(dbPath);
const Query = database.model('Query', querySchema);
database.on('error', console.error);


app.get('/', (req, res) => res.render('image-search'));

app.get('/recent', (req, res) => {
  Query.find({}, { _id: 0, __v: 0 }).sort({ date: -1 }).limit(10).exec((err, docs) => {
    if (err) return console.error(err);

    res.json(docs);
  });
});

app.get('/:query', (req, res) => {
  const userQuery = req.params.query;
  const parsedOffset = req.query.offset;
  const offset = parsedOffset > 0 && parsedOffset <= 100 ? parsedOffset * 10 : 0;
  const date = Date.now();

  request({
    url: composeURL(userQuery, offset),
    headers: {
      'Ocp-Apim-Subscription-Key': key
    }
  }, (err, response, body) => {
    if (err || response.statusCode !== 200) return console.error(err, response.statusCode);

    body = JSON.parse(body);

    const output = [];
    body.value.forEach((item) => {
      output.push({
        image: item.contentUrl,
        alt: item.name,
        source: item.hostPageUrl
      });
    });

    res.json(output);
  });

  const newQuery = new Query({ query: userQuery, date });
  newQuery.save((err) => {
    if (err) return console.error(err);
  });
});


module.exports = app;
