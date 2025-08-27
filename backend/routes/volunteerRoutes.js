const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/volunteerController");

// Register new volunteer
router.post("/register", volunteerController.registerVolunteer);

// Get all volunteers (only email)
router.get("/", volunteerController.getAllVolunteers);

// Assign task
router.post("/assign", volunteerController.assignTask);

// Get tasks by volunteer email
router.get("/tasks/:email", volunteerController.getTasksByEmail);

module.exports = router;
