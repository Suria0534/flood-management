// const express = require("express");
// const router = express.Router();
// const victimController = require("../controllers/victimController");

// // Register
// // router.post("/register", victimController.registerVictim);

// // Login (email only)
// // router.post("/login", victimController.loginVictim);

// // Get profile by email
// router.get("/:email", victimController.getProfileByEmail);

// module.exports = router;





// // // backend/routes/victim.js
// // const express = require('express');
// // const router = express.Router();
// // const Victim = require('../models/Victim');

// // // GET victim by email
// // router.get('/email/:email', async (req, res) => {
// //   try {
// //     const victim = await Victim.findOne({ email: req.params.email });
// //     if (!victim) return res.status(404).json({ message: 'Victim not found' });
// //     res.json(victim);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // });

// // module.exports = router;




const express = require('express');
const router = express.Router();
const victimController = require('../controllers/victimController');

// Register victim with optional profile picture
router.post(
  '/register',
  victimController.upload.single('profilePic'),
  victimController.registerVictim
);

// Get victim profile by email
router.get('/email/:email', victimController.getProfileByEmail);

// Update profile picture after registration
router.put(
  '/profile-pic/:victimId',
  victimController.upload.single('profilePic'),
  victimController.updateProfilePic
);

module.exports = router;







// const express = require("express");
// const router = express.Router();
// const { registerVictim, getProfileByEmail } = require("../controllers/victimController");

// // Register victim
// router.post("/victim", registerVictim);

// // Get profile by email
// router.get("/victim/email/:email", getProfileByEmail);

// module.exports = router;
