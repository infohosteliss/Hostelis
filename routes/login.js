const router = require("express").Router();
const Login = require('../models/login_model');

const login_obj = new Login();

router.post('/', async (req, res) => {

	try {
		let username = req.body.username;
		let password = req.body.password;
		let {user_pass, user_id} = await login_obj.getPasswordHashFromDB(username);
		let is_valid = await login_obj.checkPassword(password, user_pass);
		console.log("username: ", username);
		console.log("user id: ", user_id);
		console.log("valid: ", is_valid);

		if (!is_valid) {
			res.status(401).json({"msg": "Invalid Credentials"});
			console.log("Invalid Credentials");
		} else {
			let token = await login_obj.createJWT(username, user_id);
			res.header('x-access-token', token).status(200).json({"msg": "Successful login"});
			console.log("Successful login");
		}

	} catch (e) {
		console.log({"msg": e.name + " " + e.message});
		await res.status(502).json({"msg": e.name + " " + e.message});
	}

});


module.exports = router;
