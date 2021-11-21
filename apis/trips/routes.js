const express = require("express");
const Trip = require("../../db/models/Trip");
const upload = require("../../middleware/multer"); // i need to finish the path and we need to add multer,
// so we can add images
const passport = require("passport"); // we will need this for the authentication/params

const {
  tripListRetrieve,
  fetchTrip,
  tripCreate,
  tripUpdate,
  tripDelete,
  tripDetail,
} = require("./controllers");

const router = express.Router();

router.param("tripId", async (req, res, next, tripId) => {
  const trip = await fetchTrip(tripId, next);
  if (trip) {
    req.trip = trip;
    next();
  } else {
    next({ status: 404, message: "trip not found! " });
  }
});

router.get("/", tripListRetrieve); // retrieve

router.get("/:tripId", tripDetail); // might not need, done just incase

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);

router.put(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripUpdate
);

router.delete(
  "/:tripId",
  passport.authenticate("jwt", { session: false }),
  tripDelete
);

module.exports = router;
