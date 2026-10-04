// // const express = require("express");
// // const router = express.Router();
// // const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");
// // const Shelter = require("../models/Shelter");

// // // ---------------- Generic Admin CRUD for Shelter ----------------
// // const createAdminCRUD = (model, name) => {
// //   // Get all
// //   router.get(`/${name}`, authMiddleware, verifyAdmin, async (req, res) => {
// //     try {
// //       const items = await model.find();
// //       res.json(items);
// //     } catch (err) {
// //       res.status(500).json({ message: err.message });
// //     }
// //   });

// //   // Add new
// //   router.post(`/${name}`, authMiddleware, verifyAdmin, async (req, res) => {
// //     try {
// //       const newItem = await model.create(req.body);
// //       res.status(201).json(newItem);
// //     } catch (err) {
// //       res.status(500).json({ message: err.message });
// //     }
// //   });

// //   // Update
// //   router.put(`/${name}/:id`, authMiddleware, verifyAdmin, async (req, res) => {
// //     try {
// //       const updatedItem = await model.findByIdAndUpdate(req.params.id, req.body, { new: true });
// //       if (!updatedItem) return res.status(404).json({ message: `${name.slice(0, -1)} not found` });
// //       res.json(updatedItem);
// //     } catch (err) {
// //       res.status(500).json({ message: err.message });
// //     }
// //   });

// //   // Delete
// //   router.delete(`/${name}/:id`, authMiddleware, verifyAdmin, async (req, res) => {
// //     try {
// //       const deletedItem = await model.findByIdAndDelete(req.params.id);
// //       if (!deletedItem) return res.status(404).json({ message: `${name.slice(0, -1)} not found` });
// //       res.json({ message: `${name.slice(0, -1)} deleted successfully` });
// //     } catch (err) {
// //       res.status(500).json({ message: err.message });
// //     }
// //   });
// // };

// // // ---------------- Shelter CRUD ----------------
// // createAdminCRUD(Shelter, "shelters");

// // module.exports = router;





// const express = require("express");
// const router = express.Router();
// const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");
// const Shelter = require("../models/Shelter");

// // ---------------- Public Routes ----------------

// // সব shelter দেখাবে (কেউ দেখতে পারবে)
// router.get("/shelters", async (req, res) => {
//   try {
//     const shelters = await Shelter.find();
//     res.json(shelters);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // ---------------- Admin CRUD Routes ----------------
// const createAdminCRUD = (model, name) => {
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

// // ---------------- Apply Shelter CRUD ----------------
// createAdminCRUD(Shelter, "shelters");

// module.exports = router;




const express = require("express");
const router = express.Router();
const { authMiddleware, verifyAdmin } = require("../middleware/authMiddleware");
const { getShelters, addShelter, updateShelter, deleteShelter } = require("../controllers/shelterController");

// ---------------- Public Route ----------------
// shelterRoutes.js
router.get("/", getShelters); // এখন /api/shelters GET
router.post("/", authMiddleware, verifyAdmin, addShelter);
router.put("/:id", authMiddleware, verifyAdmin, updateShelter);
router.delete("/:id", authMiddleware, verifyAdmin, deleteShelter);

module.exports = router;

