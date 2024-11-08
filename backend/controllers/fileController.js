// controllers/fileController.js
const { containerClient, generateSASUrl } = require("../config/azureBlobConfig");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");


// Set up Multer for file uploads (memory storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Helper function to generate random 4 or 6 digit code
function generateCode(digits = 6) {
  const min = Math.pow(10, digits - 1);
  const max = Math.pow(10, digits) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Upload file to Azure Blob Storage
exports.uploadFile = async (req, res) => {
  const file = req.file;
  const code = generateCode(6); // Generate a 6-digit code for the file
  const blobName = `${code}-${file.originalname}`; // Create a unique blob name

  try {
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file to Azure Blob Storage
    await blockBlobClient.uploadData(file.buffer, {
      blobHTTPHeaders: { blobContentType: file.mimetype },
    });

    // Generate a SAS URL for accessing the file
    const sasUrl = generateSASUrl(blobName);

    // Schedule file deletion after 1 hour (60 minutes)
    setTimeout(async () => {
      await blockBlobClient.delete();
      console.log(`File ${blobName} deleted after 1 hour`);
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    // Respond with the code and SAS URL
    res.json({ code, url: sasUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to upload file" });
  }
};

// Retrieve file from Azure Blob Storage by code
// controllers/fileController.js

exports.retrieveFile = async (req, res) => {
    const { code } = req.params;
  
    try {
      // List all blobs in the container to find the blob with the matching code
      const blobs = containerClient.listBlobsFlat();
      let blobName = null;
  
      for await (const blob of blobs) {
        if (blob.name.startsWith(`${code}-`)) {
          blobName = blob.name;
          break;
        }
      }
  
      if (!blobName) {
        return res.status(404).json({ error: "File not found" });
      }
  
      // Instead of returning SAS URL, provide a download route
      const downloadUrl = `https://${req.get("host")}/api/files/download/${code}`;

      
      res.json({ code, downloadUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve file" });
    }
  };
  
// exports.retrieveFile = async (req, res) => {
//   const { code } = req.params;

//   try {
//     // List all blobs in the container
//     const blobs = containerClient.listBlobsFlat();

//     // Search for the blob with the matching code
//     for await (const blob of blobs) {
//       if (blob.name.startsWith(`${code}-`)) {
//         // Generate the SAS URL for the found blob
//         const sasUrl = generateSASUrl(blob.name);
//         return res.json({ url: sasUrl });
//       }
//     }

//     res.status(404).json({ error: "File not found" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve file" });
//   }
// };

// Text-sharing logic

exports.shareText = async (req, res) => {
  const text = req.body.text;
  const code = generateCode(4); // Generate a 4-digit code for text sharing

  try {
    const blobName = `${code}-text.txt`;

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the text content to Azure Blob Storage
    await blockBlobClient.uploadData(Buffer.from(text), {
      blobHTTPHeaders: { blobContentType: "text/plain" },
    });

    // Generate a SAS URL for accessing the text file
    const sasUrl = generateSASUrl(blobName);

    // Schedule text file deletion after 1 hour (60 minutes)
    setTimeout(async () => {
      await blockBlobClient.delete();
      console.log(`Text ${blobName} deleted after 1 hour`);
    }, 60 * 60 * 1000); // 1 hour in milliseconds

    // Respond with the code and SAS URL for the text
    res.json({ code, url: sasUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to share text" });
  }
};

// Retrieve shared text by code
// controllers/fileController.js

exports.retrieveText = async (req, res) => {
    const { code } = req.params;
  
    try {
      // Find the blob name matching the given code
      const blobs = containerClient.listBlobsFlat();
      let blobName = null;
  
      for await (const blob of blobs) {
        if (blob.name.startsWith(`${code}-text.txt`)) {
          blobName = blob.name;
          break;
        }
      }
  
      if (!blobName) {
        return res.status(404).json({ error: "Text not found" });
      }
  
      // Download the blob content
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const downloadBlockBlobResponse = await blockBlobClient.download(0);
      
      // Convert the downloaded stream to string
      const downloadedContent = await streamToString(downloadBlockBlobResponse.readableStreamBody);
  
      res.json({ code, text: downloadedContent });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to retrieve text" });
    }
  };
  
  // Helper function to convert stream to string
  const streamToString = async (readableStream) => {
    return new Promise((resolve, reject) => {
      let data = '';
      readableStream.on('data', chunk => data += chunk);
      readableStream.on('end', () => resolve(data));
      readableStream.on('error', reject);
    });
  };
  
// exports.retrieveText = async (req, res) => {
//   const { code } = req.params;

//   try {
//     // List all blobs in the container
//     const blobs = containerClient.listBlobsFlat();

//     // Search for the blob with the matching code for text
//     for await (const blob of blobs) {
//       if (blob.name.startsWith(`${code}-text.txt`)) {
//         // Generate the SAS URL for the found blob
//         const sasUrl = generateSASUrl(blob.name);
//         return res.json({ url: sasUrl });
//       }
//     }

//     res.status(404).json({ error: "Text not found" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to retrieve text" });
//   }
// };

exports.downloadFile = async (req, res) => {
  const { code } = req.params;

  try {
    // List all blobs in the container to find the blob with the matching code
    const blobs = containerClient.listBlobsFlat();
    let blobName = null;

    for await (const blob of blobs) {
      if (blob.name.startsWith(`${code}-`)) {
        blobName = blob.name;
        break;
      }
    }

    if (!blobName) {
      return res.status(404).json({ error: "File not found" });
    }

    // Generate the SAS URL for the file
    const sasUrl = generateSASUrl(blobName);

    // Redirect to the SAS URL (for the browser to handle the download directly)
    res.redirect(sasUrl); // This will initiate a download from the Azure storage directly
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to download file" });
  }
};

// exports.downloadFile = async (req, res) => {
//   const { code } = req.params;

//   try {
//     // Find the blob with the matching code
//     for await (const blob of containerClient.listBlobsFlat()) {
//       if (blob.name.startsWith(`${code}-`)) {
//         // Use the SAS URL internally to access the blob
//         const sasUrl = generateSASUrl(blob.name);
        
//         // Fetch the file from Azure Blob Storage
//         const response = await fetch(sasUrl);
        
//         if (!response.ok) {
//           return res.status(500).json({ error: "Failed to download file" });
//         }

//         // Set headers to prompt download
//         res.setHeader("Content-Disposition", `attachment; filename="${blob.name}"`);
//         res.setHeader("Content-Type", response.headers.get("Content-Type"));

//         // Pipe the file stream from Azure to the response
//         response.body.pipe(res);
//         return;
//       }
//     }

//     res.status(404).json({ error: "File not found" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Failed to download file" });
//   }
// };

// controllers/fileController.js


  
// Download file from Azure Blob Storage
// exports.downloadFile = async (req, res) => {
//   const { code } = req.params;

//   try {
//       // List all blobs in the container to find the blob with the matching code
//       const blobs = containerClient.listBlobsFlat();
//       let blobName = null;

//       for await (const blob of blobs) {
//           if (blob.name.startsWith(`${code}-`)) {
//               blobName = blob.name;
//               break;
//           }
//       }

//       if (!blobName) {
//           return res.status(404).json({ error: "File not found" });
//       }

//       // Generate the SAS URL for the file
//       const sasUrl = generateSASUrl(blobName);

//       // Ensure the SAS URL is using HTTPS
//       const secureSasUrl = sasUrl.replace('http://', 'https://');

//       // Redirect to the secure SAS URL (for the browser to handle the download directly)
//       res.redirect(secureSasUrl); // This will initiate a download from the Azure storage directly
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Failed to download file" });
//   }
// };




// Export Multer middleware for file upload
exports.upload = upload.single("file"); // Single file upload (adjust field name as necessary)
