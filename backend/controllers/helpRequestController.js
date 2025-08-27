const HelpRequest = require("../models/HelpRequest");

// POST /api/help-request/request
exports.createHelpRequest = async (req, res) => {
    try {
        const { email, phone, needType, description, latitude, longitude } = req.body;

        // Validate input
        if (!email || !phone || !needType || !description || !latitude || !longitude) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRequest = new HelpRequest({
            email,
            phone,
            needType,
            description,
            latitude,
            longitude
        });

        await newRequest.save();
        res.status(201).json({ message: "Help request submitted successfully", request: newRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

// GET /api/help-request/match
exports.matchVolunteers = async (req, res) => {
    try {
        const requests = await HelpRequest.find().sort({ createdAt: -1 });
        res.status(200).json(requests);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};
