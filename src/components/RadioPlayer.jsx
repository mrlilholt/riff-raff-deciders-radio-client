import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import UploadModal from './UploadModal';
import { Button } from '@mui/material';
import { PlayArrow, Pause } from '@mui/icons-material';
import bgVideo from '../assets/bg.mp4'; // Place bg.mp4 inside /src/assets
import rrLogo from '../assets/rrlogo.gif'; // Place rrlogo.gif inside /src/assets
import './RadioPlayer.css'; // <-- Add this import

Modal.setAppElement('#root'); // Required for accessibility

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [tracks, setTracks] = useState([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [nowPlaying, setNowPlaying] = useState({ artist: '', title: '', playlist: '' });

  // Array of upcoming shows - adjust times/titles as needed
  const upcomingShows = [
    { time: "8:00 AM", title: "Morning" },
    { time: "12:00 PM", title: "Chill" },
    { time: "4:00 PM", title: "Get Pumped Up" },
    { time: "6:00 PM", title: "Driving" },
    { time: "8:00 PM", title: "Hanging out" },
    { time: "10:00 PM", title: "Sleepy Time" },
  ];

  // Helper function to parse a time string (e.g. "10:00 PM") into minutes past midnight
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }
    return hours * 60 + minutes;
  };

  // Determine current time in minutes since midnight
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  // Sort the shows by time and then determine the next show
  const sortedShows = [...upcomingShows].sort((a, b) => parseTime(a.time) - parseTime(b.time));
  const nextShow = sortedShows.find(show => parseTime(show.time) > currentMinutes) || sortedShows[0];

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/cloudinary/playlists');
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setTracks(data.tracks);
      } catch (error) {
        console.error('Error fetching playlists:', error);
      }
    };

    fetchPlaylists();
  }, []);

  const playRandomTrack = () => {
    if (tracks.length > 0) {
      const randomIndex = Math.floor(Math.random() * tracks.length);
      const track = tracks[randomIndex];
      setCurrentTrackIndex(randomIndex);
      const newAudio = new Audio(track.url);
      newAudio.addEventListener('ended', handleTrackEnd);
      setAudio(newAudio);
      setNowPlaying({ artist: track.artist, title: track.title, playlist: track.playlist });
      setIsPlaying(true);
    }
  };

  const handleTrackEnd = () => {
    playRandomTrack();
  };

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }
  }, [isPlaying, audio]);

  const togglePlay = () => {
    if (!isPlaying) {
      playRandomTrack();
    } else {
      setIsPlaying(false);
    }
  };

  const openUploadModal = () => setIsUploadModalOpen(true);
  const closeUploadModal = () => setIsUploadModalOpen(false);

  return (
    <div className="radio-player-container">
      <div className="radio-player">
        <video autoPlay loop muted className="bg-video">
          <source src={bgVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <img src={rrLogo} alt="Riff Raff Deciders Radio Logo" className="logo" />
        <div className="controls">
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={isPlaying ? <Pause /> : <PlayArrow />}
            onClick={togglePlay}
          >
            {isPlaying ? 'Pause' : 'Play'}
          </Button>
          <Button
            onClick={openUploadModal}
            style={{
              margin: "0 10px",
              padding: "10px 20px",
              fontSize: "1rem",
            }}
          >
            Upload Track
          </Button>
        </div>
        <div className="now-playing">
          <h3>Now Playing</h3>
          <h2>{nowPlaying.title}</h2>
          <h3>{nowPlaying.playlist}</h3>
          <p>{nowPlaying.artist}</p>
        </div>
        <div className="upcoming-shows">
          <h3>Upcoming Show</h3>
          <p>{nextShow.time} - {nextShow.title}</p>
        </div>
        <Modal
          isOpen={isUploadModalOpen}
          onRequestClose={closeUploadModal}
          contentLabel="Upload Modal"
          className="modal"
          overlayClassName="overlay"
        >
          <UploadModal closeModal={closeUploadModal} />
        </Modal>
      </div>
    </div>
  );
};

export default RadioPlayer;