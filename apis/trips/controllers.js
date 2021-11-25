const Trip = require("../../db/models/Trip");

// CRUD for trips

//Get Trip By Id
exports.fetchTrip = async (TripId, next) => {
  try {
    const trip = await Trip.findById(TripId);
    return trip;
  } catch (error) {
    next(error);
  }
};

//Fetch Trip List
exports.tripListRetrieve = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate(
      { path: "owner", select: "profile" });
    return res.json(trips);
  } catch (error) {
    next(error);
  }
};

//Create Trip
exports.tripCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
    }
    req.body.owner = req.user._id; // this is to give the person whose logged in the ownership
    // req.user => logged in user from passport jwt
    const newTrip = await Trip.create(req.body);
    // await newTrip.populate // we will need to add the relations

    return res.status(201).json(newTrip);
  } catch (error) {
    next(error);
  }
};

//Update Trip
exports.tripUpdate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `/${req.file.path}`;
      req.body.image = req.body.image.replace("\\", "/");
    }
    const trip = await Trip.findByIdAndUpdate(req.trip, req.body, {
      new: true,
      runValidators: true, // returns updated products
    });
    return res.json(trip);
  } catch (error) {
    next(error);
  }
};

//Delete Trip
exports.tripDelete = async (req, res, next) => {
  try {
    await req.trip.remove();
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

// this is to fetch a trip detail
exports.tripDetail = async (req, res, next) => {
  try {
    res.status(200).json(req.trip);
  } catch (error) {
    next(error);
  }
};
