const router = require("express").Router();
const Post = require('../models/post_model');
const htmlParser = require('node-html-parser');
const {verifyToken} = require('../middleware/auth');

const post_obj = new Post();
router.get('/', verifyToken, async (req, res) => {

	try {
		let user_id = req.user_id;
		let r = await post_obj.getPost(user_id);
		await res.json(r);
	} catch (e) {
		console.log({"msg": e.name + " " + e.message});
		await res.status(502).json({"msg": e.name + " " + e.message});
	}
});

router.put('/', verifyToken, async (req, res) => {

	try {
		let ID = req.body.ID;
		let post_author = req.body.post_author;
		let post_date = req.body.post_date;
		let post_date_gmt = req.body.post_date_gmt;
		let post_content = req.body.post_content;
		let post_title = req.body.post_title;
		let post_excerpt = req.body.post_excerpt;
		let post_status = req.body.post_status;
		let comment_status = req.body.comment_status;
		let ping_status = req.body.ping_status;
		let post_password = req.body.post_password;
		let post_name = req.body.post_name;
		let to_ping = req.body.to_ping;
		let pinged = req.body.pinged;
		let post_modified = req.body.post_modified;
		let post_modified_gmt = req.body.post_modified_gmt;
		let post_content_filtered = req.body.post_content_filtered;
		let post_parent = req.body.post_parent;
		let guid = req.body.guid;
		let menu_order = req.body.menu_order;
		let post_type = req.body.post_type;
		let post_mime_type = req.body.post_mime_type;
		let comment_count = req.body.comment_count;

		let r = await post_obj.updatePost(ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count);
		await res.json({"msg": "success"});
	} catch (e) {
		console.log({"msg": e.name + " " + e.message});
		await res.status(502).json({"msg": e.name + " " + e.message});
	}
});


module.exports = router;
