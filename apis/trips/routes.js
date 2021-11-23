const express = require("express");
const upload = require("../../middleware/multer");
const passport = require("passport");

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

// REVIEW: Why do you need the detail route?
router.get("/:tripId", tripDetail);

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

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  tripCreate
);

router.get("/", tripListRetrieve);

module.exports = router;
