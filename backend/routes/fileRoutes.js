// routes/fileRoutes.js
const express = require("express");
const router = express.Router();
const fileController = require("../controllers/fileController");

// File upload route (POST)
router.post("/upload", fileController.upload, fileController.uploadFile);

// Retrieve file route (GET)
router.get("/retrieve/:code", fileController.retrieveFile);

// Text sharing route (POST)
router.post("/share-text", fileController.shareText);

// Retrieve text route (GET)
router.get("/retrieve-text/:code", fileController.retrieveText);
// routes/fileRoutes.js
router.get("/download/:code", fileController.downloadFile);


module.exports = router;
