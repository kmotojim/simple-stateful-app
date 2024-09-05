const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const os = require('os');  // osモジュールでホスト名を取得
const path = require('path');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// テンプレートエンジンにEJSを設定
app.set('view engine', 'ejs');

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

// ホスト名を渡してHTMLをレンダリング
app.get('/', (req, res) => {
    res.render('index', { hostname: hostname });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});