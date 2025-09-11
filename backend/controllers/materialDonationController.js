// // // backend/controllers/materialDonationController.js
// // const MaterialDonation = require("../models/MaterialDonation");

// // // Create Material Donation
// // const createMaterialDonation = async (req, res) => {
// //   try {
// //     const { donorName, phone, items, collectionPlace } = req.body;

// //     const donation = new MaterialDonation({
// //       donorName,
// //       phone,
// //       items,
// //       collectionPlace,
// //     });

// //     await donation.save();
// //     res.status(201).json({ message: "Material donation submitted successfully", donation });
// //   } catch (error) {
// //     res.status(500).json({ message: "Error submitting donation", error: error.message });
// //   }
// // };

// // // Get All Material Donations
// // const getMaterialDonations = async (req, res) => {
// //   try {
// //     const donations = await MaterialDonation.find();
// //     res.json(donations);
// //   } catch (error) {
// //     res.status(500).json({ message: "Error fetching donations", error: error.message });
// //   }
// // };

// // module.exports = { createMaterialDonation, getMaterialDonations };

// const MaterialDonation = require("../models/MaterialDonation");

// // POST: create new material donation
// exports.createMaterialDonation = async (req, res) => {
//   try {
//     const { donorName, phone, items, collectionPlace } = req.body;

//     if (!donorName || !phone || !items || items.length === 0 || !collectionPlace) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const donation = new MaterialDonation({ donorName, phone, items, collectionPlace });
//     await donation.save();

//     res.status(201).json({ success: true, message: "Material donation submitted successfully", donation });
//   } catch (err) {
//     console.error("Material Donation Error:", err.message);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // GET: fetch all material donations
// exports.getMaterialDonations = async (req, res) => {
//   try {
//     const donations = await MaterialDonation.find();
//     res.status(200).json({ success: true, donations });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };
// backend/controllers/materialDonationController.js
// controllers/materialDonationController.js
const MaterialDonation = require("../models/MaterialDonation");

// POST: create a new material donation
exports.createMaterialDonation = async (req, res) => {
  try {
    const { donorName, phone, items, collectionPlace } = req.body;

    // Validate fields
    if (!donorName || !phone || !items || !collectionPlace) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Create new MaterialDonation document
    const donation = new MaterialDonation({
      donorName,
      phone,
      items,           // should be an array
      collectionPlace,
    });

    await donation.save();
    res.status(201).json({ success: true, donation });
  } catch (err) {
    console.error("Error creating material donation:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// GET: fetch material donations, optionally by donorName
exports.getMaterialDonations = async (req, res) => {
  try {
    const { donorName } = req.query;  // filter by donorName
    let filter = {};
    if (donorName) filter.donorName = donorName;

    const donations = await MaterialDonation.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, materialDonations: donations });
  } catch (err) {
    console.error("Error fetching material donations:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
