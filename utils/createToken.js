require('dotenv').config()
const jwt = require("jsonwebtoken")



exports.generateToken = (userObj) => {
    const payload = {
        _id: userObj._id,
        username: userObj.username,
        admin: userObj.admin,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: '4h'});
    return token;
}