const VictimAct = require("../models/VictimRequestModel");
const Volunteer = require("../models/Volunteer");

// Match victims with nearest volunteers (within 10km by default)
const matchVictimsWithVolunteers = async (req, res) => {
  try {
    const { victimId } = req.params;

    // Find victim by ID
    const victim = await VictimAct.findById(victimId);
    if (!victim) return res.status(404).json({ message: "Victim not found" });

    // Find volunteers near victim (within 10 km)
    const volunteers = await Volunteer.find({
      location: {
        $near: {
          $geometry: victim.location,
          $maxDistance: 10000 // 10 km
        }
      }
    }).limit(10);

    res.json({
      victim: {
        email: victim.email,
        needType: victim.needType,
        description: victim.description,
        location: victim.location,
      },
      nearbyVolunteers: volunteers
    });

  } catch (err) {
    console.error("Matching error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { matchVictimsWithVolunteers };
