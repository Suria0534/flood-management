// const mongoose = require('mongoose');

// const volunteerSchema = new mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     name: { type: String, required: true },
//     age: Number,
//     skills: String,
//     available: { type: Boolean, default: true },

//     // GeoJSON Location
//     location: {
//         type: {
//             type: String,
//             enum: ["Point"],
//             default: "Point"
//         },
//         coordinates: {
//             type: [Number], // [longitude, latitude]
//             required: true
//         }
//     }
// }, { collection: "volunteerinfos" });

// // ✅ GeoSpatial index
// volunteerSchema.index({ location: "2dsphere" });

// module.exports = mongoose.model('VolunteerInfo', volunteerSchema);





// const mongoose = require('mongoose');

// const volunteerSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String },
//   phone: { type: String },
//   location: { type: String, required: true },
//   skills: { type: String }
// }, { collection: "volunteers" });

// module.exports = mongoose.model("Volunteer", volunteerSchema);






const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  skills: { type: String },
  password: { type: String, required: true },
  available: { type: Boolean, default: true },
  profilePic: { type: String, default: "" },

   location: { type: String, required: true },
  
}, { collection: "volunteers" });



module.exports = mongoose.model('Volunteer', volunteerSchema);

