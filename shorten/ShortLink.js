const mongoose = require('mongoose');

const shortLinkSchema = new mongoose.Schema({
  id: String,
  url: String
});

module.exports = shortLinkSchema;
