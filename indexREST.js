var express = require('express');
const cors = require('cors');
const dataAccess = require('./repository/dataAccess')

var app = express();

app.use(cors());
app.use(express.json());

app.get('/api/books', async (req, res) => {
  try {
    const books = await dataAccess.getAllBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/books/:id', async (req, res) => {
  try {
    const book = await dataAccess.getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/books', async (req, res) => {
  try {
    await dataAccess.insertBook(req.body);
    res.sendStatus(201);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/books', async (req, res) => {
  try {
    await dataAccess.updateBook(req.body);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/books/:id', async (req, res) => {
  try {
    await dataAccess.deleteBook(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(4000, () => console.log('REST API running on port 4000'));