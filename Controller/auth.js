// import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config"

const register = async (req, res) => {
  const { username, phonenumber, email, password } = req.body;

  if (!username || !phonenumber || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: 'username already in use' });
    } 
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(409).json({ message: 'email already in use' });
    }
    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      phonenumber,
      email,
      password: hashpassword,
    });
    await user.save();
    // console.log(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
    
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found!");
    }
    const pass = await bcrypt.compare(req.body.password, user.password);
    if (!pass) {
      return res.status(401).json("Worng Password");
    }
    const token = jwt.sign(
      { id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token).status(200).json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

//LOGOUT

  
  const logout = async (req, res) => {
  try {
    res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User logged out successfully!")
  } catch (err) {
    res.status(500).json(err);
  }
};




const refetch = async (req, res) => {
  const token = await req.cookies.token;
   jwt.verify(token, process.env.SECRET, { expiresIn: "3d" }, async (err, data) => {
    if (err) {
      return res.status(404).json(err);
    }
    res.status(200).json(data);
    // console.log("login success");
  });
}


export { register, login, logout,refetch };
