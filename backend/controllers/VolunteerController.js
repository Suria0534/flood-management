const VolunteerInfo = require("../models/Volunteer");
const VolunteerTask = require("../models/VolunteerTaskModel");

// Fetch all volunteer emails
exports.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await VolunteerInfo.find({}, "email");
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ error: "Error fetching volunteers" });
    }
};

// Assign task to a volunteer
exports.assignTask = async (req, res) => {
    const { volunteerEmail, task, assignedBy } = req.body;

    try {
        const newTask = new VolunteerTask({ volunteerEmail, task, assignedBy });
        await newTask.save();
        res.status(201).json({ message: "Task assigned successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error assigning task" });
    }
};
exports.getTasksByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const tasks = await VolunteerTask.find({ volunteerEmail: email });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Error fetching volunteer tasks" });
    }
};