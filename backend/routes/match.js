// routes/match.js
const express = require('express');
const User = require('../models/User');
const geolib = require('geolib');  // Geolocation library
const router = express.Router();

// Match a victim with nearby volunteers
router.post('/match-help', async (req, res) => {
  try {
    const { lat, lon } = req.body;  // Victim's location

    // Fetch all volunteers from the database
    const volunteers = await User.find({ role: 'volunteer' });

    // Find the nearest volunteer
    let nearestVolunteer = null;
    let minDistance = Infinity;

    volunteers.forEach(volunteer => {
      const distance = geolib.getDistance(
        { latitude: lat, longitude: lon },
        { latitude: volunteer.lat, longitude: volunteer.lon }
      );
      if (distance < minDistance) {
        minDistance = distance;
        nearestVolunteer = volunteer;
      }
    });

    if (nearestVolunteer) {
      return res.json({ volunteer: nearestVolunteer, distance: minDistance });
    }

    return res.status(404).json({ message: 'No volunteers available nearby' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
