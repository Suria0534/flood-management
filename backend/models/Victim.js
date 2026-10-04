// const mongoose = require("mongoose");

// const victimSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },  // <-- Make sure phone exists
//   location: { type: String },
//   profilePic: { type: String },
// });

// module.exports = mongoose.model("Victim", victimSchema);
// const mongoose = require('mongoose');

// const victimSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   age: { type: Number, required: true },
//   location: { type: String, required: true },
//   needs: { type: String },
//   profilePic: { type: String, default: '' },
//   role: { type: String, default: 'victim' }
// }, { collection: "victims" });

// module.exports = mongoose.model('Victim', victimSchema);




// const mongoose = require('mongoose');

// const victimSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   phone: { type: String, required: true },
//   age: { type: Number, required: true },
//   location: {
//     type: { type: String, enum: ["Point"], default: "Point" },
//     coordinates: { type: [Number], required: true }, // [lng, lat]
//   },
//   needs: { type: String },
//   profilePic: { type: String, default: '' },
//   role: { type: String, default: 'victim' }
// }, { collection: "victims" });

// // 2dsphere index লাগবে distance query এর জন্য
// victimSchema.index({ location: "2dsphere" });

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const victimSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  location: { type: String, required: true },
  needs: { type: String },
  password: { type: String, required: true }, // add password
  profilePic: { type: String, default: '' },
  role: { type: String, default: 'victim' }
}, { collection: "victims" });

// Optional: Hash password before saving
// victimSchema.pre('save', async function(next) {
//   if (this.isModified('password')) {
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//   }
//   next();
// });

module.exports = mongoose.model('Victim', victimSchema);
