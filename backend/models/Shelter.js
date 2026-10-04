const mongoose = require("mongoose");

const shelterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  phone: { type: String, required: true }, // <- এটা থাকতে হবে
  totalCapacity: { type: Number, required: true },
  currentOccupancy: { type: Number, required: true },
  volunteersNeeded: { type: Number, required: true },
  itemsNeeded: [{ type: String }],
});

module.exports = mongoose.model("Shelter", shelterSchema);
