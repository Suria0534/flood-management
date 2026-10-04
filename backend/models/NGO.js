// const mongoose = require('mongoose');

// const ngoSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     name: String,
//     contact: String,
//     area: String,
//     resources: String,
// }, {collection: "ngoinfos"});

// module.exports = mongoose.model('NGOInfo', ngoSchema);
const mongoose = require("mongoose");

const ngoSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },
    location: { type: String },
    role: { type: String, default: "NGO" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("NGO", ngoSchema);
