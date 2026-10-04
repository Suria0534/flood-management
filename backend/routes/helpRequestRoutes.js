// // const express = require("express");
// // const router = express.Router();
// // const { createHelpRequest, matchVolunteers } = require("../controllers/helpRequestController");

// // // Submit a help request
// // router.post("/request", createHelpRequest);

// // // Get matched volunteers
// // router.get("/match", matchVolunteers);

// // module.exports = router;



// const express = require('express');
// const router = express.Router();
// const { createHelpRequest } = require('../controllers/helpRequestController'); // Import the controller

// // POST route for submitting help requests
// router.post('/api/help-request/request', createHelpRequest); // Route to create help request and assign volunteer

// module.exports = router;



const express = require('express');
const router = express.Router();
const { createHelpRequest } = require('../controllers/helpRequestController');

// POST route for submitting help requests
router.post('/request', createHelpRequest);

module.exports = router;
