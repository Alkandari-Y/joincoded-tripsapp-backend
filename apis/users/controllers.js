const { findOneAndUpdate } = require("../../db/models/User");
const User = require("../../db/models/User");
//Import Utils
const { createHash } = require("../../utils/createHash");
const { generateToken } = require("../../utils/createToken");

//Find User
exports.findUserByUserName = async (userName, next) => {
  try {
    const foundUser = await User.findOne({ username: userName });
    return foundUser;
  } catch (error) {
    next(error);
  }
};

//
exports.getRequestedProfile = async (req, res, next) => {
  try {
    console.log(req.profile);
    res.status(200).json(req.profile);
  } catch (error) {
    console.log(error);
  }
};

// Sign Up
exports.signUp = async (req, res, next) => {
  try {
    req.body.password = await createHash(req.body.password);

    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};
// Sign in
exports.signIn = async (req, res, next) => {
  const token = generateToken(req.user);
  res.status(200).json({ token });
};

// Editing Profile

exports.editProfile = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    // const { userName } = req.params;
    await req.user.updateOne(req.body, { new: true }); // req.user is retrieved from the jwt-strategy, we used it to update the req.body
    return res.status(201).json(req.user.profile);
  } catch (error) {
    return next(error);
  }
};
