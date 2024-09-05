const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // publicフォルダを静的コンテンツとして提供

// ホスト名の取得
const hostname = os.hostname();

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
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

// ホスト名を返すAPI
app.get('/hostname', (req, res) => {
    res.json({ hostname: hostname });
});