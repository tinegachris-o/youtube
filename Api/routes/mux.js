import express from "express";
const router = express.Router();
import {liveStreamController} from "../Controllers/liveStreamController.js"
router.get("/live-stream/:id", liveStreamController);

export default router
