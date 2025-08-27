// routes/newsRoutes.js
const express = require('express');
const router = express.Router();
const News = require('../models/News');

// Get all news
router.get('/', async (req, res) => {
    try {
        const newsList = await News.find().sort({ date: -1 });
        res.json(newsList);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Post new news (admin only)
router.post('/', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNews = new News({ title, content });
        const saved = await newNews.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
