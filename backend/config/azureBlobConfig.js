// config/azureBlobConfig.js
const { BlobServiceClient, generateBlobSASQueryParameters, BlobSASPermissions } = require("@azure/storage-blob");
require("dotenv").config();

const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_CONTAINER_NAME);

// Function to generate SAS URL for a file
function generateSASUrl(blobName, expiryMinutes = 60) {
  const blobClient = containerClient.getBlobClient(blobName);

  const sasOptions = {
    containerName: process.env.AZURE_CONTAINER_NAME,
    blobName,
    expiresOn: new Date(new Date().valueOf() + expiryMinutes * 60 * 1000), // Expiration time in minutes
    permissions: BlobSASPermissions.parse("r"), // 'r' = read-only access
  };

  const sasToken = generateBlobSASQueryParameters(sasOptions, blobServiceClient.credential).toString();
  return `${blobClient.url}?${sasToken}`;
}

module.exports = { containerClient, generateSASUrl };
