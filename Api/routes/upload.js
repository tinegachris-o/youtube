import express from "express";
import multer from "multer";
import cloudinary from "../config/cloudinary.js";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config({ path: "/home/tinega/Documents/VidX/Api/.env" });

const router = express.Router();
/** 
// Multer Setup with File Size Limit
const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 100 * 1024 * 1024 }, // 100MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "video/mp4",
      "video/mkv",
      "video/webm",
      "video/avi",
      "video/mov",
      "video/flv",
      "image/png",
      "image/jpeg",
      "image/jpg",
      "image/gif",
      "image/tiff",
      "image/bmp",
      "image/webp",
      "image/svg+xml",
    ];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only MP4, MKV, WEBM, AVI, MOV, FLV, PNG, JPEG, JPG, GIF, TIFF, BMP, WEBP, and SVG are allowed."
        )
      );
    }
  },
});

// Upload Route with Cloudinary Upload
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("Uploading file:", req.file.originalname);
    console.log("File size:", req.file.size);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "auto", // Auto-detect (image or video)
      folder: "uploads",
    });

    console.log("Upload successful:", result.secure_url);

    // Delete Temporary File After Upload
    fs.unlink(req.file.path, (err) => {
      if (err) console.error("Error deleting temp file:", err);
    });

    res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    let errorMessage = "Upload failed";
    if (error.http_code === 499) {
      errorMessage = "Request Timeout. Try again with a smaller file.";
    } else if (error.http_code === 400) {
      errorMessage = "Bad Request: Check file format or size.";
    } else if (error.message.includes("File too large")) {
      errorMessage = "File size exceeds the allowed limit (100MB).";
    }

    res.status(500).json({ error: errorMessage });
  }
});*/

export default router;
