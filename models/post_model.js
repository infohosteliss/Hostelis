const mysql_pool = require('../middleware/db');
const htmlParser = require('node-html-parser');


class Post {
	async getPost(user_id) {
		let query_str = "SELECT * from wp_Hostelis_posts where post_author = ? and post_status = 'inherit' order by ID desc limit 1"; //todo change
		// let query_str_temp = "SELECT * from wp_Hostelis_posts where ID=1924 order by ID desc limit 1";
		return new Promise(async (resolve, reject) => {
			try {
				let result = await mysql_pool.query(query_str, [user_id]);
				result = result[0][0];
				//result.post_content = htmlParser.parse(result.post_content).toString();
				console.log(result);
				if (!result) {
					reject(new Error("No posts exists for this user"));
				}
				resolve(result);
			} catch (e) {
				reject(e)
			}
		})
	}

	fixDate(date) {
		return new Date(date).toISOString().slice(0, 19).replace('T', ' ');
	}


	async updatePost(ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count) {
		post_date = this.fixDate(post_date);
		post_date_gmt = this.fixDate(post_date_gmt);
		post_modified = this.fixDate(post_modified);
		post_modified_gmt = this.fixDate(post_modified_gmt);
		post_content = htmlParser.parse(post_content).toString();
		let query_str = "UPDATE wp_Hostelis_posts set ID=?,post_author=?,post_date=?,post_date_gmt=?,post_content=?,post_title=?,post_excerpt=?,post_status=?,comment_status=?,ping_status=?,post_password=?,post_name=?,to_ping=?,pinged=?,post_modified=?,post_modified_gmt=?,post_content_filtered=?,post_parent=?,guid=?,menu_order=?,post_type=?,post_mime_type=?,comment_count=? where ID=?";
		return new Promise(async (resolve, reject) => {
			try {

				let result = await mysql_pool.query(query_str, [ID, post_author, post_date, post_date_gmt, post_content, post_title, post_excerpt, post_status, comment_status, ping_status, post_password, post_name, to_ping, pinged, post_modified, post_modified_gmt, post_content_filtered, post_parent, guid, menu_order, post_type, post_mime_type, comment_count, ID]);
				result = result[0];
				let root = htmlParser.parse(result);
				resolve(root);
			} catch (e) {
				reject(e)
			}
		})

	}
}

module.exports = Post;