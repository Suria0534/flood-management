// const mongoose = require("mongoose");

// const donationSchema = new mongoose.Schema({
//   type: { type: String, required: true }, // "fund" or "materials"
//   donorName: { type: String, required: true }, // use email as name
//   phoneNumber: { type: String, required: true },
//   transactionId: { type: String, required: true },
//   amount: { type: Number, required: true },
//   donorEmail: { type: String }, // optional
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("Donation", donationSchema);


// models/Donation.js
const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  type: { type: String, required: true }, // "fund" or "material"
  donorName: { type: String, required: true },
  donorEmail: { type: String }, // optional
  phoneNumber: { type: String, required: true },
  transactionId: { type: String, required: true }, // only for fund
  paymentMethod: { type: String }, // only for fund
  amount: { type: Number }, // only for fund
  items: [{ type: String }], // only for material
  collectionPlace: { type: String }, // only for material
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Donation", donationSchema);
