const User = require("../../db/models/User");
//Import Utils
const { createHash } = require("../../utils/createHash");
const { generateToken } = require("../../utils/createToken");

//Get user Profile
exports.getUserProfile = async (req, res, next) => {
  try {
    console.log('requested profile')
    const foundUser = await User.findById(req.user._id);
    req.body.profile = {
      image: foundUser.profile.image,
      bio: foundUser.profile.bio,
      favoriteTrips: foundUser.profile.favoriteTrips,
      tripsToGoOn: foundUser.profile.tripsToGoOn,
    };
    res.status(200).json(req.body.profile);
  } catch (error) {
    next(error);
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

// exports.editProfile = async (req, res, next) => {
//   try {
//     if (req.file) {
//       req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
//     }
//   } catch (error) {}
// };
