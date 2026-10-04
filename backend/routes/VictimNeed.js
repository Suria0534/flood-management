const express = require('express');
const router = express.Router();
const { createVictimNeed } = require('../controllers/VictimNeedController'); // ✅ FIXED

router.post('/need', createVictimNeed); // ✅ FIXED
module.exports = router;
