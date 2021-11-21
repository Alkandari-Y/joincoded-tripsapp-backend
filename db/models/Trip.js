const { Schema, model } = require("mongoose");

const TripSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    // required: true  // comment this for now
    trim: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
  },
  date: {
    type: Date,
    // required: true,
  },
  // Geolocation // keep this commented for now

  // likes:{}
});
module.exports = model("Trip", TripSchema);
