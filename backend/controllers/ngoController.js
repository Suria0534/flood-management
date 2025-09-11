const Volunteer = require("../models/Volunteer");
const Task = require("../models/VolunteerTaskModel");
const Donation = require("../models/Donation");
// backend/controllers/ngoController.js

exports.getProfile = async (req, res) => {
  try {
    const ngo = await Ngo.findOne({ email: req.params.email });
    if (!ngo) return res.status(404).json({ message: "NGO not found" });

    res.json({
      name: ngo.name,
      email: ngo.email,
      phone: ngo.phoneNumber, // <-- যদি schema তে phoneNumber থাকে
      profilePic: ngo.profilePic
    });
  } catch(err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Fetch all volunteers ----------------
const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().select("-password");
    res.json(volunteers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Assign Task ----------------
const assignTask = async (req, res) => {
  try {
    const { volunteerId, title, description, assignedBy } = req.body;
    if (!volunteerId || !title || !assignedBy)
      return res.status(400).json({ message: "Required fields missing" });

    const task = new Task({ volunteerId, title, description, assignedBy });
    await task.save();
    res.status(201).json({ message: "Task assigned successfully", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Fetch NGO assigned tasks (optional) ----------------
const getTasksByNgo = async (req, res) => {
  try {
    const { ngoEmail } = req.query;
    const tasks = await Task.find({ assignedBy: ngoEmail }).populate("volunteerId", "name email phone");
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- Donations ----------------
const submitDonation = async (req, res) => {
  try {
    const donation = new Donation(req.body);
    await donation.save();
    res.status(201).json({ message: "Donation recorded", donation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getAllDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getAllVolunteers, assignTask, getTasksByNgo, submitDonation, getAllDonations };
