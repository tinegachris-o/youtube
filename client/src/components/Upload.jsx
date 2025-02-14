
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { axiosInstance } from "../libs/axios.js";

// Styled Components
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000000a7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 600px;
  background-color: ${({ theme }) => theme.bgLighter};
  color: ${({ theme }) => theme.text};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: relative;
`;

const Close = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
`;

const Title = styled.h1`
  text-align: center;
`;

const Input = styled.input`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Desc = styled.textarea`
  border: 1px solid ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.text};
  border-radius: 3px;
  padding: 10px;
  background-color: transparent;
`;

const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;

const Label = styled.label`
  font-size: 14px;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #ddd;
  border-radius: 5px;
  margin-top: 5px;
  overflow: hidden;
`;

const Progress = styled.div`
  height: 100%;
  background-color: #4caf50;
  width: ${(props) => props.width}%;
  transition: width 0.3s ease-in-out;
`;

const Upload = ({ setOpen }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [inputs, setInputs] = useState({});
  const [tags, setTags] = useState([]);
  const [videoProgress, setVideoProgress] = useState(0);
  const [imageProgress, setImageProgress] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleTags = (e) => {
    setTags(e.target.value.split(","));
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const uploadFileToCloudinary = async (file, resourceType, setProgress) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", import.meta.env.VITE_UPLOAD_PRESET);

    const url = `https://api.cloudinary.com/v1_1/${
      import.meta.env.VITE_CLOUDINARY_NAME
    }/${resourceType}/upload`;

    const res = await axios.post(url, data, {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setProgress(percent);
      },
    });

    return res.data.secure_url;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    if (!videoFile || !imageFile) {
      alert("Please select both video and image files.");
      return;
    }

    try {
      const videoUrl = await uploadFileToCloudinary(
        videoFile,
        "video",
        setVideoProgress
      );
      const imgUrl = await uploadFileToCloudinary(
        imageFile,
        "image",
        setImageProgress
      );

      const videoData = {
        title: inputs.title,
        desc: inputs.desc,
        tags,
        imgUrl,
        videoUrl,
      };

      const response = await axiosInstance.post("/videos", videoData);

      console.log("Video uploaded successfully:", response.data);
      setOpen(false);
      navigate(`/video/${response.data._id}`);
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <Container>
      <Wrapper>
        <Close onClick={() => setOpen(false)}>X</Close>
        <Title>Upload a New Video</Title>

        <Label>Video File:</Label>
        <Input type="file" accept="video/*" onChange={handleVideoChange} />
        {videoFile && (
          <ProgressBar>
            <Progress width={videoProgress} />
          </ProgressBar>
        )}

        <Input
          type="text"
          placeholder="Title"
          name="title"
          onChange={handleChange}
        />

        <Desc
          placeholder="Description"
          name="desc"
          rows={8}
          onChange={handleChange}
        />

        <Input
          type="text"
          placeholder="Separate the tags with commas."
          onChange={handleTags}
        />

        <Label>Image File:</Label>
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {imageFile && (
          <ProgressBar>
            <Progress width={imageProgress} />
          </ProgressBar>
        )}

        <Button onClick={handleUpload}>Upload</Button>
      </Wrapper>
    </Container>
  );
};

export default Upload;

