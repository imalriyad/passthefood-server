const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    accountType: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      required: true,
      enum: ['google', 'manual']
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
