// // const CommunityChat = require("../models/CommunityChat");

// // // Send message
// // exports.sendMessage = async (req, res) => {
// //   try {
// //     const { senderName, senderEmail, senderPhone, senderLocation, message } = req.body;

// //     if (!senderName || !message) {
// //       return res.status(400).json({ success: false, message: "Missing sender or message" });
// //     }

// //     const chat = new CommunityChat({
// //       senderName,
// //       senderEmail,
// //       senderPhone,
// //       senderLocation,
// //       message,
// //     });

// //     await chat.save();
// //     res.status(201).json({ success: true, chat });
// //   } catch (err) {
// //     res.status(500).json({ success: false, error: err.message });
// //   }
// // };

// // // Get all messages
// // exports.getMessages = async (req, res) => {
// //   try {
// //     const chats = await CommunityChat.find().sort({ createdAt: 1 });
// //     res.status(200).json({ success: true, chats });
// //   } catch (err) {
// //     res.status(500).json({ success: false, error: err.message });
// //   }
// // };



// const CommunityChat = require("../models/CommunityChat");

// // -----------------------------
// // Send a message
// // -----------------------------
// exports.sendMessage = async (req, res) => {
//   try {
//     const {
//       senderName,
//       senderEmail,
//       senderPhone,
//       senderLocation,
//       message,
//       role,
//     } = req.body;

//     // Validation
//     if (!senderName || !message) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Missing senderName or message" });
//     }

//     // Create chat message
//     const chat = new CommunityChat({
//       senderName,
//       senderEmail,
//       senderPhone,
//       senderLocation,
//       role: role || "User", // default role if not provided
//       message,
//     });

//     await chat.save();
//     res.status(201).json({ success: true, chat });
//   } catch (err) {
//     console.error("Error in sendMessage:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

// // -----------------------------
// // Get all messages
// // -----------------------------
// exports.getMessages = async (req, res) => {
//   try {
//     // Sort by creation time ascending
//     const chats = await CommunityChat.find().sort({ createdAt: 1 });
//     res.status(200).json({ success: true, chats });
//   } catch (err) {
//     console.error("Error in getMessages:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };



const CommunityChat = require("../models/CommunityChat");

// -----------------------------
// Send a message
// -----------------------------
exports.sendMessage = async (req, res) => {
  try {
    const { senderName, senderEmail, senderPhone, locationName, message, role } = req.body;

    // Validation
    if (!senderName || !message) {
      return res
        .status(400)
        .json({ success: false, message: "Missing senderName or message" });
    }

    // Create chat message
    const chat = new CommunityChat({
      senderName,
      senderEmail: senderEmail || "N/A",
      senderPhone: senderPhone || "N/A",
      senderLocation: locationName || "N/A", // store location as string
      role: role || "User",
      message,
    });

    await chat.save();
    res.status(201).json({ success: true, chat });
  } catch (err) {
    console.error("Error in sendMessage:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

// -----------------------------
// Get all messages
// -----------------------------
exports.getMessages = async (req, res) => {
  try {
    const chats = await CommunityChat.find().sort({ createdAt: 1 });
    res.status(200).json({ success: true, chats });
  } catch (err) {
    console.error("Error in getMessages:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};
