// server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = require("./config/db");

// Import Routes
const registerRoutes = require("./routes/registerRoutes");
const victimRoutes = require("./routes/victim");
const volunteerRoutes = require("./routes/volunteerRoutes");
const loginRoutes = require("./routes/loginRoutes");
const donationRoutes = require("./routes/donationRoutes");
const materialDonationRoutes = require("./routes/materialDonationRoutes");
const updateRoutes = require("./routes/updateRoutes");
const shelterRoutes = require("./routes/shelterRoutes");
const resourceRoutes = require("./routes/resourceRoutes");
const adminRoutes = require("./routes/adminRoutes");
const helpRequestRoutes = require("./routes/helpRequestRoutes");
// app.use("/api/matching", helpRequestRoutes);
const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use("/api", registerRoutes);
app.use("/api/victim", victimRoutes);
app.use("/api/volunteer", volunteerRoutes);
app.use("/api", loginRoutes);
app.use("/api/donations", donationRoutes);
app.use("/api/material-donations", materialDonationRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/updates", updateRoutes);
app.use("/api/shelters", shelterRoutes);
app.use("/api/resources", resourceRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/help-request", helpRequestRoutes);

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
