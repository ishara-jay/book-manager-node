async function fetchBooks() {
    let res = await fetch('http://localhost:4000/api/books');
    let data = await res.json();
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  }
  
  async function fetchBookById() {
    let bookID = prompt("Enter book ID:");
    let res = await fetch(`http://localhost:4000/api/books/${bookID}`);
    let data = await res.json();
    document.getElementById('output').textContent = JSON.stringify(data, null, 2);
  }
  
  async function insertBook() {
    let book = {
      bookID: prompt("Book ID:"),
      name: prompt("Name:"),
      author: prompt("Author:"),
      numberOfBooks: prompt("Number of Books:"),
      topic: prompt("Topic:")
    };
    await fetch('http://localhost:4000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(book)
    });
    fetchBooks();
  }
  
  async function deleteBook() {
    let bookID = prompt("Enter book ID to delete:");
    await fetch(`http://localhost:4000/api/books/${bookID}`, { method: 'DELETE' });
    fetchBooks();
  }
  