// filepath: server/index.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/api/cloudinary-playlists', async (req, res) => {
  try {
    // Example: fetch resources with prefix 'music/'
    const result = await cloudinary.api.resources({
      resource_type: 'video',
      type: 'upload',
      prefix: 'music/',
    });
    res.json(result);
  } catch (error) {
    console.error("Error fetching Cloudinary playlists: ", error);
    res.status(500).json({ error: 'Error fetching playlists' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});