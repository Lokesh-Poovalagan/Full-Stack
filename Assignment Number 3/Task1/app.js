const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/blogApp').then(() => {
    console.log('Connected to MongoDB');
  }).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

app.use(bodyParser.urlencoded({extended:true}));

const userSchema = new mongoose.Schema({
name: { type: String, required: true },
email: { type: String, required: true, unique: true },
password: { type: String, required: true }
});

const blogSchema = new mongoose.Schema({
title: { type: String, required: true },
content: { type: String, required: true },
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Blog = mongoose.model('Blog', blogSchema);

app.get('/',async(req,res)=>{
    res.sendFile(path.join(__dirname,'index.html'));
})

app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const user = new User({ name, email, password });
      await user.save();
      res.send('User registered successfully!');
    } catch (err) {
      res.status(400).send('Error: ' + err.message);
    }
  })

app.post('/add-blog', async (req, res) => {
    const { title, content, authorEmail } = req.body;
    try {
        const author = await User.findOne({ email: authorEmail });
        if (!author) {
        return res.status(400).send('Author not found!');
        }
        const blog = new Blog({ title, content, author: author._id });
        await blog.save();
        res.send('Blog post added successfully!');
    } catch (err) {
        res.status(400).send('Error: ' + err.message);
    }
});

app.listen(3000,()=>{
    console.log(`Server is listening in the PORT: 3000`);
})
