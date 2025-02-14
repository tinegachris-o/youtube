import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { axiosInstance } from "../libs/axios";

const Container = styled.div`
  display: flex;
  gap: 10px;
  margin: 30px 0px;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: ${({ theme }) => theme.text};
`;

const Name = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

const DateText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  margin-left: 5px;
`;

const Text = styled.span`
  font-size: 14px;
`;

const Comment = ({ comment }) => {
  const [channel, setChannel] = useState({});
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    // Fetch the user/channel info for the comment
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get(`/users/find/${comment.userId}`);
        setChannel(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();

    // Format the creation date/time from the comment.
    // Ensure your comment object has a 'createdAt' field.
    if (comment.createdAt) {
      const date = new Date(comment.createdAt);
      setFormattedDate(date.toLocaleString());
    }
  }, [comment.userId, comment.createdAt]);

  return (
    <Container>
      <Avatar src={channel.img || "/Assets/dev.jpg"} />
      <Details>
        <Name>
          {channel.name} <DateText>{formattedDate}</DateText>
        </Name>
        <Text>{comment.desc}</Text>
      </Details>
    </Container>
  );
};

export default Comment;
