const pool = require('../config/database');

module.exports = {
  getAllBooks: async () => {
    let conn;
    try {
      conn = await pool.getConnection();
      let rows = await conn.query('SELECT * FROM book');
      return rows;
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (conn) conn.end();
    }
  },

  getBookById: async (bookID) => {
    let conn;
    try {
      conn = await pool.getConnection();
      let rows = await conn.query('SELECT * FROM book WHERE bookID = ?', [bookID]);
      return rows[0];
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (conn) conn.end();
    }
  },

  insertBook: async (book) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query('INSERT INTO book (name, author, numberOfBooks, topic) VALUES (?, ?, ?, ?)', 
        [book.name, book.author, book.numberOfBooks, book.topic]);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (conn) conn.end();
    }
  },

  updateBook: async (book) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query('UPDATE book SET name=?, author=?, numberOfBooks=?, topic=? WHERE bookID=?', 
        [book.name, book.author, book.numberOfBooks, book.topic, book.bookID]);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (conn) conn.end();
    }
  },

  deleteBook: async (bookID) => {
    let conn;
    try {
      conn = await pool.getConnection();
      await conn.query('DELETE FROM book WHERE bookID=?', [bookID]);
    } catch (error) {
      throw new Error(`Database error: ${error.message}`);
    } finally {
      if (conn) conn.end();
    }
  }
};
