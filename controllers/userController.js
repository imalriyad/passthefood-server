const User = require("../models/user");
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    const { name, email, phone, address, avatar, accountType, method ,password} =
      req.body;

    const isExist = await User.findOne({ email: email });

    if (isExist) {
      return res.status(200).json({
        message: "User email already exist",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      phone,
      password:hashedPassword,
      address,
      avatar,
      accountType,
      method,
    });

    await newUser.save();

    return res.status(200).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error creating User:", error);
    res
      .status(500)
      .json({ message: "Error creating User", error: error.message });
  }
};

// Get all users with paginations
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit).select('-password');;

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
};

// get current loggedin user info
const getCurrentUser = async (req, res) => {
  try {
    const userEmail = req.query?.email;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "Email query parameter is required" });
    }

    const result = await User.findOne({ email: userEmail }).select('-password');


    if (!result) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while retrieving the user" });
  }
};

module.exports = { createUser, getAllUsers, getCurrentUser };
