// // // const Victim = require('../models/Victim');
// // // const Volunteer = require('../models/Volunteer');
// // // const NGO = require('../models/NGO');
// // // const Official = require('../models/Officials');

// // // exports.loginUser = async (req, res) => {
// // //     const { email } = req.body;
// // //     const { role } = req.params;

// // //     let Model;

// // //     switch (role) {
// // //         case 'victim':
// // //             Model = Victim;
// // //             break;
// // //         case 'volunteer':
// // //             Model = Volunteer;
// // //             break;
// // //         case 'ngo':
// // //             Model = NGO;
// // //             break;
// // //         case 'official':
// // //             Model = Official;
// // //             break;
// // //         default:
// // //             return res.status(400).json({ error: 'Invalid role' });
// // //     }

// // //     try {
// // //         const user = await Model.findOne({ email });

// // //         if (!user) {
// // //             return res.status(404).json({ exists: false, message: 'User not found' });
// // //         }

// // //         res.json({ exists: true, user });
// // //     } catch (err) {
// // //         console.error('Login error:', err);
// // //         res.status(500).json({ error: 'Server error' });
// // //     }
// // // };



// // // // controllers/loginController.js
// // // const bcrypt = require('bcrypt');
// // // const Victim = require('../models/Victim');
// // // const Volunteer = require('../models/Volunteer');
// // // const NGO = require('../models/NGO');
// // // const Official = require('../models/Officials');

// // // exports.loginUser = async (req, res) => {
// // //     const { email, password } = req.body;
// // //     const { role } = req.params;

// // //     if (!email || !password) {
// // //         return res.status(400).json({ exists: false, message: 'Email and password are required' });
// // //     }

// // //     let Model;
// // //     switch (role) {
// // //         case 'victim':
// // //             Model = Victim;
// // //             break;
// // //         case 'volunteer':
// // //             Model = Volunteer;
// // //             break;
// // //         case 'ngo':
// // //             Model = NGO;
// // //             break;
// // //         case 'official':
// // //             Model = Official;
// // //             break;
// // //         default:
// // //             return res.status(400).json({ exists: false, message: 'Invalid role' });
// // //     }

// // //     try {
// // //         const user = await Model.findOne({ email });
// // //         if (!user) {
// // //             return res.status(404).json({ exists: false, message: 'User not found' });
// // //         }

// // //         // Compare password
// // //         const isMatch = await bcrypt.compare(password, user.password);
// // //         if (!isMatch) {
// // //             return res.status(401).json({ exists: false, message: 'Incorrect password' });
// // //         }

// // //         res.json({ exists: true, user });
// // //     } catch (err) {
// // //         console.error('Login error:', err);
// // //         res.status(500).json({ exists: false, message: 'Server error' });
// // //     }
// // // };




// // const bcrypt = require('bcrypt');
// // const jwt = require('jsonwebtoken');
// // const Victim = require('../models/Victim');
// // const Volunteer = require('../models/Volunteer');
// // const NGO = require('../models/NGO');
// // const Official = require('../models/Officials');

// // const JWT_SECRET = process.env.JWT_SECRET || 'tumhar_secret_key';

// // exports.loginUser = async (req, res) => {
// //     const { email, password } = req.body;
// //     const { role } = req.params;

// //     if (!email || !password) {
// //         return res.status(400).json({ exists: false, message: 'Email and password are required' });
// //     }

// //     let Model;
// //     switch (role) {
// //         case 'victim': Model = Victim; break;
// //         case 'volunteer': Model = Volunteer; break;
// //         case 'ngo': Model = NGO; break;
// //         case 'official': Model = Official; break;
// //         default:
// //             return res.status(400).json({ exists: false, message: 'Invalid role' });
// //     }

// //     try {
// //         const user = await Model.findOne({ email });
// //         if (!user) return res.status(404).json({ exists: false, message: 'User not found' });

// //         const isMatch = await bcrypt.compare(password, user.password);
// //         if (!isMatch) return res.status(401).json({ exists: false, message: 'Incorrect password' });

// //         // Generate JWT token
// //         const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '1h' });

// //         res.json({ exists: true, email: user.email, token });
// //     } catch (err) {
// //         console.error('Login error:', err);
// //         res.status(500).json({ exists: false, message: 'Server error' });
// //     }
// // };



// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const Victim = require('../models/Victim');
// const Volunteer = require('../models/Volunteer');
// const NGO = require('../models/NGO');
// const Official = require('../models/Officials');

// const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey';

// exports.loginUser = async (req, res) => {
//     let { email, password } = req.body;
//     const { role } = req.params;

//     if (!email || !password) {
//         return res.status(400).json({ exists: false, message: 'Email and password are required' });
//     }

//     email = email.trim().toLowerCase(); // normalize email

//     let Model;
//     switch (role) {
//         case 'victim': Model = Victim; break;
//         case 'volunteer': Model = Volunteer; break;
//         case 'ngo': Model = NGO; break;
//         case 'official': Model = Official; break;
//         default:
//             return res.status(400).json({ exists: false, message: 'Invalid role' });
//     }

//     try {
//         const user = await Model.findOne({ email });
//         if (!user) return res.status(401).json({ exists: false, message: 'Invalid credentials' });

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) return res.status(401).json({ exists: false, message: 'Invalid credentials' });

//         const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '1h' });

//         res.json({ exists: true, email: user.email, token });
//     } catch (err) {
//         console.error(`Login error for role ${role}:`, err);
//         res.status(500).json({ exists: false, message: 'Server error' });
//     }
// };
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Victim = require('../models/Victim');
const Volunteer = require('../models/Volunteer');
const NGO = require('../models/NGO');
const Official = require('../models/Officials');

const JWT_SECRET = process.env.JWT_SECRET || 'mysupersecretkey';

const roleModels = { victim: Victim, volunteer: Volunteer, ngo: NGO, official: Official };

exports.loginUser = async (req, res) => {
  try {
    let { email, password } = req.body;
    const { role } = req.params;

    console.log("➡️ Login attempt:", { email, password, role });

    if (!email || !password) {
      console.log("❌ Missing email or password");
      return res.status(400).json({ exists: false, message: 'Email and password are required' });
    }

    email = email.trim().toLowerCase();
    password = password.trim();

    const Model = roleModels[role];
    if (!Model) {
      console.log("❌ Invalid role:", role);
      return res.status(400).json({ exists: false, message: 'Invalid role' });
    }

    const user = await Model.findOne({ email });
    if (!user) {
      console.log("❌ User not found in DB:", email);
      return res.status(401).json({ exists: false, message: 'Invalid credentials' });
    }

    if (!user.password) {
      console.log("⚠️ No password set for user:", email);
      return res.status(500).json({ exists: false, message: 'Password not set for this user' });
    }

    console.log("🔑 DB password hash:", user.password);
    console.log("🔑 Entered password:", password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("✅ Password match result:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ exists: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role }, JWT_SECRET, { expiresIn: '1h' });

    console.log("🎉 Login successful for:", email);

    res.json({ exists: true, email: user.email, token });
  } catch (err) {
    console.error(`💥 Login error for role ${req.params.role}:`, err);
    res.status(500).json({ exists: false, message: 'Server error' });
  }
};
