const express = require("express");
const router = express.Router();
const volunteerTaskController = require("../controllers/VolunteerTaskController");

// Assign task
router.post("/", volunteerTaskController.assignTask);

// Get tasks for a volunteer
router.get("/:email", volunteerTaskController.getTasksByVolunteer);

// Mark task as completed
router.put("/complete/:taskId", volunteerTaskController.completeTask);

// Get all tasks (for NGO)
router.get("/", volunteerTaskController.getAllAssignedTasks);

module.exports = router;
