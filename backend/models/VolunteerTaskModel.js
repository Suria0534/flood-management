const mongoose = require("mongoose");

const VolunteerTaskSchema = new mongoose.Schema({
    volunteerEmail: { type: String, required: true },
    task: { type: String, required: true },
    assignedBy: { type: String, required: true }, // NGO email
    assignedAt: { type: Date, default: Date.now }
}, {collection: "volunteerTask"});

module.exports = mongoose.model("VolunteerTask", VolunteerTaskSchema);
