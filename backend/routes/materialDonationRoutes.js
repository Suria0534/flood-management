// const express = require("express");
// const router = express.Router();
// const { createMaterialDonation, getMaterialDonations } = require("../controllers/materialDonationController");

// // POST: add material donation
// router.post("/", createMaterialDonation);

// // GET: fetch all material donations
// router.get("/", getMaterialDonations);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { createMaterialDonation, getMaterialDonations } = require("../controllers/materialDonationController");

// POST: add material donation
router.post("/", createMaterialDonation);

// GET: fetch all material donations (or by donorEmail)
router.get("/", getMaterialDonations);

module.exports = router;

