var express = require('express');
const cors = require('cors');
const dataAccess = require('./repository/dataAccess')

var app = express();

app.use(cors());
app.use(express.json());
app.get('/api/books', async (req, res) => res.json(await dataAccess.getAllBooks()));
app.get('/api/books/:id', async (req, res) => res.json(await dataAccess.getBookById(req.params.id)));
app.post('/api/books', async (req, res) => {
  await dataAccess.insertBook(req.body);
  res.sendStatus(201);
});
app.put('/api/books', async (req, res) => {
  await dataAccess.updateBook(req.body);
  res.sendStatus(204);
});
app.delete('/api/books/:id', async (req, res) => {
  await dataAccess.deleteBook(req.params.id);
  res.sendStatus(204);
});
app.listen(4000, () => console.log('REST API running on port 4000'));