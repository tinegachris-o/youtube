import mongoose from "mongoose";
import User from "../Models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signUp = async (req, res, next) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const user = new User({ ...req.body, password: hash });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
    next(error);
  }
};
export const signIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const { password, ...others } = user._doc;
    const token = jwt.sign({ id: user._id }, process.env.JWT);
    res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 3600000 * 24 * 7),
      })
      .status(200)
      .json(others);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const googleAuth = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json(user._doc);
    } else {
      const newUser = new User({
        ...req.body,
        fromGoogle: true,
      });
      const savedUser = await newUser.save();
      const token = jwt.sign({ id: savedUser._id }, process.env.JWT);
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(201)
        .json(savedUser._doc);
    }
  } catch (error) {
    next(error);
  }
};
export const logout = async (req, res) => {
  res
    .clearCookie("access_token", {
      httpOnly: true,
    })
    .status(200)
    .json({ messsage: "looged out sucessfully" });
};
