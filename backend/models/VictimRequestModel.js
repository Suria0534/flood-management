// const mongoose = require('mongoose');

// const victimRequestSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   needType: { type: String, required: true },
//   description: { type: String, required: true },
//   postedAt: { type: Date, default: Date.now },
// }, {collection: "victimAct"});

// module.exports = mongoose.model('VictimAct', victimRequestSchema);




const mongoose = require('mongoose');

const victimRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  location: { type: String, required: true },
  needs: { type: String },
  postedAt: { type: Date, default: Date.now }
}, { collection: "victimAct" });

module.exports = mongoose.model('VictimAct', victimRequestSchema);
