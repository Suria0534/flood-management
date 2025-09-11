// const Victim = require('../models/Victim');
// const Volunteer = require('../models/Volunteer');
// const NGO = require('../models/NGO');
// const Official = require('../models/Officials');

// // exports.registerVictim = async (req, res) => {
// //     try {
// //         const victim = new Victim(req.body);
// //         await victim.save();
// //         res.status(201).json({ message: 'Victim registered successfully' });
// //     } catch (err) {
// //         res.status(500).json({ error: err.message });
// //     }
// // };
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

//     const newVictim = new Victim({ name, email, phone, location, needs, password });
//     await newVictim.save();

//     res.status(200).json(newVictim);
//   } catch (err) {
//     console.error('RegisterVictim Error:', err);
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.registerVolunteer = async (req, res) => {
//     try {
//         const volunteer = new Volunteer(req.body);
//         await volunteer.save();
//         res.status(201).json({ message: 'Volunteer registered successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.registerNGO = async (req, res) => {
//     try {
//         const ngo = new NGO(req.body);
//         await ngo.save();
//         res.status(201).json({ message: 'NGO registered successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// exports.registerOfficial = async (req, res) => {
//     try {
//         const official = new Official(req.body);
//         await official.save();
//         res.status(201).json({ message: 'Official registered successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };



const bcrypt = require('bcrypt');
const Victim = require('../models/Victim');
const Volunteer = require('../models/Volunteer');
const NGO = require('../models/NGO');
const Official = require('../models/Officials');

// 👉 Victim Registration
exports.registerVictim = async (req, res) => {
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

    const newVictim = new Victim({ name, email, phone, location, needs, password: hashedPassword });
    await newVictim.save();

    res.status(201).json({ message: 'Victim registered successfully', victim: newVictim });
  } catch (err) {
    console.error('RegisterVictim Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// 👉 Volunteer Registration
exports.registerVolunteer = async (req, res) => {
  try {
    const { name, email, skills, phone, password, available, location } = req.body;

    // Required fields check
    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    // Check if email already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new volunteer
    const volunteer = new Volunteer({
      name,
      email,
      skills,
      phone,
      password: hashedPassword,
      available: available === true || available === "true",
      location // save as string
    });

    await volunteer.save();

    res.status(201).json({ message: 'Volunteer registered successfully', volunteer });
  } catch (err) {
    console.error('RegisterVolunteer Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// 👉 NGO Registration
exports.registerNGO = async (req, res) => {
  try {
    const { name, email, phone, password, location } = req.body;

    // Required fields check
    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    // Check if email already exists
    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new NGO
    const ngo = new NGO({
      name,
      email,
      phone,
      password: hashedPassword,
      location
    });

    await ngo.save();

    res.status(201).json({ message: 'NGO registered successfully', ngo });
  } catch (err) {
    console.error('RegisterNGO Error:', err);
    res.status(500).json({ message: err.message });
  }
};

// 👉 Official Registration
exports.registerOfficial = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: 'Required fields missing' });

    const existingOfficial = await Official.findOne({ email });
    if (existingOfficial) return res.status(400).json({ message: 'Email already registered' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const official = new Official({ name, email, phone, password: hashedPassword });
    await official.save();

    res.status(201).json({ message: 'Official registered successfully', official });
  } catch (err) {
    console.error('RegisterOfficial Error:', err);
    res.status(500).json({ message: err.message });
  }
};
