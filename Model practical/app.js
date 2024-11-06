
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
// Serve static files like CSS
app.use(express.static('public'));


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/bookstoreDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB!");
}).catch((err) => {
    console.log("Error connecting to MongoDB:", err);
});

// Book Schema
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    price: Number,
    stock: Number
});

const Book = mongoose.model('Book', bookSchema);

// Routes

// Home page - View all books
app.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.render('index', { books: books });
    } catch (err) {
        console.log(err);
        res.send('Error fetching books.');
    }
});

// Add book page
app.get('/add', (req, res) => {
    res.render('add');
});

// Create a new book
app.post('/add', async (req, res) => {
    const { title, author, price, stock } = req.body;

    const newBook = new Book({
        title,
        author,
        price,
        stock
    });

    try {
        await newBook.save();
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send('Error adding book.');
    }
});

// Edit book page
app.get('/edit/:id', async (req, res) => {
    const bookId = req.params.id;
    try {
        const book = await Book.findById(bookId);
        res.render('edit', { book: book });
    } catch (err) {
        console.log(err);
        res.send('Error fetching book for editing.');
    }
});

// Update book
app.post('/edit/:id', async (req, res) => {
    const bookId = req.params.id;
    const { title, author, price, stock } = req.body;

    try {
        await Book.findByIdAndUpdate(bookId, {
            title,
            author,
            price,
            stock
        });
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send('Error updating book.');
    }
});

// Delete a book
app.get('/delete/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        await Book.findByIdAndDelete(bookId);
        res.redirect('/');
    } catch (err) {
        console.log(err);
        res.send('Error deleting book.');
    }
});

// Server Setup
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
