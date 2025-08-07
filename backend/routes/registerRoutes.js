const express = require('express');
const router = express.Router();
const {
    registerVictim,
    registerVolunteer,
    registerNGO,
    registerOfficial,
} = require('../controllers/registerController');

router.post('/register/victim', registerVictim);
router.post('/register/volunteer', registerVolunteer);
router.post('/register/ngo', registerNGO);
router.post('/register/official', registerOfficial);

module.exports = router;
