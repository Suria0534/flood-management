const VolunteerInfo = require("../models/Volunteer");
const VolunteerTask = require("../models/VolunteerTaskModel");

// 👉 Volunteer Registration
exports.registerVolunteer = async (req, res) => {
    const { email, name, age, skills, available, latitude, longitude } = req.body;

    try {
        const volunteer = new VolunteerInfo({
            email,
            name,
            age,
            skills,
            available,
            location: {
                type: "Point",
                coordinates: [longitude, latitude] // GeoJSON format
            }
        });

        await volunteer.save();
        res.status(201).json({ message: "Volunteer registered successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error registering volunteer", details: err.message });
    }
};

// 👉 Fetch all volunteer emails
exports.getAllVolunteers = async (req, res) => {
    try {
        const volunteers = await VolunteerInfo.find({}, "email");
        res.json(volunteers);
    } catch (err) {
        res.status(500).json({ error: "Error fetching volunteers" });
    }
};

// 👉 Assign task to a volunteer
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

// 👉 Get tasks assigned to a volunteer
exports.getTasksByEmail = async (req, res) => {
    const { email } = req.params;

    try {
        const tasks = await VolunteerTask.find({ volunteerEmail: email });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: "Error fetching volunteer tasks" });
    }
};
