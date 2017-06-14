const express = require('express');
const app = express();

// routing
app.get('/', function (req, res) {
  res.json({ text: 'GET!!!' });
});

// routing
app.post('/', function (req, res) {
  res.json({ text: 'POST!!!' });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});