import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    // List of playlist folder names for this project
    const playlistFolders = ["Driving", "Hanging out", "Chill", "Morning", "Get Pumped Up", "Sleepy Time"];

    // Utility to format the tracks
    const formatTracks = (resources, playlistName) =>
      resources.map((file, index) => ({
        id: index + 1,
        title: file.public_id.split("/").pop().replace(/_/g, " "),
        artist: file.context?.custom?.artist || "Unknown Artist",
        url: file.secure_url,
        playlist: playlistName,
      }));

    // Object to accumulate the playlists
    const playlistsData = {};

    // Loop over each folder and fetch Cloudinary resources with the proper prefix.
    for (const folder of playlistFolders) {
      // Assuming your assets are stored under "music/<Folder>/"
      const prefix = `music/${folder}/`;
      const response = await cloudinary.api.resources({
        resource_type: "video",
        type: "upload",
        prefix,
        max_results: 100,
      });
      playlistsData[folder] = formatTracks(response.resources, folder);
    }

    console.log("Playlists data fetched successfully:", playlistsData); // Add this log
    res.status(200).json(playlistsData);
  } catch (error) {
    console.error("Error fetching playlists:", error);
    res.status(500).json({ error: "Failed to fetch playlists" });
  }
}