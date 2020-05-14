const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mariadb = require('./config.js');
const port = 9000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/bugs', async (req, res) => {
	let sql = 'SELECT name, price FROM bugs'
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sql);
		res.render('bugs', {data: rows});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

app.get('/fish', async (req, res) => {
	let sql = 'SELECT name, price FROM fish'
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sql);
		res.render('fish', {data: rows});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});


var server = app.listen(port, function() {
	console.log('Express started on localhost:' + port);
});
