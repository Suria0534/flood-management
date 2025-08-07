const Victim = require('../models/Victim');
const Volunteer = require('../models/Volunteer');
const NGO = require('../models/NGO');
const Official = require('../models/Officials');

exports.registerVictim = async (req, res) => {
    try {
        const victim = new Victim(req.body);
        await victim.save();
        res.status(201).json({ message: 'Victim registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registerVolunteer = async (req, res) => {
    try {
        const volunteer = new Volunteer(req.body);
        await volunteer.save();
        res.status(201).json({ message: 'Volunteer registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registerNGO = async (req, res) => {
    try {
        const ngo = new NGO(req.body);
        await ngo.save();
        res.status(201).json({ message: 'NGO registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.registerOfficial = async (req, res) => {
    try {
        const official = new Official(req.body);
        await official.save();
        res.status(201).json({ message: 'Official registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
