const express = require("express");
const router = express.Router();
const { addResource, getResources, deleteResource } = require("../controllers/resourceController");
const { authMiddleware } = require("../middleware/authMiddleware");

router.post("/", authMiddleware, addResource);
router.delete("/:id", authMiddleware, deleteResource);
router.get("/", getResources);

module.exports = router; // ✅ export router, NOT authMiddleware
