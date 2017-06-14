const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Datastore = require('nedb');


const app = express();

const db = new Datastore({
  filename: './data/store.db',
  autoload: true,
});

app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.use(bodyParser.json());

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.get('/api/loadHome', (req, res) => {
  // res.json(data);
  db.find({}).sort({ Time: -1 }).exec((err, docs) => {
    const x = docs;
    // console.log(x);
    const y = x.map((item) => {
      // console.log(item._id);
      const newItem = {
        Title: item.Title,
        Name: item.Name,
        Counts: item.Comments.length,
        Time: item.Time,
        id: item._id,
      };
      return newItem;
    });
    res.json(y);
  });
});

app.get('/api/loadArticle/:id', (req, res) => {
  // res.json(data);
  db.find({ _id: req.params.id }, (err, docs) => {
    const x = docs[0];
    res.json(x);
  });
});

app.post('/api/posting', (req, res) => {
  const temp = req.body;
  temp.Time = Date.now();
  temp.ip = req.connection.remoteAddress.split(':')[3];
  temp.Comments = [];
  // data.push(temp);
  res.json({
    ok: 200,
  });
  db.insert(temp, () => {   // Callback is optional
  // newDoc is the newly inserted document, including its _id
  // newDoc has no key called notToBeSaved since its value was undefined
  });
  // res.sendStatus(200);
});

app.post('/api/postComment/:id', (req, res) => {
  const temp = req.body;
  temp.Time = Date.now();
  temp.id = req.connection.remoteAddress.split(':')[3];
  res.json({
    ok: 200,
    Time: temp.Time,
    ip: temp.ip,
  });
  db.update({ _id: req.params.id }, { $push: { Comments: temp } }, {}, () => {
    // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
  });
});

module.exports = app;
