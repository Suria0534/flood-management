const express = require('express');
const router = express.Router();

const Victim = require('../models/Victim');
const Volunteer = require('../models/Volunteer');
const NGO = require('../models/NGO');
const Official = require('../models/Officials');

// Check login based on role
router.post('/login/:role', async (req, res) => {
    const { email } = req.body;
    const { role } = req.params;

    let Model;
    switch (role) {
        case 'victim':
            Model = Victim;
            break;
        case 'volunteer':
            Model = Volunteer;
            break;
        case 'ngo':
            Model = NGO;
            break;
        case 'official':
            Model = Official;
            break;
        default:
            return res.status(400).json({ error: 'Invalid role' });
    }

    try {
        const user = await Model.findOne({ email });
        if (user) {
            res.json({ exists: true });
        } else {
            res.json({ exists: false });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
