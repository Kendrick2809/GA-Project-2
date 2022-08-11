const mongoose = require("mongoose");

const domainSchema = new mongoose.Schema({
  domain: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: String,
    required: true,
  },
});

const Domain = mongoose.model("Domain", domainSchema);

module.exports = Domain;
