const express = require("express");
const dotenv = require("dotenv");
const fileRoutes = require("./routes/fileRoutes");
const cors = require('cors');

// Load environment variables
dotenv.config();

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
  res.status(200).send("Jai Shri Ram ji");
});


// Export the app for Vercel serverless deployment
module.exports = app;
