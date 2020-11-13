const jwt = require('jsonwebtoken');
const config = {
    "secret": process.env.JWT_SECRET,
};

module.exports = {

    verifyToken: async (req, res, next) => {

        let token = req.headers['x-access-token'];
        if (!token) {
            console.log("Token not found");
            return res.status(403).json({"message":"Login to proceed. No token found"});
        }

        jwt.verify(token, config.secret, (error, decoded) => {
            if (error) {
                console.log("Token corrupted");
                return res.status(403).json({"message": "Token Corrupted"});
            }
            if (typeof (decoded.username) !== 'undefined') {
                req.username = decoded.username;
                req.user_id = decoded.user_id;
            }
            next()
        })
    },

};