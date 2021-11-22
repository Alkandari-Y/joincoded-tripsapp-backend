const express = require("express");
const {
  signUp,
  signIn,
  editProfile,
  getUserProfile,
} = require("./controllers");
const router = express.Router();
const passport = require("passport");

// param middleware
// router.param("", async (req,res,next,)

//Register
router.post("/signup", signUp);

//Login
router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signIn
);
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);

//Updating Page
// router.put("/:slug", editProfile);

module.exports = router;
