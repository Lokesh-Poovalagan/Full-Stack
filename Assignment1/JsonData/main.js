const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.static(__dirname));


app.get('/students', (req, res) => {
    fs.readFile(path.join(__dirname, 'data.json'), 'utf8', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data');
        } else {
            res.json(JSON.parse(data));
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
