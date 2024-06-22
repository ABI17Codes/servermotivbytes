

import mongoose from "mongoose";
import User from "../model/User.js";
import Video from "../model/postvideo.js";

const fetchProfile = async (req, res) => {
  try {
    // Check if req.params.id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }
    const user = await User.findOne({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    //  console.log(user);
    //  console.log(user.id);
    res.status(200).json(user);
  } catch (error) {
    // Handle errors
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user profile" });
  }
};

//GET USER POSTS
const fetchuserpost = async (req, res) => {
  try {
    const videos = await Video.find({ userId : req.params.id });   
    res.status(200).json(videos);
    // console.log(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching user posts" });
  }
};

// video count profile 

const videoCount =  async (req, res) => {
  try {
    const userId = req.params.id;
    console.log(userId);
    const count = await Video.countDocuments({ userId });
    res.status(200).json({count});
    // console.log(count);
  } catch (error) {
    console.error("Error fetching video count:", error);
    res.status(500).json({ message: "Error fetching video count" });
  }
}


export { fetchProfile, fetchuserpost,videoCount };
