const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mariadb = require('./config.js');
const port = 9000;
const https_port = 9001;
const monthToDate = require('./monthToDate.js');
const https = require('https');
const fs = require('fs');
const options = {
	key: fs.readFileSync(process.env.KEY_LOC),
	cert: fs.readFileSync(process.env.CERT_LOC),
	ca: fs.readFileSync(process.env.CA_LOC)
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use((req, res, next) => {
	if (!req.secure) {
		return res.redirect(['https://', req.get('Host'), req.baseUrl].join(''));
	}
	next();
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/bugs', async (req, res) => {
	const sql = 'SELECT * FROM bugs'
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
	const sql = 'SELECT * FROM bugs WHERE (start_month_1=\"2020';
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
	const sql = 'SELECT * FROM fish'
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
	const sql = 'SELECT * FROM fish WHERE (start_month_1=\"2020';
	const date = monthToDate(req.body["month"]);
	const sqlQuery = sql.concat(date, '\" OR start_month_2=\"2020', date, '\")');
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);
		//const btw = 'SELECT name, location, price FROM fish WHERE (start_month_1>=\"2020-09-01\" AND end_month_1<=\"2020-11-30\"';
		res.render('./filters/fishFilter', {data: rows, body_month: req.body["month"]});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

app.get('/dennis', (req, res) => {
	const loc = process.env.RES_LOC;
	fs.readFile(loc, (err, data) => {
		if (err)
			return;
		else {
			res.contentType("application/pdf");
			res.send(data);
		}
	});
});
const server = app.listen(port, () => {
	console.log('Express started on localhost:' + port);
});

const httpsServer = https.createServer(options, app).listen(https_port, () => {
	console.log('HTTPS Express started on https://localhost:' + https_port);
});
