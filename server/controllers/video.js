import User from "../models/User.js";
import Video from "../models/Video.js";
import { createError } from "../error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new Video({ userId: req.user.id, ...req.body });
  try {
    const savedVideo = await newVideo.save();
    res.status(200).json({
      status: 200,
      success: true,
      savedVideo,
    });
  } catch (error) {}
};

export const updateVideo = async (req, res, next) => {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found!"));
    if (req.user.id === video.userId) {
      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        {
          new: true,
        }
      );

      res.status(200).json({
        status: 200,
        success: true,
        updatedVideo,
      });
    } else {
      return next(createError(404, "You can update only your video!"));
    }
  } catch (error) {
    next(error);
  }
};

export const getVideo = async (req, res, next) => {};

export const deleteVideo = async (req, res, next) => {};
