const mariadb = require('mariadb');
const pool = mariadb.createPool ({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PW,
	database: process.env.DATABASE_NAME,
	connectionLimit: 5
});

module.exports.pool = pool;

