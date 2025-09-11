// routes/announcements.js
const express = require("express");
const router = express.Router();
const { getAnnouncements } = require("../controllers/announcementsController");

// Public route: Home page fetches this
router.get("/", getAnnouncements);

module.exports = router;
