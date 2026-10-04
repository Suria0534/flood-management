// // backend/models/MaterialDonation.js
// const mongoose = require("mongoose");

// const materialDonationSchema = new mongoose.Schema({
//   donorName: { type: String, required: true },
//   phone: { type: String, required: true },
//   items: [{ type: String, required: true }],
//   collectionPlace: { type: String, required: true },
// }, { timestamps: true });

// const MaterialDonation = mongoose.model("MaterialDonation", materialDonationSchema);

// module.exports = MaterialDonation;






// backend/models/MaterialDonation.js
const mongoose = require("mongoose");

const materialDonationSchema = new mongoose.Schema({
  donorName: { type: String, required: true },
  phone: { type: String, required: true },
  items: [{ type: String, required: true }],
  collectionPlace: { type: String, required: true },
}, { timestamps: true });   // <-- Important for createdAt & updatedAt

const MaterialDonation = mongoose.model("MaterialDonation", materialDonationSchema);

module.exports = MaterialDonation;
