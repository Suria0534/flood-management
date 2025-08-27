const express = require("express");
const router = express.Router();
const {
  createDonation,
  getDonations,
} = require("../controllers/donationController");

// POST: add a donation
router.post("/", createDonation);

// GET: get all donations (optionally by type)
router.get("/", getDonations);

module.exports = router;
