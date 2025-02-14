import express from "express";
const router = express.Router();

import {
  addVideo,
  updateVideo,
  addView,
  getByTag,
  getVideo,
  random,
  search,
  sub,
  trend,
  deleteVideo,
} from "../Controllers/video.js";
import { verifyToken } from "../verifyToken.js";

//create a video
router.post("/", verifyToken, addVideo);
router.put("/:id", verifyToken, updateVideo);
router.delete("/:id", verifyToken, deleteVideo);
router.get("/find/:id", getVideo);
router.put("/view/:id", addView);
router.get("/trend", trend);
router.get("/random", random);
router.get("/sub", verifyToken, sub);
router.get("/tags", getByTag);
router.get("/search", search);

export default router;
