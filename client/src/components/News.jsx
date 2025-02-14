// src/components/News.js
import React, { useState, useEffect } from "react";
import axios from "axios";

// If using Vite, ensure your API key is prefixed with VITE_ in your .env file.
const API_KEY = import.meta.env.VITE_API_KEY;

const News = () => {
  // State for storing video results, selected video for playback, and search query.
  const [videos, setVideos] = useState([]);
  const [selectedVideoId, setSelectedVideoId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("latest news");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch videos from the YouTube API using the provided query.
  const fetchVideos = async (q) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            part: "snippet",
            maxResults: 12,
            q: q,
            type: "video",
            key: API_KEY,
          },
        }
      );
      setVideos(response.data.items);
    } catch (err) {
      console.error("Error fetching YouTube videos:", err);
      setError("Failed to fetch news videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch default news videos on component mount.
  useEffect(() => {
    fetchVideos(searchQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Handle search form submission.
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchVideos(searchQuery);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>News Videos</h1>

      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search News Videos"
          style={{
            padding: "8px",
            width: "300px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "8px 16px",
            marginLeft: "8px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#3ea6ff",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </form>

      {/* Loading & Error States */}
      {loading && <p>Loading videos...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Video Player */}
      {selectedVideoId && (
        <div style={{ marginBottom: "20px" }}>
          <iframe
            width="100%"
            height="480"
            src={`https://www.youtube.com/embed/${selectedVideoId}`}
            title="YouTube video player"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      )}

      {/* Video List */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "15px",
          justifyContent: "center",
        }}
      >
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            style={{ cursor: "pointer", maxWidth: "320px" }}
            onClick={() => setSelectedVideoId(video.id.videoId)}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
              style={{ width: "100%", borderRadius: "8px" }}
            />
            <p>{video.snippet.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
