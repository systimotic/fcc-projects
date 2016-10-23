const express = require('express');
const app = express.Router();


app.get('/', (req, res) => {
  res.json({
    ipaddress: req.ip,
    language: req.acceptsLanguages()[0],
    software: req.get('User-Agent').replace(/.*\((.+)\).*/, '$1')
  });
});


module.exports = app;
