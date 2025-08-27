const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    age: Number,
    skills: String,
    available: { type: Boolean, default: true },

    // GeoJSON Location
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point"
        },
        coordinates: {
            type: [Number], // [longitude, latitude]
            required: true
        }
    }
}, { collection: "volunteerinfos" });

// ✅ GeoSpatial index
volunteerSchema.index({ location: "2dsphere" });

module.exports = mongoose.model('VolunteerInfo', volunteerSchema);
