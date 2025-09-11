// controllers/weatherController.js
const axios = require("axios");
const Weather = require("../models/Weather");

const getWeather = async (req, res) => {
  try {
    const city = req.query.city || "Dhaka";
    const apiKey = process.env.OPENWEATHER_KEY;

    if (!apiKey) {
      return res.status(500).json({ message: "OPENWEATHER_KEY is missing" });
    }

    // Fetch weather from OpenWeatherMap
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    const data = response.data;

    // Extract relevant info
    const condition = data.weather?.[0]?.description || "Not available";
    const temperature = data.main?.temp ?? "N/A";
    const windSpeed = data.wind?.speed ?? 0; // m/s
    const rainAmount = data.rain?.["1h"] ?? data.rain?.["3h"] ?? 0; // mm

    // Flood-related alert logic
    let alertMsg = "🌤️ No severe weather.";
    if (rainAmount > 15 && windSpeed > 10) {
      alertMsg = "⚠️ Heavy rain & strong wind! Possible flooding.";
    } else if (rainAmount > 20) {
      alertMsg = "🌧️ Heavy rain expected! Flood risk high.";
    } else if (rainAmount > 10) {
      alertMsg = "🌧️ Moderate rain. Stay cautious.";
    } else if (windSpeed > 15) {
      alertMsg = "💨 Strong wind alert!";
    }

    // Save to MongoDB
    await Weather.findOneAndUpdate(
      { location: data.name },
      {
        location: data.name,
        temperature,
        description: condition,
        windSpeed,
        rainForecast: rainAmount,
        updatedAt: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json({
      location: data.name,
      temperature,
      condition,
      windSpeed,
      rainForecast: rainAmount,
      alert: alertMsg,
    });
  } catch (err) {
    console.error("Weather API error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to fetch weather" });
  }
};

module.exports = { getWeather };
