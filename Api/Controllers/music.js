import Music from "../Models/Music.js";
import {createError} from "../error.js"
import User from "../Models/User.js"
// Create a new music video
export const createMusic = async (req, res,next) => {
  try {
    const newMusic = new Music({userId:req.user.id,...req.body});
   const savedMusic= await newMusic.save();
    res.status(201).json(savedMusic);
  } catch (error) {
    next(error)
  }
};

// Get all music videos
export const getAllMusic = async (req, res) => {
  try {
    const musicVideos = await Music.find().sort({ createdAt: -1 });
    res.status(200).json(musicVideos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch music videos" });
  }
};

// Get a single music video by ID
export const getMusicById = async (req, res) => {
  try {
    const musicVideo = await Music.findById(req.params.id);
    if (!musicVideo)
      return res.status(404).json({ message: "Music video not found" });
    res.status(200).json(musicVideo);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch music video" });
  }
};

// Update a music video
export const updateMusic = async (req, res) => {
  try {
    const updatedMusic = await Music.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedMusic)
      return res.status(404).json({ message: "Music video not found" });
    res.status(200).json(updatedMusic);
  } catch (error) {
    res.status(500).json({ error: "Failed to update music video" });
  }
};

// Delete a music video
export const deleteMusic = async (req, res) => {
  try {
    const deletedMusic = await Music.findByIdAndDelete(req.params.id);
    if (!deletedMusic)
      return res.status(404).json({ message: "Music video not found" });
    res.status(200).json({ message: "Music video deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete music video" });
  }
};
////search,Music

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const music = await Music.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(music);
  } catch (err) {
    next(err);
  }
};
export const sub = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    const subscribedChannels = user.subscribedUsers;

    const list = await Promise.all(
      subscribedChannels.map(async (channelId) => {
        return await Video.find({ userId: channelId });
      })
    );

    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (err) {
    next(err);
  }
};
//trend,
export const trend = async (req, res, next) => {
  try {
    const videos = await Music.find().sort({ views: -1 });

    res.json(videos);
  } catch (error) {
    next(error);
  }
};
//random music
export const random = async (req, res, next) => {
  try {
    const video = await Music.aggregate([{ $sample: { size: 40 } }]);
    res.json(video);
  } catch (error) {
    next(error);
  }
};
//addView,
export const addView = async (req, res, next) => {
  try {
    const video = await Music.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.status(200).json("The view has been increased ");
  } catch (error) {
    next(error);
  }
};

//getByTag,
export const getByTag = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  try {
    const videos = await Music.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};