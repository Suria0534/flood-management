// // Add new resource (Only Admin)
// exports.addResource = async (req, res) => {
//   try {
//     const { name, type, totalQuantity, sentQuantity, sentTo } = req.body;

//     if (!name || !type || !totalQuantity) {
//       return res.status(400).json({ success: false, message: "Required fields missing" });
//     }

//     // ✅ Only allow Admin
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Only admin can add resources" });
//     }

//     const resource = new Resource({
//       name,
//       type,
//       totalQuantity,
//       sentQuantity: sentQuantity || 0,
//       sentTo: sentTo || ""
//     });

//     await resource.save();
//     res.status(201).json({ success: true, message: "Resource added successfully", resource });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Get all resources (Everyone)
// exports.getResources = async (req, res) => {
//   try {
//     const resources = await Resource.find();
//     res.status(200).json({ success: true, resources });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };

// // Delete resource (Only Admin)
// exports.deleteResource = async (req, res) => {
//   try {
//     if (req.user.role !== "admin") {
//       return res.status(403).json({ success: false, message: "Only admin can delete resources" });
//     }

//     await Resource.findByIdAndDelete(req.params.id);
//     res.status(200).json({ success: true, message: "Resource deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ success: false, message: "Server error" });
//   }
// };


const Resource = require("../models/Resource");

// Add new resource (Only Admin)
exports.addResource = async (req, res) => {
  try {
    const { name, type, totalQuantity, sentQuantity, sentTo } = req.body;

    if (!name || !type || totalQuantity == null) {
      return res.status(400).json({ success: false, message: "Required fields missing" });
    }

    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only admin can add resources" });
    }

    const resource = new Resource({
      name,
      type,
      totalQuantity: parseInt(totalQuantity),
      sentQuantity: parseInt(sentQuantity) || 0,
      sentTo: sentTo || ""
    });

    await resource.save();
    res.status(201).json({ success: true, message: "Resource added successfully", resource });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all resources (Everyone)
exports.getResources = async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({ success: true, resources });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Delete resource (Only Admin)
exports.deleteResource = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Only admin can delete resources" });
    }

    await Resource.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: "Resource deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
