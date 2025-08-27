const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
  needsHelp: { type: Boolean, default: false },
});

module.exports = mongoose.model("Shelter", shelterSchema);
