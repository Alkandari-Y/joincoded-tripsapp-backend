const { Schema, model } = require("mongoose");

const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: /.+\@.+\..+/,
        required: true,
        unique: true
    },
    profile: {
        image: {
            type: String
        },
        bio: {
            type: String
        },
        favoriteTrips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
        tripsToGoOn: [{ type: Schema.Types.ObjectId, ref: "Trip" }]
    },
},
    {timestamps: true}
)

module.exports = model("User", UserSchema)