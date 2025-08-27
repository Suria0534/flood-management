const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "fund" etc
  donorName: { type: String, required: true },
  phoneNumber: { type: String, required: true }, // <-- email বাদ দিয়ে এটা রাখো
  transactionId: { type: String, required: true }, // payment verification
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);
