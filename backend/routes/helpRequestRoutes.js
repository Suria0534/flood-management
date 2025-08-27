const express = require("express");
const router = express.Router();
const { createHelpRequest, matchVolunteers } = require("../controllers/helpRequestController");

// Submit a help request
router.post("/request", createHelpRequest);

// Get matched volunteers
router.get("/match", matchVolunteers);

module.exports = router;
