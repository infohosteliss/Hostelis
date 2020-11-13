const mysql = require('mysql2');

// Create the connection pool. The pool-specific settings are the defaults
let promisePool;
try {
	const normal_pool = mysql.createPool({
		host: process.env.DB_HOST,
		user: process.env.DB_USER,
		database: process.env.DB_NAME,
		password: process.env.DB_PASSWORD,
		waitForConnections: true,
		connectionLimit: 10,
		queueLimit: 0
	});


	promisePool = normal_pool.promise();

} catch (e) {
	console.log(e);
}

module.exports = promisePool;