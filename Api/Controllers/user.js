import { createError } from "../error.js";
import User from "../Models/User.js";
import Video from "../Models/Video.js";
export const updateUser = async (req, res,next) => {
    if (req.params.id === req.user.id) {
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.json(updatedUser);
      } catch (error) {
        next(error);
      }
    } else {
      return next(createError(403, "You can update only your account!"));
    }
};

export const deleteUser = async (req, res,next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
export const getUser = async (req, res,next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  try {
    
    // Add the user to subscribedUsers and increment the subscriber count
    await User.findByIdAndUpdate(
      req.user.id, // Current user performing the subscription
      {
        $push: { subscribedUsers: req.params.id }, // Add the target user to the list
      }
    );

    ///// Increment the target user's subscriber count
    await User.findByIdAndUpdate(
      req.params.id, // Target user being subscribed to
      {
        $inc: { subscribers: 1 }, // Increment subscribers by 1
      }
    );

    res.status(200).json({ message: "Subscription was successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const unSubscribe = async (req, res,next) => {
  try {
    // Add the user to subscribedUsers and increment the subscriber count
    await User.findByIdAndUpdate(
      req.user.id, // Current user performing the subscription
      {
        $pull: { subscribedUsers: req.params.id }, // Add the target user to the list
      }
    );

    // Increment the target user's subscriber count
    await User.findByIdAndUpdate(
      req.params.id, // Target user being subscribed to
      {
        $inc: { subscribers: -1 }, // Increment subscribers by 1
      }
    );

    res.status(200).json({ message: "unSubscription was successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const likeVideo = async (req, res,next) => {
  const id=req.user.id;
  const videoId=req.params.videoId;
  try {
    await Video.findByIdAndUpdate(videoId,{
      $addToSet:{likes:id},
      $pull:{dislikes:id},
    })
    res.status(200 ).json("The viero has been liked")
  } catch (error) {
    next(error)
  }

};
export const dislikeVideo = async (req, res,next) => {
const id=req.params.id;
const videoId = req.params.videoId;
try {
  await Video.findByIdAndUpdate(videoId, {
    $addToSet: { dislikes: id },
    $pull: { likes: id },
  });
  res.status(200).json("The video has been disliked.");
} catch (error) {
  next(error);
}
}