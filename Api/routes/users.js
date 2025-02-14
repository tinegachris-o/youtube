import express from "express";
const router = express.Router();
import {
  updateUser,
  subscribe,
  unSubscribe,
  getUser,
  deleteUser,
  likeVideo,
  dislikeVideo,
} from "../Controllers/user.js";
import { verifyToken } from "../verifyToken.js";
//update user
router.put("/:id", verifyToken, updateUser);

//delete user
router.delete("/:id", verifyToken, deleteUser);
//get User
router.get("/find/:id", getUser);
//subscribe to User
router.put("/sub/:id", verifyToken, subscribe);
//unSubscribe
router.put("/unsub/:id", verifyToken, unSubscribe);

//like Video
router.put("/like/:videoId", verifyToken, likeVideo);

//dislike  Video
router.put("/dislike/:videoId", verifyToken, dislikeVideo);

export default router;
