const express = require("express");
const router = express.Router();
const volunteerController = require("../controllers/VolunteerController");

router.get("/volunteers", volunteerController.getAllVolunteers);
router.post("/volunteer-task", volunteerController.assignTask);
router.get("/volunteer-tasks/:email", volunteerController.getTasksByEmail);
module.exports = router;
