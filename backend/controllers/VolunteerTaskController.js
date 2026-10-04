const VolunteerTask = require("../models/VolunteerTask");

// Assign task
exports.assignTask = async (req, res) => {
  try {
    const { volunteerEmail, task, assignedBy } = req.body;
    if (!volunteerEmail || !task || !assignedBy)
      return res.status(400).json({ message: "All fields required" });

    const newTask = new VolunteerTask({ volunteerEmail, task, assignedBy });
    await newTask.save();
    res.status(201).json({ message: "Task assigned successfully", task: newTask });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};

// Get tasks for volunteer
exports.getTasksByVolunteer = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find({ volunteerEmail: req.params.email });
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks (NGO view)
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await VolunteerTask.find();
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Complete task
exports.completeTask = async (req, res) => {
  try {
    const task = await VolunteerTask.findByIdAndUpdate(
      req.params.taskId,
      { completed: true },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task marked as completed", task });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
