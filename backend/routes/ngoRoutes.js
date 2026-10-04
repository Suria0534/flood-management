const express = require("express");
const router = express.Router();
const ngoController = require("../controllers/ngoController");

router.get("/volunteers", ngoController.getAllVolunteers);
router.post("/assign-task", ngoController.assignTask);
router.get("/tasks", ngoController.getTasksByNgo);
router.post("/donate", ngoController.submitDonation);
router.get("/donations", ngoController.getAllDonations);

module.exports = router;
