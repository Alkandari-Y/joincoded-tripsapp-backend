const { Schema, model } = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const UserSchema = Schema(
  {
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
      unique: true,
    },
    profile: {
      image: {
        type: String,
        default: "/media/defaultUserImage.jpg",
      },
      bio: {
        type: String,
      },
      favoriteTrips: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
      tripsToGoOn: [{ type: Schema.Types.ObjectId, ref: "Trip" }],
    },
  },
  { timestamps: true }
);

// REVIEW: This line is for slugs, we dont have slugs in mobile apps, please remove it and uninstall the plugin
UserSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=username%>" });
module.exports = model("User", UserSchema);
