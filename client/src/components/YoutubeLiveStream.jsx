// src/components/YouTubeLiveStream.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const YouTubeLiveStream = () => {
  const [videoId, setVideoId] = useState("");
  const [error, setError] = useState("");

  // Replace with your actual YouTube API key
  const API_KEY = "import.meta.env.VITE_API_KEY";

  // Optionally, you can specify a channel ID if you only want live streams from a specific channel:
  // const channelId = "YOUR_CHANNEL_ID";

  useEffect(() => {
    // Build parameters for the search API
    const params = {
      part: "snippet",
      eventType: "live", // Only live broadcasts
      type: "video",
      q: "live", // Change this query as needed, or use channelId parameter below
      key: API_KEY,
      maxResults: 1,
    };

    // Uncomment the following line if you want to filter by a specific channel
    // params.channelId = channelId;

    axios
      .get("https://www.googleapis.com/youtube/v3/search", { params })
      .then((res) => {
        if (res.data.items && res.data.items.length > 0) {
          const id = res.data.items[0].id.videoId;
          setVideoId(id);
        } else {
          setError("No live stream available at the moment.");
        }
      })
      .catch((err) => {
        console.error("Error fetching live stream:", err);
        setError("Error fetching live stream.");
      });
  }, [API_KEY]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>YouTube Live Stream</h1>
      {error && <p>{error}</p>}
      {videoId ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="YouTube Live Stream"
        ></iframe>
      ) : (
        !error && <p>Loading live stream...</p>
      )}
    </div>
  );
};

export default YouTubeLiveStream;
