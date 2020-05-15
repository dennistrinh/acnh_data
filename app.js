const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mariadb = require('./config.js');
const port = 9000;
const monthToDate = require('./monthToDate.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/bugs', async (req, res) => {
	const sql = 'SELECT name, location, price FROM bugs'
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

app.post('/bugs', async(req, res) => {
	const sql = 'SELECT name, location, price FROM bugs WHERE (start_month_1=\"2020';
	const date = monthToDate(req.body["month"]);
	const sqlQuery = sql.concat(date, '\" OR start_month_2=\"2020', date, '\")');
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);
		res.render('./filters/bugsFilter', {data: rows, body_month: req.body["month"]});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

app.get('/fish', async (req, res) => {
	const sql = 'SELECT name, location, price FROM fish'
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

app.post('/fish', async(req, res) => {
	const sql = 'SELECT name, location, price FROM fish WHERE (start_month_1=\"2020';
	const date = monthToDate(req.body["month"]);
	const sqlQuery = sql.concat(date, '\" OR start_month_2=\"2020', date, '\")');
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);
		res.render('./filters/fishFilter', {data: rows, body_month: req.body["month"]});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

var server = app.listen(port, function() {
	console.log('Express started on localhost:' + port);
});
