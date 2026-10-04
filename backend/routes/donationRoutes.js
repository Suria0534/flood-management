// const express = require("express");
// const router = express.Router();
// const {
//   createDonation,
//   getDonations,
// } = require("../controllers/donationController");

// // POST: add a donation
// router.post("/", createDonation);

// // GET: get donations by optional donorEmail
// router.get("/", getDonations);

// module.exports = router;





// routes/donations.js
const express = require("express");
const router = express.Router();
const donationController = require("../controllers/donationController");

// Fund donations
router.post("/fund", donationController.createFundDonation);

// Material donations
router.post("/material", donationController.createMaterialDonation);

// Get donations (filter by type or donorEmail)
router.get("/", donationController.getDonations);

module.exports = router;
