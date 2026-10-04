
// // server.js
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");
// const http = require("http");
// const { Server } = require("socket.io");
// dotenv.config();

// const connectDB = require("./config/db");
// const ChatMessage = require("./models/CommunityChat");

// // Import Routes
// const registerRoutes = require("./routes/registerRoutes");
// const victimRoutes = require("./routes/VictimNeed");
// const victimProfileRoutes = require("./routes/victim");

// const volunteerRoutes = require("./routes/volunteerRoutes");
// const loginRoutes = require("./routes/loginRoutes");
// const donationRoutes = require("./routes/donationRoutes");
// const materialDonationRoutes = require("./routes/materialDonationRoutes");
// const updateRoutes = require("./routes/updateRoutes");
// const shelterRoutes = require("./routes/shelterRoutes");
// const resourceRoutes = require("./routes/resourceRoutes");
// const adminRoutes = require("./routes/adminRoutes");
// const helpRequestRoutes = require("./routes/helpRequestRoutes");
// const communityChatRoutes = require("./routes/communityChatRoutes");// const adminShelterRoutes = require("./routes/adminShelterRoutes");
// const newsRoutes = require("./routes/newsRoutes");
// const app = express();
// const server = http.createServer(app);

// // Connect to DB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Static uploads folder
// app.use("/uploads", express.static("uploads"));

// // Routes
// app.use("/api", registerRoutes);
// app.use("/api/victim", victimRoutes);
// app.use("/api/victim", victimProfileRoutes);
// app.use("/api/volunteer", volunteerRoutes);
// app.use("/api", loginRoutes);
// app.use("/api/donations", donationRoutes);
// app.use("/api/material-donations", materialDonationRoutes);
// app.use("/api/updates", updateRoutes);
// app.use("/api/shelters", shelterRoutes);
// app.use("/api/resources", resourceRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/help-request", helpRequestRoutes);
// app.use("/api/chat", communityChatRoutes);// app.use("/api/admin/shelters", adminShelterRoutes);
// app.use("/api/news", newsRoutes);

// // Socket.IO setup
// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);

//   socket.on("join", (room) => {
//     socket.join(room);
//     console.log(`Socket ${socket.id} joined room: ${room}`);
//   });

//   socket.on("sendMessage", async (msg) => {
//     const { room, sender, message } = msg;

//     // Save message to DB
//     const newMsg = new ChatMessage({ room, sender, message });
//     await newMsg.save();

//     // Broadcast to room
//     io.to(room).emit("receiveMessage", newMsg);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected:", socket.id);
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => console.log(`Server running on port ${PORT}`));







// server.js
// dotenv.config();
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
// const dotenv = require("dotenv");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
// dotenv.config();

const connectDB = require("./config/db");
const ChatMessage = require("./models/CommunityChat");

// Import Routes
const registerRoutes = require("./routes/registerRoutes");
const victimRoutes = require("./routes/VictimNeed");
const victimProfileRoutes = require("./routes/victim");
const volunteerRoutes = require("./routes/volunteerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const donationRoutes = require("./routes/donationRoutes");
const materialDonationRoutes = require("./routes/materialDonationRoutes");
const updateRoutes = require("./routes/updateRoutes");
const shelterRoutes = require("./routes/shelterRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const helpRequestRoutes = require("./routes/helpRequestRoutes");
const communityChatRoutes = require("./routes/communityChatRoutes");
const ngoRoutes = require("./routes/ngoRoutes");
// const newsRoutes = require("./routes/newsRoutes");
const newsRoutes = require("./routes/newsRoutes");
const weatherRoutes = require("./routes/weatherRoutes");
const announcementsRoutes = require("./routes/announcements");
const matchingRoutes = require("./routes/matchingRoutes");
const app = express();
const server = http.createServer(app);

// Middleware
const configuredOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) => origin.trim())
  : [];
const allowedOrigins = configuredOrigins.filter((origin) => !origin.includes("your-frontend-domain.example"));
const corsOrigin = (origin, callback) => {
  if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
    return callback(null, true);
  }
  return callback(new Error("CORS origin is not allowed"));
};
app.use(cors({ origin: corsOrigin }));
app.use(express.json());

// Static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/health", (req, res) => res.json({ status: "ok" }));

// Routes with fixed paths
app.use("/api", registerRoutes);
app.use("/api/victim/needs", victimRoutes);          // Victim needs
app.use("/api/victim", victimProfileRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api", loginRoutes);
app.use("/api/donations/fund", donationRoutes);
app.use("/api/donations/material", materialDonationRoutes);
app.use("/api/updates", updateRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/help-request", helpRequestRoutes);
app.use("/api/chat", communityChatRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/announcements", announcementsRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/ngo", ngoRoutes);

// Socket.IO setup
const io = new Server(server, {
  cors: { origin: corsOrigin, methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (room) => {
    socket.join(room);
    console.log(`Socket ${socket.id} joined room: ${room}`);
  });

  socket.on("sendMessage", async (msg) => {
    const { room, sender, message } = msg;
    try {
      const newMsg = new ChatMessage({ room, sender, message });
      await newMsg.save();
      io.to(room).emit("receiveMessage", newMsg);
    } catch (err) {
      console.error("Error saving chat message:", err.message);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Server startup aborted because MongoDB is unavailable.");
    process.exitCode = 1;
  }
};

startServer();
