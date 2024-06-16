import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { 
      type: String, 
      required: true, 
      min: 4, 
      unique: true 
    },
    phonenumber: { 
      type: String, 
      required: true, 
      unique: true 
    },
    email: { 
      type: String, 
      required: true, 
      unique: true 
    },
    password: { 
      type: String, 
      required: true 
    },
  },
  { timestamps: true }
);

// modules.exports = mongoose.model('Post',PostSchema)
const User = mongoose.model("User", UserSchema);
export default User;
