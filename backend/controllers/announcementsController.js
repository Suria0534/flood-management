// controllers/announcementsController.js
const Weather = require("../models/Weather");
const News = require("../models/News");

// Get latest announcements + weather
const getAnnouncements = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 }).limit(5); // latest 5 news
    const weather = await Weather.findOne().sort({ updatedAt: -1 }); // latest weather

    res.json({
      news,
      weather: weather || null
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAnnouncements };
