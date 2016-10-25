const mongoose = require('mongoose');

const querySchema = new mongoose.Schema({
  query: String,
  date: Date
});

module.exports = querySchema;
