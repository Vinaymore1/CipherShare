// app.js
const express = require("express");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoutes");

dotenv.config(); // Load environment variables
const cors = require('cors');



const app = express();

// Middleware to handle JSON requests
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:4173', // Replace this with your frontend URL
    methods: 'POST, GET, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
}));

// Use file routes
app.use("/api/files", fileRoutes);
app.get("/", (req, res) => {
  res.send("Jai Shri Ram ji");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
