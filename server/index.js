// filepath: server/index.js
const express = require('express');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Configure Cloudinary with your admin credentials (do not expose these to your client)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.get('/api/cloudinary-playlists', async (req, res) => {
  // Define your playlist folders (adjust as needed)
  const playlistFolders = ['Driving', 'Hanging out', 'Chill', 'Morning', 'Get Pumped Up', 'Sleepy Time'];
  let allTracks = [];
  try {
    // For each folder, list items with the appropriate prefix
    for (const folder of playlistFolders) {
      // If your resources are under "music/<folder>" in Cloudinary:
      const prefix = `music/${folder}/`;
      // List the resources for that folder (resource_type is "video" for audio files in this example)
      const result = await cloudinary.api.resources({
        resource_type: 'video',
        type: 'upload',
        prefix: prefix,
      });
      const folderTracks = result.resources.map(resource => ({
        url: resource.secure_url,
        artist: resource.context?.custom?.artist || "Unknown Artist",
        title: resource.context?.custom?.title || resource.public_id,
        playlist: folder,
      }));
      allTracks = allTracks.concat(folderTracks);
    }
    res.json({ tracks: allTracks });
  } catch (error) {
    console.error("Error fetching Cloudinary playlists: ", error);
    res.status(500).json({ error: 'Error fetching playlists' });
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));