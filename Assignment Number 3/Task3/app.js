const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/bookDB')
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Failed to connect to MongoDB:', err));

app.use(bodyParser.urlencoded({ extended: true }));

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: String,
  publishedYear: Number
});

const Book = mongoose.model('Book', bookSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Add a new book (POST request)
app.post('/add-book', async (req, res) => {
  const { title, author, description, publishedYear } = req.body;
  try {
    const newBook = new Book({ title, author, description, publishedYear });
    await newBook.save();
    res.send('Book added successfully!');
  } catch (err) {
    res.status(400).send('Error adding book: ' + err.message);
  }
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.find();
    let bookList = '<h1>Book List</h1>';
    bookList += '<ul>';
    books.forEach((book) => {
      bookList += `<li><strong>Title:</strong> ${book.title} | <strong>Author:</strong> ${book.author} | <strong>Year:</strong> ${book.publishedYear}</li>`;
    });
    bookList += '</ul>';
    res.send(bookList);
  } catch (err) {
    res.status(400).send('Error fetching books: ' + err.message);
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
