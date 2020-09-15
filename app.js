const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mariadb = require('./config.js');
const port = 9000;
const https_port = 9001;
const monthToDate = require('./helpers/monthToDate'); // i.e. Changes January into "2020-01-01"
const simplify = require('./helpers/simplify'); // Converts 24 hour time to 12 hour time & converts month to string
const currentDate = require('./helpers/currentDate'); // Gets the current date for the client and creates a SQL statement\
const postQuery = require('./helpers/postQuery'); // Creates the POST SQL queries
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
  const sql = 'SELECT * FROM bugs;'
  let conn;
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sql);
    simplify(rows);
    res.render('bugs', {data: rows});
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

// Shows bugs specified to user's input for month
app.post('/bugs', async (req, res) => {
  const month = req.body["month"];
  const sqlQuery = postQuery('bugs', month.toLowerCase());
  let conn;
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sqlQuery);
    // Remove duplicate entries in the reoccuring bugs
    simplify(rows);
    let current = [];
    for (let i = 0; i < rows.length; i++) {
      const sm1 = rows[i].start_month_1;
      const sm2 = rows[i].start_month_2;
      if ((sm1 && sm1 === month) || (sm2 && sm2 === month)) {
        current.push(rows[i]);
      }
    }
    let modify = rows.filter(({name: a}) => !current.some(({name: b}) => a === b));
    res.render('./filters/bugsFilter', {
      data: current,
      reoccur: modify, 
      body_month: req.body["month"]
    });
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

// Shows all fish
app.get('/fish', async (req, res) => {
  const sql = 'SELECT * FROM fish;'
  let conn;
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sql);
    simplify(rows);
    res.render('fish', {data: rows});
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

// Shows fish that show up in user specified month
app.post('/fish', async (req, res) => {
  const month = req.body["month"];
  const sqlQuery = postQuery('fish', month.toLowerCase());
  let conn;
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sqlQuery);  
    // Remove duplicate entries in the reoccuring fish
    simplify(rows);
    let current = [];
    for (let i = 0; i < rows.length; i++) {
      const sm1 = rows[i].start_month_1;
      const sm2 = rows[i].start_month_2;
      if ((sm1 && sm1 === month) || (sm2 && sm2 === month)) {
        current.push(rows[i]);
      }
    }
    let modify = rows.filter(({name: a}) => !current.some(({name: b}) => a === b));
    res.render('./filters/fishFilter', {
      data: current, 
      reoccur: modify, 
      body_month: req.body["month"]
    });
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

// Shows all sea creatures
app.get('/sea', async (req, res) => {
  const sql = 'SELECT * FROM sea_creatures;'
  let conn;
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sql);
    simplify(rows);
    res.render('sea_creatures', {data: rows});
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

// Shows sea creatures that show up in user specified month
app.post('/sea', async (req, res) => {
  const month = req.body["month"];
  const sqlQuery = postQuery('sea_creatures', month.toLowerCase());
  let conn;
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sqlQuery);  
    // Remove duplicate entries in the reoccuring fish
    simplify(rows);
    let current = [];
    for (let i = 0; i < rows.length; i++) {
      const sm1 = rows[i].start_month_1;
      const sm2 = rows[i].start_month_2;
      if ((sm1 && sm1 === month) || (sm2 && sm2 === month)) {
        current.push(rows[i]);
      }
    }
    const modify = rows.filter(({name: a}) => !current.some(({name: b}) => a === b)); 
    res.render('./filters/seaFilter', {
      data: current, 
      reoccur: modify, 
      body_month: req.body["month"]
    });
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});


// Shows all active bugs, fish, and sea creatures 
// for current date/time in UTC
app.get('/active', async (req, res) => {
  const data = currentDate();
  const sqlQuery = data[0];
  const date = data[1];
  const time = data[2];
  let conn;
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sqlQuery);
    simplify(rows[0]);
    simplify(rows[1]);
    simplify(rows[2]);
    res.render('./active', {
      currDate: date, 
      currTime: time, 
      bugdata: rows[0], 
      fishdata: rows[1],
      seadata: rows[2]
    });
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});

// Shows all active bugs, fish, and sea creatures
// with specified time zone
app.post('/active', async (req, res) => {
  const timezone = req.body["timezone"];
  const data = currentDate(timezone);
  const sqlQuery = data[0];
  const date = data[1];
  const time = data[2];
  try {
    conn = await mariadb.pool.getConnection();
    let rows = await conn.query(sqlQuery);
    simplify(rows[0]);
    simplify(rows[1]);
    simplify(rows[2]);
    res.render('./filters/activeFilter', {
      currDate: date, 
      currTime: time, 
      zone: timezone, 
      bugdata: rows[0], 
      fishdata: rows[1],
      seadata: rows[2]
    });
  } catch(err) {
    throw err;
  } finally {
    if (conn) return conn.release();
  }
});



// Redirect to github repository
app.get('/github', (req, res) => {
  res.redirect('https://github.com/dennistrinh/acnh_data');
});

// Old resume location
/* app.get('/dennis', (req, res) => {
  const loc = process.env.RES_LOC;
  fs.readFile(loc, (err, data) => {
  if (err)
    return;
  else {
    res.contentType("application/pdf");
    res.send(data);
  }
  });
}); */

// HTTP Server
const server = app.listen(port, () => {
  console.log('Express started on localhost:' + port);
});

// HTTPS Server
const httpsServer = https.createServer(options, app).listen(https_port, () => {
  console.log('HTTPS Express started on https://localhost:' + https_port);
});

