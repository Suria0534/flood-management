const express = require("express");
const router = express.Router();
const { getMessages, sendMessage } = require("../controllers/communityChatController");

// GET all messages
router.get("/messages", getMessages);

// POST a new message
router.post("/messages", sendMessage);

module.exports = router;
