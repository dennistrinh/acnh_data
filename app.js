const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mariadb = require('./config.js');
const port = 9000;
const https_port = 9001;
const monthToDate = require('./helpers/monthToDate.js');
const simpleTime = require('./helpers/simpleTime.js');
const dateFormater = require('./helpers/dateFormater');
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

// Blog
app.get('/', (req, res) => {
	res.render('index');
});

// Shows all bugs
app.get('/bugs', async (req, res) => {
	const sql = 'SELECT * FROM bugs'
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sql);
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].start_time_1) {
				rows[i].start_time_1 = simpleTime(rows[i].start_time_1);
				rows[i].end_time_1 = simpleTime(rows[i].end_time_1);
			}

			if (rows[i].start_time_2) {
				rows[i].start_time_2 = simpleTime(rows[i].start_time_2);
				rows[i].end_time_2 = simpleTime(rows[i].end_time_2);
			}
		}
		res.render('bugs', {data: rows});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

// Shows bugs specified to user's input for month
// TODO: Need to add currently active bugs already in month (not new bugs)
app.post('/bugs', async(req, res) => {
	const sql = 'SELECT * FROM bugs WHERE (start_month_1=\"2020';
	const date = monthToDate(req.body["month"]);
	const sqlQuery = sql.concat(date, '\" OR start_month_2=\"2020', date, '\")');
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].start_time_1) {
				rows[i].start_time_1 = simpleTime(rows[i].start_time_1);
				rows[i].end_time_1 = simpleTime(rows[i].end_time_1);
			}

			if (rows[i].start_time_2) {
				rows[i].start_time_2 = simpleTime(rows[i].start_time_2);
				rows[i].end_time_2 = simpleTime(rows[i].end_time_2);
			}
		}
		res.render('./filters/bugsFilter', {data: rows, body_month: req.body["month"]});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

// Shows all fish
app.get('/fish', async (req, res) => {
	const sql = 'SELECT * FROM fish'
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sql);
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].start_time_1) {
				rows[i].start_time_1 = simpleTime(rows[i].start_time_1);
				rows[i].end_time_1 = simpleTime(rows[i].end_time_1);
			}

			if (rows[i].start_time_2) {
				rows[i].start_time_2 = simpleTime(rows[i].start_time_2);
				rows[i].end_time_2 = simpleTime(rows[i].end_time_2);
			}
		}
		res.render('fish', {data: rows});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

// Shows fish that show up in user specified month
// TODO: See bugs (post)
app.post('/fish', async(req, res) => {
	const sql = 'SELECT * FROM fish WHERE (start_month_1=\"2020';
	const date = monthToDate(req.body["month"]);
	const sqlQuery = sql.concat(date, '\" OR start_month_2=\"2020', date, '\")');
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);
		for (let i = 0; i < rows.length; i++) {
			if (rows[i].start_time_1) {
				rows[i].start_time_1 = simpleTime(rows[i].start_time_1);
				rows[i].end_time_1 = simpleTime(rows[i].end_time_1);
			}

			if (rows[i].start_time_2) {
				rows[i].start_time_2 = simpleTime(rows[i].start_time_2);
				rows[i].end_time_2 = simpleTime(rows[i].end_time_2);
			}
		}
		res.render('./filters/fishFilter', {data: rows, body_month: req.body["month"]});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

// Shows all active fish for current date/time in UTC
// TODO: Button for user to update timezone
app.get('/active', async(req, res) => {
	const date_now = Date.now();
	const date_obj = new Date(date_now);
	const day = dateFormater(date_obj.getDate());
	const month = dateFormater(date_obj.getMonth() + 1);
	const year = date_obj.getFullYear();
	const hours = dateFormater(date_obj.getHours());
	const mins = dateFormater(date_obj.getMinutes());
	const secs = dateFormater(date_obj.getSeconds());
	const date = year + "-" + month + "-" + day;
	const time = hours + ":" + mins + ":" + secs;
	const bug = 'SELECT * FROM bugs WHERE ';
	const fish = 'SELECT * FROM fish WHERE ';
	const dateQuery = '((CAST(\'' + date + '\' AS DATE) BETWEEN start_month_1 AND end_month_1) OR (CAST(\'' + date + '\' AS DATE) BETWEEN start_month_2 AND end_month_2) OR start_month_1 IS NULL) AND ';
	const timeQueryA = '((start_time_1 >= CAST(\'' + time + '\' AS TIME) AND CAST(\'' + time + '\' AS TIME) < end_time_1) OR ';
	const timeQueryB = '(start_time_2 >= CAST(\'' + time + '\' AS TIME) AND CAST(\'' + time + '\' AS TIME) < end_time_2) OR start_time_1 IS NULL)';
	const bugQuery = bug + dateQuery + timeQueryA + timeQueryB;
	const fishQuery = fish + dateQuery + timeQueryA + timeQueryB;
	const sqlQuery = bugQuery + ';' + fishQuery;
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);
		res.render('./active', {bugdata: rows[0], fishdata: rows[1]});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

// Redirect to github repo
app.get('/github', (req, res) => {
	res.redirect('https://github.com/dennistrinh/acnh_data');
});

// Old resume location
/*app.get('/dennis', (req, res) => {
	const loc = process.env.RES_LOC;
	fs.readFile(loc, (err, data) => {
		if (err)
			return;
		else {
			res.contentType("application/pdf");
			res.send(data);
		}
	});
});*/

const server = app.listen(port, () => {
	console.log('Express started on localhost:' + port);
});

const httpsServer = https.createServer(options, app).listen(https_port, () => {
	console.log('HTTPS Express started on https://localhost:' + https_port);
});
