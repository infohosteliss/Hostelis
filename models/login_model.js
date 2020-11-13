const PasswordHash = require('node-phpass').PasswordHash;
const mysql_pool = require('../middleware/db');
const jwt = require('jsonwebtoken');
const config = {
	"secret": process.env.JWT_SECRET,
};

class Login {
	async checkPassword(password, hash) {
		const len = 8;
		const portable = true;
		const phpversion = 5;

		const hasher = new PasswordHash(len, portable, phpversion);
		return hasher.CheckPassword(password, hash);
	}


	async getPasswordHashFromDB(login) {
		let query_str = "SELECT ID,user_pass from wp_Hostelis_users where user_login = ? limit 1";
		return new Promise(async (resolve, reject) => {
			try {
				let result = await mysql_pool.query(query_str, [login]);
				console.log(result[0][0].user_pass, result[0][0].ID);
				resolve({"user_pass": result[0][0].user_pass, "user_id": result[0][0].ID})
			} catch (e) {
				reject(e)
			}
		})
	}

	async createJWT(username, user_id) {
		return jwt.sign({"username": username, "user_id": user_id}, config.secret);
	}

}

module.exports = Login;