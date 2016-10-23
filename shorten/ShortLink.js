const mongoose = require('mongoose');

const ShortLink = new mongoose.Schema({
  id: String,
  url: String
});

module.exports = mongoose.model('ShortLink', ShortLink);
