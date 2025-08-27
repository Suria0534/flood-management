// backend/routes/materialDonationRoutes.js
const express = require("express");
const router = express.Router();
const { createMaterialDonation, getMaterialDonations } = require("../controllers/materialDonationController");

router.post("/", createMaterialDonation);
router.get("/", getMaterialDonations);

module.exports = router;
