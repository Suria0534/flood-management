


// const express = require("express");
// const router = express.Router();
// const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");

// // Controllers / Models
// const { registerAdmin, loginAdmin } = require("../controllers/adminController");
// const Official = require("../models/Officials");
// const NGO = require("../models/NGO");
// const Victim = require("../models/Victim");
// const Volunteer = require("../models/Volunteer");
// const Resource = require("../models/Resource");
// const FundDonation = require("../models/Donation");
// const MaterialDonation = require("../models/MaterialDonation");
// const HelpRequest = require("../models/HelpRequest");
// const Shelter = require("../models/Shelter");
// const newsController = require("../controllers/newsController");

// // ---------------- Admin Auth ----------------
// router.post("/register", registerAdmin);
// router.post("/login", loginAdmin);

// // ---------------- Users Fetch ----------------
// router.get("/users", authMiddleware, verifyAdmin, async (req, res) => {
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

// // ---------------- Generic CRUD Function ----------------
// const createAdminCRUD = (model, name) => {
//   // Get all
//   router.get(`/${name}`, authMiddleware, verifyAdmin, async (req, res) => {
//     try {
//       const items = await model.find();
//       res.json(items);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // Add new
//   router.post(`/${name}`, authMiddleware, verifyAdmin, async (req, res) => {
//     try {
//       const newItem = await model.create(req.body);
//       res.status(201).json(newItem);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // Update
//   router.put(`/${name}/:id`, authMiddleware, verifyAdmin, async (req, res) => {
//     try {
//       const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
//       if (!updatedItem) return res.status(404).json({ message: `${name.slice(0, -1)} not found` });
//       res.json(updatedItem);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });

//   // Delete
//   router.delete(`/${name}/:id`, authMiddleware, verifyAdmin, async (req, res) => {
//     try {
//       const deletedItem = await model.findByIdAndDelete(req.params.id);
//       if (!deletedItem) return res.status(404).json({ message: `${name.slice(0, -1)} not found` });
//       res.json({ message: `${name.slice(0, -1)} deleted successfully` });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
// };

// // ---------------- Admin-only CRUD ----------------
// createAdminCRUD(Resource, "resources");
// createAdminCRUD(FundDonation, "fund-donations");
// createAdminCRUD(MaterialDonation, "material-donations");
// createAdminCRUD(HelpRequest, "requests");
// createAdminCRUD(Shelter, "shelters");

// // ---------------- Delete User ----------------
// router.delete("/users/:id", authMiddleware, verifyAdmin, async (req, res) => {
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

//     if (deleted) res.json({ message: "User deleted" });
//     else res.status(404).json({ message: "User not found" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;





const express = require("express");
const router = express.Router();
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");

// Controllers
const { registerAdmin, loginAdmin } = require("../controllers/adminController");
const newsController = require("../controllers/newsController");

// Models
const Official = require("../models/Officials");
const NGO = require("../models/NGO");
const Victim = require("../models/Victim");
const Volunteer = require("../models/Volunteer");
const Resource = require("../models/Resource");
const FundDonation = require("../models/Donation");
const MaterialDonation = require("../models/MaterialDonation");
const HelpRequest = require("../models/HelpRequest");
const Shelter = require("../models/Shelter");

// ---------------- Admin Auth ----------------
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// ---------------- News Routes ----------------
router.get("/news", authMiddleware, newsController.getNews);
router.post("/news", authMiddleware, verifyAdmin, newsController.createNews);
router.put("/news/:id", authMiddleware, verifyAdmin, newsController.updateNews);
router.delete("/news/:id", authMiddleware, verifyAdmin, newsController.deleteNews);

// ---------------- Users Fetch ----------------
router.get("/users", authMiddleware, verifyAdmin, async (req, res) => {
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
    res.status(500).json({ message: err.message });
  }
});

// ---------------- Generic CRUD Function ----------------
const createAdminCRUD = (model, name) => {
  router.get(`/${name}`, authMiddleware, verifyAdmin, async (req, res) => {
    try {
      const items = await model.find();
      res.json(items);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.post(`/${name}`, authMiddleware, verifyAdmin, async (req, res) => {
    try {
      const newItem = await model.create(req.body);
      res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.put(`/${name}/:id`, authMiddleware, verifyAdmin, async (req, res) => {
    try {
      const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updatedItem) return res.status(404).json({ message: `${name.slice(0, -1)} not found` });
      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  router.delete(`/${name}/:id`, authMiddleware, verifyAdmin, async (req, res) => {
    try {
      const deletedItem = await model.findByIdAndDelete(req.params.id);
      if (!deletedItem) return res.status(404).json({ message: `${name.slice(0, -1)} not found` });
      res.json({ message: `${name.slice(0, -1)} deleted successfully` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

// ---------------- Admin-only CRUD ----------------
createAdminCRUD(Resource, "resources");
createAdminCRUD(FundDonation, "fund-donations");
createAdminCRUD(MaterialDonation, "material-donations");
createAdminCRUD(HelpRequest, "requests");
createAdminCRUD(Shelter, "shelters");

// ---------------- Delete User ----------------
router.delete("/users/:id", authMiddleware, verifyAdmin, async (req, res) => {
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
