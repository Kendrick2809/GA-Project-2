const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
