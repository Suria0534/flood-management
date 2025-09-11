const express = require("express");
const router = express.Router();
const Volunteer = require("../models/Volunteer");
const Victim = require("../models/Victim");

router.get("/matching/volunteer/:victimEmail", async (req, res) => {
  try {
    const victim = await Victim.findOne({ email: req.params.victimEmail });
    if (!victim) return res.status(404).json({ error: "Victim not found" });

    const volunteers = await Volunteer.find({
      location: {
        $near: {
          $geometry: victim.location,
          $maxDistance: 5000, // 5 km radius
        },
      },
    });

    res.json({ victim, matchedVolunteers: volunteers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
