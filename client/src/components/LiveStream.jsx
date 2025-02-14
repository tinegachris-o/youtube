// src/components/LiveStream.js
import React, { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { axiosInstance } from "../libs/axios";
const LiveStream = () => {
  const videoRef = useRef(null);
  const [streamUrl, setStreamUrl] = useState(null);

  const liveStreamId = import.meta.env.VITE_MUX_LIVE_STREAM_ID;

  console.log("liveStreamId:", liveStreamId);
  useEffect(() => {
    if (!liveStreamId) {
      console.error("No Live Stream ID found!");
      return;
    }

    fetch(`http://localhost:8080/api/mux/live-stream/${liveStreamId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.playbackUrl) {
          setStreamUrl(data.playbackUrl);
        } else {
          console.error("Playback URL not found:", data);
        }
      })
      .catch((err) => console.error("Error fetching playback URL:", err));
  }, [liveStreamId]);

  useEffect(() => {
    if (!streamUrl) return;
    const video = videoRef.current;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.error("Play error:", err));
      });
      return () => {
        hls.destroy();
      };
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // For Safari which supports HLS natively
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video.play().catch((err) => console.error("Play error:", err));
      });
    } else {
      console.error("HLS is not supported in this browser");
    }
  }, [streamUrl]);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Live Stream</h1>
      <video
        ref={videoRef}
        controls
        style={{ width: "100%", maxWidth: "800px" }}
      />
    </div>
  );
};

export default LiveStream;
