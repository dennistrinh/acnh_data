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
const currentDate = require('./helpers/currentDate');
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

// Force redirect to HTTPS from HTTP
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
app.post('/bugs', async(req, res) => {
	const sql = 'SELECT * FROM bugs WHERE ';
	const date = monthToDate(req.body["month"]);
	// Query statements for new bugs in the month and reoccuring bugs
	const newQuery = sql.concat('(start_month_1=\"2020', date, '\" OR start_month_2=\"2020', date, '\")');
	const sqlBuildA = '((CAST(\'2020' + date + '\' AS DATE) BETWEEN start_month_1 AND end_month_1) OR ';
	const sqlBuildB = '(CAST(\'2020' + date + '\' AS DATE) BETWEEN start_month_2 AND end_month_2) OR start_month_1 IS NULL)';
	const oldQuery = sql + sqlBuildA + sqlBuildB;
	const sqlQuery = newQuery + ';' + oldQuery;
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);

		// Remove duplicate entries in the reoccuring fish
		let modify = rows[1].filter(({id: a}) => !rows[0].some(({id: b}) => a === b));

		// Change 24 hour format to 12 hour format
		for (let i = 0; i < rows[0].length; i++) {
			if (rows[0][i].start_time_1) {
				rows[0][i].start_time_1 = simpleTime(rows[0][i].start_time_1);
				rows[0][i].end_time_1 = simpleTime(rows[0][i].end_time_1);
			}

			if (rows[0][i].start_time_2) {
				rows[0][i].start_time_2 = simpleTime(rows[0][i].start_time_2);
				rows[0][i].end_time_2 = simpleTime(rows[0][i].end_time_2);
			}
		}

		for (let i = 0; i < modify.length; i++) {
			if (modify[i].start_time_1) {
				modify[i].start_time_1 = simpleTime(modify[i].start_time_1);
				modify[i].end_time_1 = simpleTime(modify[i].end_time_1);
			}

			if (modify.start_time_2) {
				modify[i].start_time_2 = simpleTime(modify[i].start_time_2);
				modify[i].end_time_2 = simpleTime(modify[i].end_time_2);
			}
		}
		res.render('./filters/bugsFilter', {data: rows[0], curr: modify, body_month: req.body["month"]});
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
app.post('/fish', async(req, res) => {
	const sql = 'SELECT * FROM fish WHERE ';
	const date = monthToDate(req.body["month"]);
	// Query statements for new fish in the month and reoccuring fish
	const newQuery = sql.concat('(start_month_1=\"2020', date, '\" OR start_month_2=\"2020', date, '\")');
	const sqlBuildA = '((CAST(\'2020' + date + '\' AS DATE) BETWEEN start_month_1 AND end_month_1) OR ';
	const sqlBuildB = '(CAST(\'2020' + date + '\' AS DATE) BETWEEN start_month_2 AND end_month_2) OR start_month_1 IS NULL)';
	const oldQuery = sql + sqlBuildA + sqlBuildB;
	const sqlQuery = newQuery + ';' + oldQuery;
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);

		// Remove duplicate entries in the reoccuring fish
		let modify = rows[1].filter(({id: a}) => !rows[0].some(({id: b}) => a === b));

		// Change 24 hour format to 12 hour format
		for (let i = 0; i < rows[0].length; i++) {
			if (rows[0][i].start_time_1) {
				rows[0][i].start_time_1 = simpleTime(rows[0][i].start_time_1);
				rows[0][i].end_time_1 = simpleTime(rows[0][i].end_time_1);
			}

			if (rows[0][i].start_time_2) {
				rows[0][i].start_time_2 = simpleTime(rows[0][i].start_time_2);
				rows[0][i].end_time_2 = simpleTime(rows[0][i].end_time_2);
			}
		}

		for (let i = 0; i < modify.length; i++) {
			if (modify[i].start_time_1) {
				modify[i].start_time_1 = simpleTime(modify[i].start_time_1);
				modify[i].end_time_1 = simpleTime(modify[i].end_time_1);
			}

			if (modify.start_time_2) {
				modify[i].start_time_2 = simpleTime(modify[i].start_time_2);
				modify[i].end_time_2 = simpleTime(modify[i].end_time_2);
			}
		}
		res.render('./filters/fishFilter', {data: rows[0], curr: modify, body_month: req.body["month"]});
	} catch(err) {
		throw err;
	} finally {
		if (conn) return conn.release();
	}
});

// Shows all active fish for current date/time in UTC
// TODO: Button for user to update timezone
app.get('/active', async(req, res) => {
	const data = currentDate();
	const sqlQuery = data[0];
	const date = data[1];
	const time = data[2];
	let conn;
	try {
		conn = await mariadb.pool.getConnection();
		let rows = await conn.query(sqlQuery);
		for (let i = 0; i < rows[0].length; i++) {
			if (rows[0][i].start_time_1) {
				rows[0][i].start_time_1 = simpleTime(rows[0][i].start_time_1);
				rows[0][i].end_time_1 = simpleTime(rows[0][i].end_time_1);
			}

			if (rows[0][i].start_time_2) {
				rows[0][i].start_time_2 = simpleTime(rows[0][i].start_time_2);
				rows[0][i].end_time_2 = simpleTime(rows[0][i].end_time_2);
			}
		}
		for (let i = 0; i < rows[1].length; i++) {
			if (rows[1][i].start_time_1) {
				rows[1][i].start_time_1 = simpleTime(rows[1][i].start_time_1);
				rows[1][i].end_time_1 = simpleTime(rows[1][i].end_time_1);
			}

			if (rows[1][i].start_time_2) {
				rows[1][i].start_time_2 = simpleTime(rows[1][i].start_time_2);
				rows[1][i].end_time_2 = simpleTime(rows[1][i].end_time_2);
			}
		}
		res.render('./active', {currDate: date, currTime: time, bugdata: rows[0], fishdata: rows[1]});
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
