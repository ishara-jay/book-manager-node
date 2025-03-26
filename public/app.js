async function fetchBooks() {
  try {
      let res = await fetch('http://localhost:4000/api/books');
      let data = await res.json();
      if (res.ok) {
          renderBooks(data);
      } else {
          document.getElementById('output').innerText = "Error: " + data.error;
      }
  } catch (error) {
      document.getElementById('output').innerText = "Network error: " + error.message;
  }
}

async function fetchBookById() {
  let bookID = prompt("Enter book ID:");
  try {
      let res = await fetch(`http://localhost:4000/api/books/${bookID}`);
      let data = await res.json();
      if (res.ok) {
          renderBooks([data]);
      } else {
          document.getElementById('output').innerText = "Error: " + data.error;
      }
  } catch (error) {
      document.getElementById('output').innerText = "Network error: " + error.message;
  }
}

async function insertBook() {
  let book = {
      name: prompt("Name:"),
      author: prompt("Author:"),
      numberOfBooks: prompt("Number of Books:"),
      topic: prompt("Topic:")
  };

  try {
      let res = await fetch('http://localhost:4000/api/books', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(book)
      });

      let data = await res.json();
      if (res.ok) {
          fetchBooks();
      } else {
          document.getElementById('output').innerText = "Error: " + data.error;
      }
  } catch (error) {
      document.getElementById('output').innerText = "Network error: " + error.message;
  }
}

async function deleteBook() {
  let bookID = prompt("Enter book ID to delete:");
  try {
      let res = await fetch(`http://localhost:4000/api/books/${bookID}`, { method: 'DELETE' });
      if (res.ok) {
          fetchBooks();
      } else {
          let data = await res.json();
          document.getElementById('output').innerText = "Error: " + data.error;
      }
  } catch (error) {
      document.getElementById('output').innerText = "Network error: " + error.message;
  }
}

function renderBooks(books) {
  let output = `<table border="1" cellpadding="5" cellspacing="0">
                  <tr>
                      <th>Book ID</th>
                      <th>Name</th>
                      <th>Author</th>
                      <th>Number of Books</th>
                      <th>Topic</th>
                  </tr>`;

  books.forEach(book => {
      output += `<tr>
                  <td>${book.bookID}</td>
                  <td>${book.name}</td>
                  <td>${book.author}</td>
                  <td>${book.numberOfBooks}</td>
                  <td>${book.topic}</td>
                 </tr>`;
  });

  output += `</table>`;
  document.getElementById('output').innerHTML = output;
}
