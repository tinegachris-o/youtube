import { useState, useEffect } from "react";
import styled from "styled-components";
import Card from "../components/Card";
import { axiosInstance } from "../libs/axios";
import axios from "axios";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axiosInstance.get(`/videos/${type}`);
      // Debug the response
      console.log("Fetched videos:", res.data,type);

      setVideos(res.data);
    };
    fetchVideos();
  }, [type]);

  return (
    <Container>
      {videos.map((video) => (
        <Card key={video._id} video={video} />
      ))}
    </Container>
  );
};

export default Home;
