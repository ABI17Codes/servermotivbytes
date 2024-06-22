import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User',
      required:true
  },
    title: {
      type: String,
      required: true,
      minLength: 4,
    },
    videolink: {
      type: String,
      required: true,
      match: /^(https:\/\/www\.youtube\.com\/watch\?v=|https:\/\/www\.youtube\.com\/embed\/|https:\/\/youtu\.be\/).+/, // Regular expression to validate YouTube watch, embed, and shortened URLs
 
    },
    description: {
      type: String,
    },

  },
  { timestamps: true }
);

const Video = mongoose.model("Video",VideoSchema);
export default Video;
