import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import { axiosInstance } from "../libs/axios";
import { useSelector } from "react-redux";
import Picker from "emoji-picker-react"; // Import the emoji picker

const Container = styled.div``;

const NewComment = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  margin-bottom: 20px;
  border:none;
`;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const InputWrapper = styled.div`
  width: 100%;
  position: relative;
  border:none;
`;

const Input = styled.input`
  width: 100%;
  height:10%;
  padding: 5px;
  border: none;
  
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  outline: none;
`;

const EmojiButton = styled.button`
  position: absolute;
  right: 5px;
  top: 5px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
`;

const SubmitButton = styled.button`
  padding: 5px 10px;
  background-color: #3ea6ff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Comments = ({ videoId }) => {
  const currentUser = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [showPicker, setShowPicker] = useState(false);

  // Fetch comments for this video
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(`/comments/${videoId}`);
        setComments(res.data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchComments();
  }, [videoId]);

  // Handle submitting a new comment
  const handleSubmit = async () => {
    if (!newComment.trim()) return; // Avoid submitting empty comments

    try {
      const res = await axiosInstance.post("/comments", {
        videoId,
        desc: newComment,
      });
      // Prepend the new comment to the existing list
      setComments((prev) => [res.data, ...prev]);
      setNewComment("");
      setShowPicker(false);
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  // Callback for when an emoji is clicked
  const onEmojiClick = (emojiData, event) => {
    setNewComment((prev) => prev + emojiData.emoji);
  };

  return (
    <Container>
      <NewComment>
        <Avatar src={currentUser?.img || "/Assets/dev.jpg"} />
        <InputWrapper>
          <Input
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <EmojiButton onClick={() => setShowPicker((prev) => !prev)}>
            😊
          </EmojiButton>
          {showPicker && (
            <div
              style={{
                position: "absolute",
                top: "40px",
                right: "0",
                zIndex: 100,
              }}
            >
              <Picker onEmojiClick={onEmojiClick} />
            </div>
          )}
        </InputWrapper>
        <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
      </NewComment>
      {comments.map((comment) => (
        <Comment key={comment._id} comment={comment} />
      ))}
    </Container>
  );
};

export default Comments;
