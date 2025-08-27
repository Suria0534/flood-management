const Shelter = require("../models/Shelter");

// Get all shelters
exports.getAllShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add new shelter
exports.addShelter = async (req, res) => {
  try {
    const newShelter = new Shelter(req.body);
    await newShelter.save();
    res.json(newShelter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update occupancy
exports.updateShelter = async (req, res) => {
  try {
    const { currentOccupancy, needsHelp } = req.body;
    const updatedShelter = await Shelter.findByIdAndUpdate(
      req.params.id,
      { currentOccupancy, needsHelp },
      { new: true }
    );
    res.json(updatedShelter);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
