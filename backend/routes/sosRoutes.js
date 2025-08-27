const express = require('express');
const router = express.Router();
const SOS = require('../models/SOS');

// POST /api/sos
router.post('/', async (req, res) => {
  const { userId, location } = req.body;

  if (!userId || !location?.lat || !location?.lng) {
    return res.status(400).json({ success: false, message: "Missing data" });
  }

  try {
    const newSOS = new SOS({ userId, location });
    await newSOS.save();
    res.json({ success: true, message: "SOS sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
