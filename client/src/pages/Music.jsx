import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../components/VideoCard"; // Assuming you have a VideoCard component
import { axiosInstance } from "../libs/axios";

const Music = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchMusicVideos = async () => {
      try {
        const res = await axiosInstance.get("/videos/category/music"); // Replace with your API route
        setVideos(res.data);
      } catch (err) {
        console.error("Error fetching music videos", err);
      }
    };
    fetchMusicVideos();
  }, []);

  return (
    <div>
      <h2>Music Videos</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
      </div>
    </div>
  );
};

export default Music;
