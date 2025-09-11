// const Donation = require("../models/Donation");

// // POST: create a new donation
// exports.createDonation = async (req, res) => {
//   try {
//     const { type, donorName, phoneNumber, transactionId, amount, donorEmail } = req.body;

//     if (!type || !donorName || !phoneNumber || !transactionId || !amount) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     const donation = new Donation({ type, donorName, phoneNumber, transactionId, amount, donorEmail });
//     await donation.save();

//     res.status(201).json({ success: true, donation });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // GET: fetch donations, optionally by donorEmail
// exports.getDonations = async (req, res) => {
//   try {
//     const { donorEmail } = req.query;
//     let filter = {};
//     if (donorEmail) filter.donorName = donorEmail; // match with donorName/email

//     const donations = await Donation.find(filter).sort({ createdAt: -1 });
//     res.status(200).json({ donations });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };




// controllers/donationController.js
const Donation = require("../models/Donation");

// Create Fund Donation
exports.createFundDonation = async (req, res) => {
  try {
    const { donorName, donorEmail, phoneNumber, transactionId, amount, paymentMethod } = req.body;

    if (!donorName || !phoneNumber || !transactionId || !amount) {
      return res.status(400).json({ success: false, message: "All required fields must be filled" });
    }

    const donation = new Donation({
      type: "fund",
      donorName,
      donorEmail,
      phoneNumber,
      transactionId,
      amount,
      paymentMethod,
    });

    await donation.save();
    res.status(201).json({ success: true, message: "Fund donation submitted", donation });
  } catch (err) {
    console.error("createFundDonation Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create Material Donation
exports.createMaterialDonation = async (req, res) => {
  try {
    const { donorName, donorEmail, phone, items, collectionPlace } = req.body;

    if (!donorName || !phone || !items || items.length === 0 || !collectionPlace) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const donation = new Donation({
      type: "material",
      donorName,
      donorEmail,
      phoneNumber: phone,
      items,
      collectionPlace,
    });

    await donation.save();
    res.status(201).json({ success: true, message: "Material donation submitted", donation });
  } catch (err) {
    console.error("createMaterialDonation Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get Donations (optionally filtered by donorEmail)
exports.getDonations = async (req, res) => {
  try {
    const { donorEmail, type } = req.query;
    let filter = {};
    if (donorEmail) filter.donorEmail = donorEmail;
    if (type) filter.type = type;

    const donations = await Donation.find(filter).sort({ createdAt: -1 });
    res.status(200).json({ success: true, donations });
  } catch (err) {
    console.error("getDonations Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
