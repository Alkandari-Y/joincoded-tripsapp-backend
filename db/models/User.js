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
      type: Schema.Types.ObjectId,
      ref: 'Profile'
    }
  },
  { timestamps: true }
);

UserSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=username%>" });
module.exports = model("User", UserSchema);
