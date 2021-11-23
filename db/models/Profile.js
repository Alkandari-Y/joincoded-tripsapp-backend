const { Schema, model } = require("mongoose");

const ProfileSchema = Schema(
  {
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: "/media/defaultUserImage.jpg"
    },
        bio: {
        type: String,
    },
    favoriteTrips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    tripsToGoOn: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    tripsCreated: [{ type: Schema.Types.ObjectId, ref: "Trip" }]
  },
  { timestamps: true }
);

module.exports = model("Profile", ProfileSchema);
