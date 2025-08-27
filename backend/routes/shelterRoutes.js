const express = require("express");
const router = express.Router();
const shelterController = require("../controllers/shelterController");

router.get("/", shelterController.getAllShelters);
router.post("/", shelterController.addShelter);
router.put("/:id", shelterController.updateShelter);

module.exports = router;
