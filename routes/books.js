const express = require('express');
const cors = require('cors');
const dataStorage = require('./dataStorage'); // Data access layer

const router = express.Router();

// Enable CORS for all origins
router.use(cors()); 
router.use(express.json()); // Middleware to parse JSON bodies

// Get all books
router.get('/api/books', async (req, res) => {
    try {
        const books = await dataStorage.getAll();
        res.json(books);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get a single book by ID
router.get('/api/books/:bookID', async (req, res) => {
    try {
        const book = await dataStorage.getOne(req.params.bookID);
        if (book) {
            res.json(book);
        } else {
            res.status(404).json({ error: 'Book not found' });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Insert a new book
router.post('/api/books', async (req, res) => {
    try {
        const newBook = await dataStorage.insert(req.body);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a book (if not exists, create it)
router.put('/api/books/:bookID', async (req, res) => {
    try {
        const existingBook = await dataStorage.getOne(req.params.bookID);
        if (existingBook) {
            const updatedBook = await dataStorage.update(req.params.bookID, req.body);
            res.json(updatedBook);
        } else {
            const newBook = await dataStorage.insert(req.body);
            res.status(201).json(newBook);
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a book
router.delete('/api/books/:bookID', async (req, res) => {
    try {
        const deletedBook = await dataStorage.remove(req.params.bookID);
        res.json(deletedBook);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
