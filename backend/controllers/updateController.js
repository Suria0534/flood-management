const Update = require('../models/Update');

// Fetch all updates
exports.getUpdates = async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, updates });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Create a new update with optional media
exports.createUpdate = async (req, res) => {
  try {
    const { text, author } = req.body;
    const media = req.file ? '/uploads/' + req.file.filename : null;

    const update = new Update({ text, author, media });
    await update.save();

    res.status(201).json({ success: true, update });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
