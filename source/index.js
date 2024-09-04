require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const os = require('os');

const app = express();
const hostname = os.hostname();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL database');
});

// テキストの保存
app.post('/add', (req, res) => {
    const content = req.body.content;
    const query = 'INSERT INTO entries (content) VALUES (?)';
    connection.query(query, [content], (err, results) => {
        if (err) throw err;
        res.send('Text added successfully!');
    });
});

// テキストの検索
app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    const query = 'SELECT * FROM entries WHERE content LIKE ?';
    connection.query(query, [`%${searchTerm}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});