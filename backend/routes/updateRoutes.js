const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const updateController = require('../controllers/updateController');

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

// Routes
router.get('/', updateController.getUpdates);
router.post('/', upload.single('media'), updateController.createUpdate);

module.exports = router;
