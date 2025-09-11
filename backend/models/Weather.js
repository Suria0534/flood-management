// models/Weather.js
const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  location: { type: String, required: true },
  temperature: Number,          // Current temperature in °C
  description: String,          // Weather condition description
  windSpeed: Number,            // Wind speed in m/s
  rainForecast: Number,         // Rainfall in mm (1h or 3h)
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Weather", weatherSchema);
