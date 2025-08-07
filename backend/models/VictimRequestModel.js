const mongoose = require('mongoose');

const victimRequestSchema = new mongoose.Schema({
  email: { type: String, required: true },
  needType: { type: String, required: true },
  description: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
}, {collection: "victimAct"});

module.exports = mongoose.model('VictimAct', victimRequestSchema);
