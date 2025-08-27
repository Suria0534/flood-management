// models/HelpRequest.js
const mongoose = require("mongoose");

const helpRequestSchema = new mongoose.Schema({
  email: String,
  phone: String,
  latitude: Number,
  longitude: Number,
  needType: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("HelpRequest", helpRequestSchema);
