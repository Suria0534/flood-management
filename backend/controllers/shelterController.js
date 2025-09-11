// const Shelter = require("../models/Shelter");

// // Add shelter (Admin only)
// const addShelter = async (req, res) => {
//   try {
//     const { name, phoneNumber, date, totalCapacity, currentOccupancy, volunteersNeeded, itemsNeeded } = req.body;

//     const newShelter = new Shelter({
//       name,
//       phoneNumber, // ✅ save phone number
//       date,
//       totalCapacity,
//       currentOccupancy,
//       volunteersNeeded,
//       itemsNeeded
//     });

//     const savedShelter = await newShelter.save();
//     res.status(201).json(savedShelter);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// // Get all shelters (Public)
// const getShelters = async (req, res) => {
//   try {
//     const shelters = await Shelter.find();
//     res.json(shelters);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// // Update shelter (Admin only)
// const updateShelter = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const updateData = req.body;

//     const updatedShelter = await Shelter.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updatedShelter) return res.status(404).json({ message: "Shelter not found" });

//     res.json(updatedShelter);
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// // Delete shelter (Admin only)
// const deleteShelter = async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deletedShelter = await Shelter.findByIdAndDelete(id);

//     if (!deletedShelter) return res.status(404).json({ message: "Shelter not found" });

//     res.json({ message: "Shelter deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Server Error", error: err.message });
//   }
// };

// module.exports = { addShelter, getShelters, updateShelter, deleteShelter };



const Shelter = require("../models/Shelter");

// ---------------- Public Controllers ----------------

// Get all shelters (anyone can see)
const getShelters = async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// ---------------- Admin Controllers ----------------

// Add shelter (Admin only)
const addShelter = async (req, res) => {
  try {
    const { name, phone, date, totalCapacity, currentOccupancy, volunteersNeeded, itemsNeeded } = req.body;

    if (!name || !phone || !date || !totalCapacity || !currentOccupancy || !volunteersNeeded) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const newShelter = new Shelter({
      name,
      phone,
      date,
      totalCapacity,
      currentOccupancy,
      volunteersNeeded,
      itemsNeeded: itemsNeeded || [],
    });

    const savedShelter = await newShelter.save();
    res.status(201).json(savedShelter);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update shelter (Admin only)
const updateShelter = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedShelter = await Shelter.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedShelter) return res.status(404).json({ message: "Shelter not found" });

    res.json(updatedShelter);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete shelter (Admin only)
const deleteShelter = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedShelter = await Shelter.findByIdAndDelete(id);

    if (!deletedShelter) return res.status(404).json({ message: "Shelter not found" });

    res.json({ message: "Shelter deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

module.exports = { getShelters, addShelter, updateShelter, deleteShelter };
