const Profile = require("../../db/models/Profile");


//Find User
exports.findUserProfileById = async (profileId, next) => {
    try {
        const foundProfile = await Profile.findById(profileId);
        return foundProfile;
    } catch (error) {
        next(error);
    }
  };

//Get Profiles List
exports.getProfileList = async (req, res, next) => {
    try {
        const profiles = await Profile.find()
        .populate("tripsCreated").populate("user", { path: 'user', select: 'username' })
      return res.status(200).json(profiles);
    } catch (error) {
      console.log(error);
    }
};


// Editing Profile
exports.updateProfile = async (req, res, next) => {
    try {
      if (req.file) {
        req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
      };
      
      if (req.user._id === req.profile.user._id) {
        const updatedProfile = await req.profile.updateOne(req.body);
        return res.status(201).json(updatedProfile);
      }
    } catch (error) {
      return next(error);
    }
  };
