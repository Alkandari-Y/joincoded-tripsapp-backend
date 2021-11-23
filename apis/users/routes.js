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
router.get(
  "/userProfile/:userName",

  getRequestedProfile
);

//Updating Page
router.put(
  "/:userName",
  passport.authenticate("jwt", { session: false }),
  // upload.single("image"),
  editProfile
);

module.exports = router;
