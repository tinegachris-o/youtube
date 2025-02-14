import Video from "../Models/Video.js";
import { createError } from "../error.js";
import User from "../Models/User.js";
//addVideo,
export const addVideo = async (req, res, next) => {
  const { title, desc, tags, imageUrl, videoUrl } = req.body;

  const newVideo = new Video({
    userId: req.user.id,
    ...req.body,
  });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json(savedVideo);
   // console.log("Received video data:", req.body);
    //nnnnnnconsole.log("Authenticated user:", req.user);

  } catch (error) {
    next(error);
  }
};
//update Video
export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found"));
    }
    if (video.userId === req.user.id) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedVideo);
    } else {
      return next(createError(403, "Unauthorized to update this video"));
    }
  } catch (error) {
    next(error);
  }
};

//delete the video
export const deleteVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return next(createError(404, "Video not found"));
    }
    if (video.userId == req.user.id) {
      await Video.findByIdAndDelete(req.params.id);
      res.status(200).json({ message: "Video deleted successfully" });
    } else {
      return next(createError(403, "Unauthorized to delete this video"));
    }
  } catch (error) {
    next(error);
  }
};
//addView,
export const addView = async (req, res, next) => {
  try {
    const video = await Video.findByIdAndUpdate(
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
    const videos = await Video.find({ tags: { $in: tags } }).limit(20);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
//getVideo,
export const getVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }
    res.json(video);
  } catch (error) {
    next(error);
  }
};
//random,
export const random = async (req, res, next) => {
  try {
    const video = await Video.aggregate([{ $sample: { size: 40 } }]);
    res.json(video);
  } catch (error) {
    next(error);
  }
};
////search,

export const search = async (req, res, next) => {
  const query = req.query.q;
  try {
    const videos = await Video.find({
      title: { $regex: query, $options: "i" },
    }).limit(40);
    res.status(200).json(videos);
  } catch (err) {
    next(err);
  }
};
//sub,
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
    const videos = await Video.find().sort({ views: -1 });

    res.json(videos);
  } catch (error) {
    next(error);
  }
};
