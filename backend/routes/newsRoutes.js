const express = require("express");
const router = express.Router();
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");
const newsController = require("../controllers/newsController");

// News routes
router.get("/news", authMiddleware, newsController.getNews);
router.post("/news", authMiddleware, verifyAdmin, newsController.createNews);
router.put("/news/:id", authMiddleware, verifyAdmin, newsController.updateNews);
router.delete("/news/:id", authMiddleware, verifyAdmin, newsController.deleteNews);

module.exports = router;
