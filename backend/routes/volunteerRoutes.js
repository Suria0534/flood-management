// const express = require('express');
// const router = express.Router();

// // Example route: get volunteer by email
// router.get('/:email', async (req, res) => {
//   const { email } = req.params;
//   try {
//     // Your database call here
//     const volunteer = await Volunteer.findOne({ email });
//     if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
//     res.json(volunteer);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// });

// module.exports = router;


// // routes/volunteerRoutes.js
// const express = require('express');
// const router = express.Router();

// // ✅ Import VolunteerInfo model
// const Volunteer = require('../models/Volunteer'); // path adjust koro jekhane schema ache

// // Example route
// router.get('/:email', async (req, res) => {
//   try {
//     const volunteer = await Volunteer.findOne({ email: req.params.email });
//     if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
//     res.json(volunteer);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;





// const express = require('express');
// const router = express.Router();
// const volunteerController = require('../controllers/VolunteerController');

// // 👉 Register
// router.post('/register', volunteerController.registerVolunteer);

// // 👉 Login
// router.post('/login', volunteerController.loginVolunteer);

// module.exports = router;




// const express = require('express');
// const router = express.Router();
// const volunteerController = require('../controllers/VolunteerController');

// // Register volunteer (with optional profilePic)
// router.post('/register', volunteerController.upload.single('profilePic'), volunteerController.registerVolunteer);

// // Login volunteer
// router.post('/login', volunteerController.loginVolunteer);

// // Get volunteer profile by email
// router.get('/email/:email', volunteerController.getProfileByEmail);

// // Update profile picture
// router.put('/profile-pic/:volunteerId', volunteerController.upload.single('profilePic'), volunteerController.updateProfilePic);

// module.exports = router;



// volunteerRoutes.js
const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/VolunteerController');

const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});
const upload = multer({ storage });
// Register volunteer (profilePic optional, update later)
router.post('/register', volunteerController.registerVolunteer);

// Login volunteer
router.post('/login', volunteerController.loginVolunteer);

// Get volunteer profile by email
router.get('/email/:email', volunteerController.getProfileByEmail);

// Update profile picture
// If you want to allow upload later, you can use multer here separately
// Corrected route with multer
router.put(
  '/profile-pic/:volunteerId',
  upload.single("profilePic"),   // <-- multer middleware
  volunteerController.updateProfilePic
);

router.post('/donate/fund', volunteerController.submitFundDonation);
router.post('/donate/material', volunteerController.submitMaterialDonation);
router.get('/donations', volunteerController.getDonationHistory);


module.exports = router;
