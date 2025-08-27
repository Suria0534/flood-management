// // backend/routes/adminRoutes.js
// const express = require("express");
// const router = express.Router();
// const { authMiddleware } = require("../middleware/auth");
// const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// const Official = require("../models/Officials");
// const NGO = require("../models/NGO");
// const Victim = require("../models/Victim");
// const Volunteer = require("../models/Volunteer");
// const Resource = require("../models/Resource");
// const Donation = require("../models/Donation");
// const HelpRequest = require("../models/HelpRequest");

// // ---------------- Admin Auth ----------------

// // Register
// router.post("/register", registerAdmin);

// // Login
// router.post("/login", loginAdmin);

// // ---------------- Users Fetch ----------------
// router.get("/users", authMiddleware, async (req, res) => {
//   try {
//     const [officials, ngos, victims, volunteers] = await Promise.all([
//       Official.find({}),
//       NGO.find({}),
//       Victim.find({}),
//       Volunteer.find({})
//     ]);

//     const users = [
//       ...officials.map(u => ({ ...u._doc, role: "Official" })),
//       ...ngos.map(u => ({ ...u._doc, role: "NGO" })),
//       ...victims.map(u => ({ ...u._doc, role: "Victim" })),
//       ...volunteers.map(u => ({ ...u._doc, role: "Volunteer" })),
//     ];

//     res.json({ users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ---------------- Resources CRUD ----------------
// router.get("/resources", authMiddleware, async (req, res) => {
//   const resources = await Resource.find({});
//   res.json({ resources });
// });

// router.post("/resources", authMiddleware, async (req, res) => {
//   try {
//     const resource = await Resource.create(req.body);
//     res.status(201).json(resource);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put("/resources/:id", authMiddleware, async (req, res) => {
//   try {
//     const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete("/resources/:id", authMiddleware, async (req, res) => {
//   try {
//     await Resource.findByIdAndDelete(req.params.id);
//     res.json({ message: "Resource deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------------- Donations CRUD ----------------
// router.get("/donations", authMiddleware, async (req, res) => {
//   const donations = await Donation.find({});
//   res.json({ donations });
// });

// router.post("/donations", authMiddleware, async (req, res) => {
//   try {
//     const donation = await Donation.create(req.body);
//     res.status(201).json(donation);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put("/donations/:id", authMiddleware, async (req, res) => {
//   try {
//     const updated = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete("/donations/:id", authMiddleware, async (req, res) => {
//   try {
//     await Donation.findByIdAndDelete(req.params.id);
//     res.json({ message: "Donation deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------------- Help Requests CRUD ----------------
// router.get("/requests", authMiddleware, async (req, res) => {
//   const requests = await HelpRequest.find({});
//   res.json({ requests });
// });

// router.post("/requests", authMiddleware, async (req, res) => {
//   try {
//     const request = await HelpRequest.create(req.body);
//     res.status(201).json(request);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put("/requests/:id", authMiddleware, async (req, res) => {
//   try {
//     const updated = await HelpRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete("/requests/:id", authMiddleware, async (req, res) => {
//   try {
//     await HelpRequest.findByIdAndDelete(req.params.id);
//     res.json({ message: "Help request deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
// // Delete user by ID
// router.delete("/users/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     // Try to find the user in each collection
//     const collections = [Official, NGO, Victim, Volunteer];
//     let deleted = false;

//     for (let Col of collections) {
//       const user = await Col.findById(id);
//       if (user) {
//         await Col.findByIdAndDelete(id);
//         deleted = true;
//         break;
//       }
//     }

//     if (deleted) {
//       res.json({ message: "User deleted" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });


// module.exports = router;


// backend/routes/adminRoutes.js
// backend/routes/adminRoutes.js
// const express = require("express");
// const router = express.Router();
// const { authMiddleware } = require("../middleware/auth");
// const { registerAdmin, loginAdmin } = require("../controllers/adminController");

// const Official = require("../models/Officials");
// const NGO = require("../models/NGO");
// const Victim = require("../models/Victim");
// const Volunteer = require("../models/Volunteer");
// const Resource = require("../models/Resource");
// const Donation = require("../models/Donation");
// const HelpRequest = require("../models/HelpRequest");

// // ---------------- Admin Auth ----------------

// // Register
// router.post("/register", registerAdmin);

// // Login
// router.post("/login", loginAdmin);

// // ---------------- Users Fetch ----------------
// router.get("/users", authMiddleware, async (req, res) => {
//   try {
//     const [officials, ngos, victims, volunteers] = await Promise.all([
//       Official.find({}),
//       NGO.find({}),
//       Victim.find({}),
//       Volunteer.find({})
//     ]);

//     const users = [
//       ...officials.map(u => ({ ...u._doc, role: "Official" })),
//       ...ngos.map(u => ({ ...u._doc, role: "NGO" })),
//       ...victims.map(u => ({ ...u._doc, role: "Victim" })),
//       ...volunteers.map(u => ({ ...u._doc, role: "Volunteer" })),
//     ];

//     res.json({ users });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // ---------------- Resources CRUD ----------------
// router.get("/resources", authMiddleware, async (req, res) => {
//   const resources = await Resource.find({});
//   res.json({ resources });
// });

// router.post("/resources", authMiddleware, async (req, res) => {
//   try {
//     const resource = await Resource.create(req.body);
//     res.status(201).json(resource);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put("/resources/:id", authMiddleware, async (req, res) => {
//   try {
//     const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete("/resources/:id", authMiddleware, async (req, res) => {
//   try {
//     await Resource.findByIdAndDelete(req.params.id);
//     res.json({ message: "Resource deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------------- Donations CRUD ----------------
// router.get("/donations", authMiddleware, async (req, res) => {
//   const donations = await Donation.find({});
//   res.json({ donations });
// });

// router.post("/donations", authMiddleware, async (req, res) => {
//   try {
//     const donation = await Donation.create(req.body);
//     res.status(201).json(donation);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put("/donations/:id", authMiddleware, async (req, res) => {
//   try {
//     const updated = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete("/donations/:id", authMiddleware, async (req, res) => {
//   try {
//     await Donation.findByIdAndDelete(req.params.id);
//     res.json({ message: "Donation deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------------- Help Requests CRUD ----------------
// router.get("/requests", authMiddleware, async (req, res) => {
//   const requests = await HelpRequest.find({});
//   res.json({ requests });
// });

// router.post("/requests", authMiddleware, async (req, res) => {
//   try {
//     const request = await HelpRequest.create(req.body);
//     res.status(201).json(request);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.put("/requests/:id", authMiddleware, async (req, res) => {
//   try {
//     const updated = await HelpRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(updated);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// router.delete("/requests/:id", authMiddleware, async (req, res) => {
//   try {
//     await HelpRequest.findByIdAndDelete(req.params.id);
//     res.json({ message: "Help request deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------------- Delete User ----------------
// router.delete("/users/:id", authMiddleware, async (req, res) => {
//   try {
//     const { id } = req.params;

//     const collections = [Official, NGO, Victim, Volunteer];
//     let deleted = false;

//     for (let Col of collections) {
//       const user = await Col.findById(id);
//       if (user) {
//         await Col.findByIdAndDelete(id);
//         deleted = true;
//         break;
//       }
//     }

//     if (deleted) {
//       res.json({ message: "User deleted" });
//     } else {
//       res.status(404).json({ message: "User not found" });
//     }
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;




const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/authMiddleware.js");

const { registerAdmin, loginAdmin } = require("../controllers/adminController");

const Official = require("../models/Officials");
const NGO = require("../models/NGO");
const Victim = require("../models/Victim");
const Volunteer = require("../models/Volunteer");
const Resource = require("../models/Resource");
const Donation = require("../models/Donation");
const HelpRequest = require("../models/HelpRequest");

// ---------------- Admin Auth ----------------

// Register
router.post("/register", registerAdmin);

// Login
router.post("/login", loginAdmin);

// ---------------- Users Fetch ----------------
router.get("/users", authMiddleware, async (req, res) => {
  try {
    const [officials, ngos, victims, volunteers] = await Promise.all([
      Official.find({}),
      NGO.find({}),
      Victim.find({}),
      Volunteer.find({})
    ]);

    const users = [
      ...officials.map(u => ({ ...u._doc, role: "Official" })),
      ...ngos.map(u => ({ ...u._doc, role: "NGO" })),
      ...victims.map(u => ({ ...u._doc, role: "Victim" })),
      ...volunteers.map(u => ({ ...u._doc, role: "Volunteer" })),
    ];

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// ---------------- Resources CRUD ----------------
router.get("/resources", authMiddleware, async (req, res) => {
  const resources = await Resource.find({});
  res.json({ resources });
});

router.post("/resources", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can add resources" });
  try {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/resources/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can update resources" });
  try {
    const updated = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/resources/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can delete resources" });
  try {
    await Resource.findByIdAndDelete(req.params.id);
    res.json({ message: "Resource deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Donations CRUD ----------------
router.get("/donations", authMiddleware, async (req, res) => {
  const donations = await Donation.find({});
  res.json({ donations });
});

router.post("/donations", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can add donations" });
  try {
    const donation = await Donation.create(req.body);
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/donations/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can update donations" });
  try {
    const updated = await Donation.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/donations/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can delete donations" });
  try {
    await Donation.findByIdAndDelete(req.params.id);
    res.json({ message: "Donation deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Help Requests CRUD ----------------
router.get("/requests", authMiddleware, async (req, res) => {
  const requests = await HelpRequest.find({});
  res.json({ requests });
});

router.post("/requests", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can add requests" });
  try {
    const request = await HelpRequest.create(req.body);
    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/requests/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can update requests" });
  try {
    const updated = await HelpRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/requests/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can delete requests" });
  try {
    await HelpRequest.findByIdAndDelete(req.params.id);
    res.json({ message: "Help request deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Delete User ----------------
router.delete("/users/:id", authMiddleware, async (req, res) => {
  if (req.user.role !== "admin") return res.status(403).json({ message: "Only admin can delete users" });
  try {
    const { id } = req.params;
    const collections = [Official, NGO, Victim, Volunteer];
    let deleted = false;

    for (let Col of collections) {
      const user = await Col.findById(id);
      if (user) {
        await Col.findByIdAndDelete(id);
        deleted = true;
        break;
      }
    }

    if (deleted) res.json({ message: "User deleted" });
    else res.status(404).json({ message: "User not found" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
