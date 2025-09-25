// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for books
let books = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee' }
];

// Helper function to find book by ID
const findBookById = (id) => books.find(book => book.id === parseInt(id));

// GET /books - Retrieve all books
app.get('/books', (req, res) => {
  res.json(books);
});

// POST /books - Create a new book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  
  // Validation
  if (!title || !author) {
    return res.status(400).json({ 
      error: 'Title and author are required' 
    });
  }

  // Generate new ID (max existing ID + 1)
  const newId = books.length > 0 
    ? Math.max(...books.map(book => book.id)) + 1 
    : 1;

  const newBook = {
    id: newId,
    title,
    author
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT /books/:id - Update a book by ID
app.put('/books/:id', (req, res) => {
  const book = findBookById(req.params.id);
  
  if (!book) {
    return res.status(404).json({ 
      error: 'Book not found' 
    });
  }

  const { title, author } = req.body;
  
  // Update only provided fields
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;

  res.json(book);
});

// DELETE /books/:id - Delete a book by ID
app.delete('/books/:id', (req, res) => {
  const bookIndex = books.findIndex(book => 
    book.id === parseInt(req.params.id)
  );
  
  if (bookIndex === -1) {
    return res.status(404).json({ 
      error: 'Book not found' 
    });
  }

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.json({ 
    message: 'Book deleted successfully',
    deletedBook 
  });
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`📚 Book API server running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /books');
  console.log('  POST   /books');
  console.log('  PUT    /books/:id');
  console.log('  DELETE /books/:id');
});