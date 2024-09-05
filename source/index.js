const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// 'source/public'ディレクトリ内の静的ファイルを提供
app.use(express.static(path.join(__dirname, 'public')));

// ホスト名を返すAPIエンドポイント
app.get('/hostname', (req, res) => {
    res.json({ hostname: os.hostname() });
});

// MySQL接続設定
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

// テキストの保存エンドポイント
app.post('/add', (req, res) => {
    const content = req.body.content;
    const query = 'INSERT INTO entries (content) VALUES (?)';
    connection.query(query, [content], (err, results) => {
        if (err) throw err;
        res.send('Text added successfully!');
    });
});

// テキストの検索エンドポイント
app.get('/search', (req, res) => {
    const searchTerm = req.query.q;
    const query = 'SELECT * FROM entries WHERE content LIKE ?';
    connection.query(query, [`%${searchTerm}%`], (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// サーバーの起動
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});