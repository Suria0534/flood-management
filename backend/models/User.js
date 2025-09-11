// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  role: { type: String, enum: ['victim', 'volunteer', 'ngo', 'official'], required: true },
  name: { type: String, required: true },
  lat: { type: Number, required: true },  // Latitude
  lon: { type: Number, required: true },  // Longitude
});

module.exports = mongoose.model('User', userSchema);
