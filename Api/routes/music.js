import express from "express";
import {
  createMusic,
  getAllMusic,
  getMusicById,
  updateMusic,
  deleteMusic,
  search,
  random,
  trend,
  sub,
  getByTag,
  addView
} from "../Controllers/music.js";
import { verifyToken } from "../verifyToken.js"; // Authentication middleware

const router = express.Router();

// Create a new music video
router.post("/", verifyToken, createMusic);

// Get all music videos
router.get("/", getAllMusic);

// Get a single music video by ID
router.get("/find/:id", getMusicById);

// Update a music video
router.put("/:id", verifyToken, updateMusic);

// Delete a music video
router.delete("/:id", verifyToken, deleteMusic);
//search music
router.get("/search",search)
//random
router.get("/random",random)
//trend
router.get("/trend",trend)
//sub
router.put("/sub",sub)
//addview
router.put("/view",addView)
////get by tag
router.get("/tags",getByTag)
export default router;
 