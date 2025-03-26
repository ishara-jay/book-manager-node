const pool = require('../config/database');
module.exports = {
  getAllBooks: async () => {
    let conn = await pool.getConnection();
    let rows = await conn.query('SELECT * FROM book');
    conn.end();
    return rows;
  },
  getBookById: async (bookID) => {
    let conn = await pool.getConnection();
    let rows = await conn.query('SELECT * FROM book WHERE bookID = ?', [bookID]);
    conn.end();
    return rows[0];
  },
  insertBook: async (book) => {
    let conn = await pool.getConnection();
    await conn.query('INSERT INTO book VALUES (?, ?, ?, ?, ?)', 
      [book.bookID, book.name, book.author, book.numberOfBooks, book.topic]);
    conn.end();
  },
  updateBook: async (book) => {
    let conn = await pool.getConnection();
    await conn.query('UPDATE book SET name=?, author=?, numberOfBooks=?, topic=? WHERE bookID=?', 
      [book.name, book.author, book.numberOfBooks, book.topic, book.bookID]);
    conn.end();
  },
  deleteBook: async (bookID) => {
    let conn = await pool.getConnection();
    await conn.query('DELETE FROM book WHERE bookID=?', [bookID]);
    conn.end();
  }
};
