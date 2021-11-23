const express = require("express");
const {
  signUp,
  signIn,
  getRequestedProfile,
  findUserByUserName,
  editProfile,
} = require("./controllers");
const router = express.Router();
const passport = require("passport");

router.param("userName", async (req, res, next, userName) => {
  const requestedProfile = await findUserByUserName(userName, next);
  if (requestedProfile) {
    // why not spread (...) `requestedProfile.profile` instead of manually adding fields?
    req.profile = {
      username: requestedProfile.username,
      image: requestedProfile.profile.image,
      bio: requestedProfile.profile.bio,
      favoriteTrips: requestedProfile.profile.favoriteTrips,
      tripsToGoOn: requestedProfile.profile.tripsToGoOn,
    };
    next();
  } else {
    next({ status: 404, message: "trip not found! " });
  }
});

//Register
router.post("/signup", signUp);

//Login
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
// REVIEW: Why by the username not the ID?
// REVIEW: username is one word, so it's username not userName
// REVIEW: Better naming /profiles/whatever
// REVIEW: I believe the fetch profile and update profile should be in their own folder
router.get(
  "/userProfile/:userName",

  getRequestedProfile
);

// REVIEW: IF you're updating the logged in user, you cannot pass the username, you should get the user info through the token
//Updating Page
router.put(
  "/:userName",
  passport.authenticate("jwt", { session: false }),
  // upload.single("image"),
  editProfile
);

module.exports = router;
