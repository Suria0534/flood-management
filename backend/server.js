const express = require('express');
const connectDB = require('./config/db');
const registerRoutes = require('./routes/registerRoutes');
const victimRoutes = require('./routes/victim');
const volunteerRoutes = require('./routes/volunteerRoutes')
const loginRoutes = require('./routes/loginRoutes');
const cors = require('cors');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', registerRoutes);
app.use('/api/victim', victimRoutes);
app.use("/api", volunteerRoutes);
app.use('/api', loginRoutes); 
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
