const mongoose = require('mongoose');

const updateSchema = new mongoose.Schema({
  author: { type: String, default: "Anonymous" },
  text: { type: String, required: true },
  media: { type: String }, // file path
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Update', updateSchema);
