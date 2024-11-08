const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
mongoose.connect('mongodb+srv://lokesh:qDUajIDlDmDmswbe@azhaganexportcluster.s7vowoj.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/', eventRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
