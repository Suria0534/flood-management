const Donation = require("../models/Donation");

// POST: create a new donation
exports.createDonation = async (req, res) => {
  try {
    const { type, donorName, phoneNumber, transactionId, amount } = req.body;

    if (!type || !donorName || !phoneNumber || !transactionId || !amount) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const donation = new Donation({
      type,
      donorName,
      phoneNumber,
      transactionId,
      amount,
    });

    await donation.save();

    res.status(201).json({
      success: true,
      message: "Donation submitted successfully",
      donation,
    });
  } catch (err) {
    console.error("Donation Save Error:", err.message);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// GET: fetch all donations (optionally filter by type)
exports.getDonations = async (req, res) => {
  try {
    const { type } = req.query;

    let filter = {};
    if (type) filter.type = type;

    const donations = await Donation.find(filter);

    res.status(200).json({
      success: true,
      donations,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
