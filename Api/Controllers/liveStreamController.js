import axios from "axios";

export const liveStreamController = async (req, res) => {
  const liveStreamId = req.params.id;

  if (!liveStreamId) {
    return res.status(400).json({ error: "Live stream ID is required" });
  }

  try {
    const response = await axios.get(
      `https://api.mux.com/video/v1/live-streams/${liveStreamId}`,
      {
        auth: {
          username: process.env.MUX_TOKEN_ID,
          password: process.env.MUX_TOKEN_SECRET,
        },
        headers: {
          Accept: "application/json",
        },
      }
    );

    // Extract the nested live stream data
    const liveStream = response.data.data;

    if (liveStream.playback_ids && liveStream.playback_ids.length > 0) {
      const playbackId = liveStream.playback_ids[0].id;
      const playbackUrl = `https://stream.mux.com/${playbackId}.m3u8`;
      return res.status(200).json({ playbackUrl });
    } else {
      console.error("Playback ID not found in Mux response:", liveStream);
      return res.status(404).json({ error: "Playback ID not found" });
    }
  } catch (error) {
    if (error.response) {
      console.error(
        "Error fetching live stream data:",
        JSON.stringify(error.response.data, null, 2),
        "Status code:",
        error.response.status
      );
    } else {
      console.error("Error fetching live stream data:", error.message);
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
