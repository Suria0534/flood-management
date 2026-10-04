// const mongoose = require("mongoose");

// const VolunteerTaskSchema = new mongoose.Schema({
//   volunteerEmail: { type: String, required: true },
//   task: { type: String, required: true },
//   assignedBy: { type: String, required: true }, // NGO email
//   assignedAt: { type: Date, default: Date.now },
//   completed: { type: Boolean, default: false } // Volunteer task complete korle update hobe
// }, { collection: "volunteerTask" });

// module.exports = mongoose.model("VolunteerTask", VolunteerTaskSchema);

const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  volunteerId: { type: mongoose.Schema.Types.ObjectId, ref: "Volunteer", required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false },
});

module.exports = mongoose.model("Task", taskSchema);


