const express = require('express');
const app = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/filesize.html');
});

app.post('/submit', upload.single('file'), (req, res) => {
  if (!req.file) {
    res.json({
      error: 'Please submit a file'
    });
  }

  res.json({
    size: req.file.size
  });
});


module.exports = app;
