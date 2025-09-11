// // // const Update = require('../models/Update');

// // // // Fetch all updates
// // // exports.getUpdates = async (req, res) => {
// // //   try {
// // //     const updates = await Update.find().sort({ createdAt: -1 });
// // //     res.status(200).json(updates); // frontend e shob updates chole jabe
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // };

// // // // Create a new update (protected)
// // // exports.createUpdate = async (req, res) => {
// // //   try {
// // //     const { text } = req.body;
// // //     const author = req.user.name || "Anonymous"; // jwt token theke name
// // //     const media = req.file ? '/uploads/' + req.file.filename : null;

// // //     const update = new Update({ text, author, media });
// // //     await update.save();

// // //     res.status(201).json(update);
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ message: 'Server error' });
// // //   }
// // // };
// // exports.createUpdate = async (req, res) => {
// //   try {
// //     const { text, author } = req.body;
// //     let media = [];
    
// //     if (req.files) {
// //       media = req.files.map(file => '/uploads/' + file.filename);
// //     } else if (req.file) {
// //       media = ['/uploads/' + req.file.filename];
// //     }

// //     const update = new Update({ text, author, media });
// //     await update.save();

// //     res.status(201).json({ success: true, update });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ success: false, message: 'Server error' });
// //   }
// // };
// // const Update = require('../models/Update');

// // // Get all updates
// // exports.getUpdates = async (req, res) => {
// //   try {
// //     const updates = await Update.find().sort({ createdAt: -1 });
// //     res.status(200).json(updates);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };

// // // Create new update
// // exports.createUpdate = async (req, res) => {
// //   try {
// //     const { text, author } = req.body;

// //     let media = [];
// //     if (req.files && req.files.length > 0) {
// //       media = req.files.map(file => '/uploads/' + file.filename);
// //     }

// //     const update = new Update({ text, author, media });
// //     await update.save();

// //     res.status(201).json(update);
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ message: 'Server error' });
// //   }
// // };



// const Update = require('../models/Update');

// // Get all updates
// exports.getUpdates = async (req, res) => {
//   try {
//     const updates = await Update.find().sort({ createdAt: -1 });
//     res.status(200).json(updates);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

// // Create new update
// exports.createUpdate = async (req, res) => {
//   try {
//     const { text, author, role } = req.body; // <-- get role from request

//     let media = [];
//     if (req.files && req.files.length > 0) {
//       media = req.files.map(file => '/uploads/' + file.filename);
//     }

//     const update = new Update({ text, author, role, media }); // <-- save role
//     await update.save();

//     res.status(201).json(update);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
const Update = require('../models/Update');

// Get all updates
exports.getUpdates = async (req, res) => {
  try {
    const updates = await Update.find().sort({ createdAt: -1 });
    res.status(200).json(updates);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new update
exports.createUpdate = async (req, res) => {
  try {
    const { text, author, role } = req.body;

    let media = [];
    if (req.files && req.files.length > 0) {
      media = req.files.map(file => '/uploads/' + file.filename);
    }

    const update = new Update({ text, author, role, media });
    await update.save();

    res.status(201).json(update);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// ❌ Delete update (Admin only)
exports.deleteUpdate = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Update.findByIdAndDelete(id);

    if (!deleted) return res.status(404).json({ message: "Update not found" });

    res.json({ message: "Update deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

