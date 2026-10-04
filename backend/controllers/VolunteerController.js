// // const VolunteerInfo = require("../models/Volunteer");
// // const VolunteerTask = require("../models/VolunteerTaskModel");

// // // 👉 Volunteer Registration
// // exports.registerVolunteer = async (req, res) => {
// //     const { email, name, age, skills, available, latitude, longitude } = req.body;

// //     try {
// //         const volunteer = new VolunteerInfo({
//          email,
// //             name,
// //             age,
// //             skills,
// //             available,
// //             location: {
// //                 type: "Point",
// //                 coordinates: [longitude, latitude] // GeoJSON format
// //             }
// //         });

// //         await volunteer.save();
// //         res.status(201).json({ message: "Volunteer registered successfully" });
// //     } catch (err) {
// //         res.status(500).json({ error: "Error registering volunteer", details: err.message });
// //     }
// // };

// // // 👉 Fetch all volunteer emails
// // exports.getAllVolunteers = async (req, res) => {
// //     try {
// //         const volunteers = await VolunteerInfo.find({}, "email");
// //         res.json(volunteers);
// //     } catch (err) {
// //         res.status(500).json({ error: "Error fetching volunteers" });
// //     }
// // };

// // // 👉 Assign task to a volunteer
// // exports.assignTask = async (req, res) => {
// //     const { volunteerEmail, task, assignedBy } = req.body;

// //     try {
// //         const newTask = new VolunteerTask({ volunteerEmail, task, assignedBy });
// //         await newTask.save();
// //         res.status(201).json({ message: "Task assigned successfully" });
// //     } catch (err) {
// //         res.status(500).json({ error: "Error assigning task" });
// //     }
// // };

// // // 👉 Get tasks assigned to a volunteer
// // exports.getTasksByEmail = async (req, res) => {
// //     const { email } = req.params;

// //     try {
// //         const tasks = await VolunteerTask.find({ volunteerEmail: email });
// //         res.status(200).json(tasks);
// //     } catch (err) {
// //         res.status(500).json({ error: "Error fetching volunteer tasks" });
// //     }
// // };

// const Volunteer = require('../models/Volunteer');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');

// const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey';

// // ---------------- Multer setup for profilePic ----------------
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) { cb(null, 'uploads/'); },
//   filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
// });
// const upload = multer({ storage });

// // ---------------- Register Volunteer ----------------
// const registerVolunteer = async (req, res) => {
//   console.log("Register route hit");
//   try {
//     let { name, email, phone, skills, password, available, latitude, longitude } = req.body;
//     if (!name || !email || !password || latitude === undefined || longitude === undefined) {
//       return res.status(400).json({ message: 'Required fields missing' });
//     }

//     email = email.trim().toLowerCase(); // normalize email
//     const existing = await Volunteer.findOne({ email });
//     if (existing) return res.status(400).json({ message: 'Email already registered' });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const volunteer = new Volunteer({
//       name, email, phone, skills, password: hashedPassword,
//       available: available === true || available === "true",
//       location: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
//       profilePic: req.file ? req.file.filename : ''
//     });

//     await volunteer.save();
//     res.status(201).json({ message: 'Volunteer registered successfully', volunteer });
//   } catch (err) {
//     console.error('RegisterVolunteer Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Login Volunteer ----------------
// const loginVolunteer = async (req, res) => {
//   console.log("Login route hit");
//   try {
//     let { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ exists: false, message: 'Email and password required' });

//     email = email.trim().toLowerCase();
//     const volunteer = await Volunteer.findOne({ email });
//     if (!volunteer) return res.status(404).json({ exists: false, message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, volunteer.password);
//     if (!isMatch) return res.status(401).json({ exists: false, message: 'Incorrect password' });

//     const token = jwt.sign({ id: volunteer._id, role: 'volunteer' }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ exists: true, email: volunteer.email, token });
//   } catch (err) {
//     console.error('LoginVolunteer Error:', err);
//     res.status(500).json({ exists: false, message: err.message });
//   }
// };

// // ---------------- Get volunteer profile ----------------
// const getProfileByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const volunteer = await Volunteer.findOne({ email: email.trim().toLowerCase() }).select('-password');
//     if (!volunteer) return res.status(404).json({ message: 'Volunteer not found' });
//     res.json(volunteer);
//   } catch (err) {
//     console.error('GetProfileByEmail Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Update profile picture ----------------
// const updateProfilePic = async (req, res) => {
//   try {
//     const { volunteerId } = req.params;
//     if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

//     const updatedVolunteer = await Volunteer.findByIdAndUpdate(
//       volunteerId,
//       { profilePic: req.file.filename },
//       { new: true }
//     ).select('-password');

//     if (!updatedVolunteer) return res.status(404).json({ message: 'Volunteer not found' });
//     res.json(updatedVolunteer);
//   } catch (err) {
//     console.error('UpdateProfilePic Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Export ----------------
// module.exports = { registerVolunteer, loginVolunteer, getProfileByEmail, updateProfilePic, upload };



// const Volunteer = require('../models/Volunteer');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const multer = require('multer');
// const path = require('path');

// const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey';

// // ---------------- Multer setup for profilePic ----------------
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) { cb(null, 'uploads/'); },
//   filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
// });
// const upload = multer({ storage });

// // ---------------- Register Volunteer ----------------
// const registerVolunteer = async (req, res) => {
//   console.log("Register route hit");
//   try {
//     let { name, email, phone, skills, password, available, location } = req.body;

//     if (!name || !email || !password || !location) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     email = email.trim().toLowerCase();
//     const existing = await Volunteer.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already registered" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const volunteer = new Volunteer({
//       name,
//       email,
//       phone,
//       skills,
//       password: hashedPassword,
//       available: available === true || available === "true",
//       location: location,  // string hisebe save
//       profilePic: req.file ? req.file.filename : ""
//     });

//     await volunteer.save();
//     res.status(201).json({ message: "Volunteer registered successfully", volunteer });

//   } catch (err) {
//     console.error("RegisterVolunteer Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Login Volunteer ----------------
// const loginVolunteer = async (req, res) => {
//   console.log("Login route hit");
//   try {
//     let { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ exists: false, message: "Email and password required" });

//     email = email.trim().toLowerCase();
//     const volunteer = await Volunteer.findOne({ email });
//     if (!volunteer) return res.status(404).json({ exists: false, message: "User not found" });

//     const isMatch = await bcrypt.compare(password, volunteer.password);
//     if (!isMatch) return res.status(401).json({ exists: false, message: "Incorrect password" });

//     const token = jwt.sign({ id: volunteer._id, role: 'volunteer' }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ exists: true, email: volunteer.email, token });

//   } catch (err) {
//     console.error("LoginVolunteer Error:", err);
//     res.status(500).json({ exists: false, message: err.message });
//   }
// };

// // ---------------- Get volunteer profile ----------------
// const getProfileByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const volunteer = await Volunteer.findOne({ email: email.trim().toLowerCase() }).select('-password');
//     if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
//     res.json(volunteer);
//   } catch (err) {
//     console.error("GetProfileByEmail Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Update profile picture ----------------
// const updateProfilePic = async (req, res) => {
//   try {
//     const { volunteerId } = req.params;
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const updatedVolunteer = await Volunteer.findByIdAndUpdate(
//       volunteerId,
//       { profilePic: req.file.filename },
//       { new: true }
//     ).select('-password');

//     if (!updatedVolunteer) return res.status(404).json({ message: "Volunteer not found" });
//     res.json(updatedVolunteer);
//   } catch (err) {
//     console.error("UpdateProfilePic Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Export ----------------
// module.exports = { registerVolunteer, loginVolunteer, getProfileByEmail, updateProfilePic, upload };




// const Volunteer = require('../models/Volunteer');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Donation = require("../models/Donation");
// const MaterialDonation = require("../models/MaterialDonation");

// const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey';

// // ---------------- Register Volunteer ----------------
// const registerVolunteer = async (req, res) => {
//   try {
//     let { name, email, phone, skills, password, available, location } = req.body;

//     // Required fields check
//     if (!name || !email || !password || !phone || !location) {
//       return res.status(400).json({ message: "Required fields missing" });
//     }

//     email = email.trim().toLowerCase();

//     // Check if email already exists
//     const existing = await Volunteer.findOne({ email });
//     if (existing) return res.status(400).json({ message: "Email already registered" });

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create volunteer document
//     const volunteer = new Volunteer({
//       name,
//       email,
//       phone,
//       skills,
//       password: hashedPassword,
//       available: available === true || available === "true",
//       location,      // string format: "City, Area"
//       profilePic: "" // optional, can update later
//     });

//     await volunteer.save();
//     res.status(201).json({ message: "Volunteer registered successfully", volunteer });

//   } catch (err) {
//     console.error("RegisterVolunteer Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Login Volunteer ----------------
// const loginVolunteer = async (req, res) => {
//   try {
//     let { email, password } = req.body;
//     if (!email || !password) return res.status(400).json({ exists: false, message: "Email and password required" });

//     email = email.trim().toLowerCase();
//     const volunteer = await Volunteer.findOne({ email });
//     if (!volunteer) return res.status(404).json({ exists: false, message: "User not found" });

//     const isMatch = await bcrypt.compare(password, volunteer.password);
//     if (!isMatch) return res.status(401).json({ exists: false, message: "Incorrect password" });

//     const token = jwt.sign({ id: volunteer._id, role: 'volunteer' }, JWT_SECRET, { expiresIn: '1h' });
//     res.json({ exists: true, email: volunteer.email, token });

//   } catch (err) {
//     console.error("LoginVolunteer Error:", err);
//     res.status(500).json({ exists: false, message: err.message });
//   }
// };

// // ---------------- Get Volunteer Profile ----------------
// const getProfileByEmail = async (req, res) => {
//   try {
//     const { email } = req.params;
//     const volunteer = await Volunteer.findOne({ email: email.trim().toLowerCase() }).select('-password');
//     if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
//     res.json(volunteer);
//   } catch (err) {
//     console.error("GetProfileByEmail Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // ---------------- Update Profile Picture ----------------
// // Optional, can use multer here when uploading from dashboard
// const updateProfilePic = async (req, res) => {
//   try {
//     const { volunteerId } = req.params;
//     if (!req.file) return res.status(400).json({ message: "No file uploaded" });

//     const updatedVolunteer = await Volunteer.findByIdAndUpdate(
//       volunteerId,
//       { profilePic: req.file.filename },
//       { new: true }
//     ).select('-password');

//     if (!updatedVolunteer) return res.status(404).json({ message: "Volunteer not found" });
//     res.json(updatedVolunteer);
//   } catch (err) {
//     console.error("UpdateProfilePic Error:", err);
//     res.status(500).json({ message: err.message });
//   }
// };
// exports.submitFundDonation = async (req, res) => {
//   try {
//     const { donorEmail, phoneNumber, transactionId, amount } = req.body;
//     if (!donorEmail || !phoneNumber || !transactionId || !amount)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const donation = new Donation({
//       type: "fund",
//       donorName: donorEmail,
//       donorEmail,
//       phoneNumber,
//       transactionId,
//       amount
//     });

//     await donation.save();
//     res.status(201).json({ success: true, donation });
//   } catch (err) {
//     console.error("Submit Fund Donation Error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ---------------- Submit Material Donation ----------------
// exports.submitMaterialDonation = async (req, res) => {
//   try {
//     const { donorName, phone, items, collectionPlace } = req.body;
//     if (!donorName || !phone || !items || !collectionPlace)
//       return res.status(400).json({ success: false, message: "All fields required" });

//     const donation = new MaterialDonation({
//       donorName,
//       phone,
//       items,
//       collectionPlace
//     });

//     await donation.save();
//     res.status(201).json({ success: true, donation });
//   } catch (err) {
//     console.error("Submit Material Donation Error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // ---------------- Fetch Volunteer Donation History ----------------
// exports.getDonationHistory = async (req, res) => {
//   try {
//     const { donorEmail } = req.query;
//     if (!donorEmail) return res.status(400).json({ success: false, message: "donorEmail required" });

//     const fundDonations = await Donation.find({ donorEmail }).sort({ createdAt: -1 });
//     const materialDonations = await MaterialDonation.find({ donorName: donorEmail }).sort({ createdAt: -1 });

//     res.status(200).json({ fundDonations, materialDonations });
//   } catch (err) {
//     console.error("Get Donation History Error:", err);
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// module.exports = { registerVolunteer, loginVolunteer, getProfileByEmail, updateProfilePic,submitFundDonation,submitMaterialDonation,getDonationHistory };




// backend/controllers/VolunteerController.js
const Volunteer = require('../models/Volunteer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Donation = require("../models/Donation");
const MaterialDonation = require("../models/MaterialDonation");

const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey';

// ---------------- Register Volunteer ----------------
const registerVolunteer = async (req, res) => {
  try {
    let { name, email, phone, skills, password, available, location } = req.body;

    if (!name || !email || !password || !phone || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    email = email.trim().toLowerCase();

    const existing = await Volunteer.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = new Volunteer({
      name,
      email,
      phone,
      skills,
      password: hashedPassword,
      available: available === true || available === "true",
      location,
      profilePic: ""
    });

    await volunteer.save();
    res.status(201).json({ message: "Volunteer registered successfully", volunteer });

  } catch (err) {
    console.error("RegisterVolunteer Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Login Volunteer ----------------
const loginVolunteer = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ exists: false, message: "Email and password required" });

    email = email.trim().toLowerCase();
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) return res.status(404).json({ exists: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, volunteer.password);
    if (!isMatch) return res.status(401).json({ exists: false, message: "Incorrect password" });

    const token = jwt.sign({ id: volunteer._id, role: 'volunteer' }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ exists: true, email: volunteer.email, token });

  } catch (err) {
    console.error("LoginVolunteer Error:", err);
    res.status(500).json({ exists: false, message: err.message });
  }
};

// ---------------- Get Volunteer Profile ----------------
const getProfileByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const volunteer = await Volunteer.findOne({ email: email.trim().toLowerCase() }).select('-password');
    if (!volunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json(volunteer);
  } catch (err) {
    console.error("GetProfileByEmail Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Update Profile Picture ----------------
const updateProfilePic = async (req, res) => {
  try {
    const { volunteerId } = req.params;
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const updatedVolunteer = await Volunteer.findByIdAndUpdate(
      volunteerId,
      { profilePic: req.file.filename },
      { new: true }
    ).select('-password');

    if (!updatedVolunteer) return res.status(404).json({ message: "Volunteer not found" });
    res.json(updatedVolunteer);
  } catch (err) {
    console.error("UpdateProfilePic Error:", err);
    res.status(500).json({ message: err.message });
  }
};

// ---------------- Submit Fund Donation ----------------
const submitFundDonation = async (req, res) => {
  try {
    const { donorEmail, phoneNumber, transactionId, amount } = req.body;
    if (!donorEmail || !phoneNumber || !transactionId || !amount)
      return res.status(400).json({ success: false, message: "All fields required" });

    const donation = new Donation({
      type: "fund",
      donorName: donorEmail,
      donorEmail,
      phoneNumber,
      transactionId,
      amount
    });

    await donation.save();
    res.status(201).json({ success: true, donation });
  } catch (err) {
    console.error("Submit Fund Donation Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Submit Material Donation ----------------
const submitMaterialDonation = async (req, res) => {
  try {
    const { donorName, phone, items, collectionPlace } = req.body;
    if (!donorName || !phone || !items || !collectionPlace)
      return res.status(400).json({ success: false, message: "All fields required" });

    const donation = new MaterialDonation({
      donorName,
      phone,
      items,
      collectionPlace
    });

    await donation.save();
    res.status(201).json({ success: true, donation });
  } catch (err) {
    console.error("Submit Material Donation Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ---------------- Get Volunteer Donation History ----------------
const getDonationHistory = async (req, res) => {
  try {
    const { donorEmail } = req.query;
    if (!donorEmail) return res.status(400).json({ success: false, message: "donorEmail required" });

    const fundDonations = await Donation.find({ donorEmail }).sort({ createdAt: -1 });
    const materialDonations = await MaterialDonation.find({ donorName: donorEmail }).sort({ createdAt: -1 });

    res.status(200).json({ fundDonations, materialDonations });
  } catch (err) {
    console.error("Get Donation History Error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

module.exports = {
  registerVolunteer,
  loginVolunteer,
  getProfileByEmail,
  updateProfilePic,
  submitFundDonation,
  submitMaterialDonation,
  getDonationHistory
};
