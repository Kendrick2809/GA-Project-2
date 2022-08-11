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
  eventList: [{ type: mongoose.Schema.Types.ObjectId, ref: "Event" }],
});

const Domain = mongoose.model("Domain", domainSchema);

module.exports = Domain;
