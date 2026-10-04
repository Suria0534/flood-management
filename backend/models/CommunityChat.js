// backend/models/CommunityChat.js
const mongoose = require("mongoose");

const CommunityChatSchema = new mongoose.Schema({
  senderName: { type: String, required: true },
  senderEmail: { type: String },     // new
  senderPhone: { type: String },     // new
  senderLocation: { type: String },  // new
  role: { type: String, default: "User" },
  message: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("CommunityChat", CommunityChatSchema);
