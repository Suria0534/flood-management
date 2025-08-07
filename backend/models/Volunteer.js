const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: String,
    age: Number,
    skills: String,
    available: Boolean,
}, {collection: "volunteerinfos"});

module.exports = mongoose.model('VolunteerInfo', volunteerSchema);
