require('dotenv').config()
const jwt = require("jsonwebtoken")

exports.generateToken = (userObj) => {
    const payload = {
        _id: userObj._id,
        username: userObj.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5d' });
    
    return token;
}