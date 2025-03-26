const pool = require('./db'); // Import the connection pool

const dataStorage = {
    // Get all books
    async getAll() {
        const conn = await pool.getConnection();
        try {
            return await conn.query("SELECT * FROM books");
        } finally {
            conn.release(); // Return connection to pool
        }
    },

    // Get one book
    async getOne(bookID) {
        const conn = await pool.getConnection();
        try {
            const rows = await conn.query("SELECT * FROM books WHERE bookID = ?", [bookID]);
            return rows.length ? rows[0] : null;
        } finally {
            conn.release();
        }
    },

    // Insert a book
    async insert(book) {
        const conn = await pool.getConnection();
        try {
            const result = await conn.query(
                "INSERT INTO books (name, author, numberOfBooks, topic) VALUES (?, ?, ?, ?)", 
                [book.name, book.author, book.numberOfBooks, book.topic]
            );
            return { bookID: result.insertId, ...book };
        } finally {
            conn.release();
        }
    },

    // Update a book
    async update(bookID, book) {
        const conn = await pool.getConnection();
        try {
            await conn.query(
                "UPDATE books SET name = ?, author = ?, numberOfBooks = ?, topic = ? WHERE bookID = ?", 
                [book.name, book.author, book.numberOfBooks, book.topic, bookID]
            );
            return { bookID, ...book };
        } finally {
            conn.release();
        }
    },

    // Remove a book
    async remove(bookID) {
        const conn = await pool.getConnection();
        try {
            await conn.query("DELETE FROM books WHERE bookID = ?", [bookID]);
            return { success: true, bookID };
        } finally {
            conn.release();
        }
    }
};

module.exports = dataStorage;
