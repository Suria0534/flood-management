// const Victim = require('../models/Victim');

// // Get victim profile by email
// exports.getProfileByEmail = async (req, res) => {
//     const { email } = req.params;
//     try {
//         const user = await Victim.findOne({ email });
//         if (!user) {
//             return res.status(404).json({ message: "Victim not found" });
//         }
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: "Server error" });
//     }
// };



// const Victim = require('../models/Victim');
// const bcrypt = require('bcrypt');
// const multer = require('multer');
// const path = require('path');

// // ---------------- Multer setup for profilePic ----------------
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // folder where images will be saved
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // unique filename
//   }
// });

// const upload = multer({ storage });

// // ---------------- Register Victim ----------------
// exports.registerVictim = async (req, res) => {
//   try {
//     const { name, email, phone, location, needs, password } = req.body;

//     if (!name || !email || !phone || !location || !password) {
//       return res.status(400).json({ message: 'All required fields must be filled' });
//     }

//     const existingVictim = await Victim.findOne({ email });
//     if (existingVictim) {
//       return res.status(400).json({ message: 'Email already registered' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Handle profilePic
//     const profilePic = req.file ? req.file.filename : '';

//     const newVictim = new Victim({
//       name,
//       email,
//       phone,
//       location,
//       needs,
//       password: hashedPassword,
//       profilePic
//     });

//     await newVictim.save();

//     res.status(200).json(newVictim);
//   } catch (err) {
//     console.error('RegisterVictim Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Get victim profile by email ----------------
// exports.getProfileByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const victim = await Victim.findOne({ email }).select('-password'); // exclude password
//     if (!victim) {
//       return res.status(404).json({ message: 'Victim not found' });
//     }
//     res.json(victim);
//   } catch (err) {
//     console.error('GetProfileByEmail Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Update profile picture ----------------
// exports.updateProfilePic = async (req, res) => {
//   try {
//     const { victimId } = req.params;

//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded" });
//     }

//     const updatedVictim = await Victim.findByIdAndUpdate(
//       victimId,
//       { profilePic: req.file.filename },
//       { new: true }
//     ).select('-password');

//     if (!updatedVictim) {
//       return res.status(404).json({ message: "Victim not found" });
//     }

//     res.json(updatedVictim);
//   } catch (err) {
//     console.error("UpdateProfilePic Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Export upload middleware for routes ----------------
const Victim = require('../models/Victim');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');

// ---------------- Multer setup for profilePic ----------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // folder where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  }
});

const upload = multer({ storage });

// ---------------- Register Victim ----------------
const registerVictim = async (req, res) => {
  try {
    const { name, email, phone, location, needs, password } = req.body;

    if (!name || !email || !phone || !location || !password) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const existingVictim = await Victim.findOne({ email });
    if (existingVictim) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePic = req.file ? req.file.filename : '';

    const newVictim = new Victim({
      name,
      email,
      phone,
      location,
      needs,
      password: hashedPassword,
      profilePic
    });

    await newVictim.save();
    res.status(201).json({ message: 'Victim registered successfully', victim: newVictim });
  } catch (err) {
    console.error('RegisterVictim Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Get victim profile by email ----------------
const getProfileByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const victim = await Victim.findOne({ email }).select('-password');
    if (!victim) return res.status(404).json({ message: 'Victim not found' });
    res.json(victim);
  } catch (err) {
    console.error('GetProfileByEmail Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Update profile picture ----------------
const updateProfilePic = async (req, res) => {
  try {
    const { victimId } = req.params;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const updatedVictim = await Victim.findByIdAndUpdate(
      victimId,
      { profilePic: req.file.filename },
      { new: true }
    ).select('-password');

    if (!updatedVictim) return res.status(404).json({ message: "Victim not found" });

    res.json(updatedVictim);
  } catch (err) {
    console.error("UpdateProfilePic Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Export everything ----------------
module.exports = {
  registerVictim,
  getProfileByEmail,
  updateProfilePic,
  upload
};
