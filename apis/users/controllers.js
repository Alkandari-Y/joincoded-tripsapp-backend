const User = require("../../db/models/User");
//Import Utils
const { createHash } = require("../../utils/createHash");
const { generateToken } = require('../../utils/createToken');


exports.signUp = async(req, res, next) => {
    try {
        req.body.password = await createHash(req.body.password);

        const newUser = await User.create(req.body);
        const token = generateToken(newUser)
        res.status(201).json({token, message: "User created"})
    } catch (error) {
        next(error)
    }
}

exports.signIn = async (req, res, next) => {
    const token = generateToken(req.user)
    res.status(200).json({token})
}