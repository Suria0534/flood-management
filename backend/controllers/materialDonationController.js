// backend/controllers/materialDonationController.js
const MaterialDonation = require("../models/MaterialDonation");

// Create Material Donation
const createMaterialDonation = async (req, res) => {
  try {
    const { donorName, phone, items, collectionPlace } = req.body;

    const donation = new MaterialDonation({
      donorName,
      phone,
      items,
      collectionPlace,
    });

    await donation.save();
    res.status(201).json({ message: "Material donation submitted successfully", donation });
  } catch (error) {
    res.status(500).json({ message: "Error submitting donation", error: error.message });
  }
};

// Get All Material Donations
const getMaterialDonations = async (req, res) => {
  try {
    const donations = await MaterialDonation.find();
    res.json(donations);
  } catch (error) {
    res.status(500).json({ message: "Error fetching donations", error: error.message });
  }
};

module.exports = { createMaterialDonation, getMaterialDonations };
