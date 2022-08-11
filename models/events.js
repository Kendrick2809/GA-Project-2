const { string } = require("joi");
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  createdBy: {
    type: String,
    required: true,
  },
  domain: {
    type: String,
    required: true,
  },
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
    required: true,
  },
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
