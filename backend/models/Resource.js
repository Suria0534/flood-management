const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  totalQuantity: { type: Number, required: true },
  sentQuantity: { type: Number, default: 0 },
  sentTo: { type: String, default: "" }
}, { timestamps: true });

module.exports = mongoose.model("Resource", resourceSchema);
