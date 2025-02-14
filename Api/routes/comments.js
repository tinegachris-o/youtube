import express from "express";
const router = express.Router();
import {
  addComment,
  
  getComments,
  deleteComment,
} from "../Controllers/comment.js";
import { verifyToken } from "../verifyToken.js";
router.use(verifyToken);
//Create comment
router.post("/", addComment);
//deleteComment
router.delete("/:videoId", deleteComment);
//get Comment
//router.get("/comment/:videoId", getComment);
//getallcomments
router.get("/:videoId", getComments);
export default router;
