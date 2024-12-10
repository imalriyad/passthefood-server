const User = require("../models/user");

const createUser = async (req, res) => {
  try {
    const { name, email, phone, location, avatar, accountType, method } =
      req.body;

    const isExist = await User.findOne({ email: email });

    if (isExist) {
      return res.status(200).json({
        message: "User email already exist",
      });
    }

    const newUser = new User({
      name,
      email,
      phone,
      location,
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

// Get all donation with paginations
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(users);
  } catch (error) {
    console.error("Error getting users:", error);
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
};

module.exports = { createUser, getAllUsers };
