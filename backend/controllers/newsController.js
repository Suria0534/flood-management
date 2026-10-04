const News = require("../models/News");

// Get all news
const getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create news
const createNews = async (req, res) => {
  try {
    const newNews = await News.create(req.body);
    res.status(201).json(newNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update news
const updateNews = async (req, res) => {
  try {
    const updatedNews = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedNews) return res.status(404).json({ message: "News not found" });
    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete news
const deleteNews = async (req, res) => {
  try {
    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// **Export properly as object**
module.exports = { getNews, createNews, updateNews, deleteNews };
