require("dotenv").config();
const mongoose = require("mongoose");
const Admin = require("./models/Admin"); // Admin model path ঠিক করুন

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const username = "admin1";
    const password = "admin123"; // plain password

    const exist = await Admin.findOne({ username });
    if (exist) {
      console.log("Admin already exists");
      process.exit();
    }

    const admin = await Admin.create({ username, password });
    console.log("Admin created successfully:", admin);
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

createAdmin();
