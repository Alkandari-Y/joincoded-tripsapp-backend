const { Schema, model } = require("mongoose");

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
  },
  { timestamps: true }
);

module.exports = model("User", UserSchema);
