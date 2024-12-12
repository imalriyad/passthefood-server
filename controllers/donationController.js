const Donation = require("../models/donation");

// creating new donation
const createDonation = async (req, res) => {
  try {
    const {
      foodName,
      foodValue,
      foodWeight,
      foodImage,
      foodCategory,
      foodPickupAddress,
      foodExpiryDate,
      foodRegion,
      donorId,
      donorName,
      donorType,
      instructions,
      donorAvatar
    } = req.body;



    const newDonation = new Donation({
      foodName,
      foodValue,
      foodWeight,
      foodImage,
      foodCategory,
      foodPickupAddress,
      foodExpiryDate,
      foodRegion,
      donorId,
      donorName,
      donorType,
      instructions,
      donorAvatar,
    });

    await newDonation.save();

    return res.status(200).json({
      message: "Donation created successfully",
    });
  } catch (error) {
    console.error("Error creating donation:", error);
    return res.status(500).json({
      message: "Error creating donation",
      error: error.message,
    });
  }
};

// Get all donation with paginations
const getAllListedFood = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const donations = await Donation.find()
      .skip((page - 1) * limit)
      .limit(limit);

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error getting donations:", error);
    res
      .status(500)
      .json({ message: "Error getting donations", error: error.message });
  }
};


// For only notifition
const getLatestFoodNotifications = async (req, res) => {
  try {
    const latestFoods = await Donation.find(
      {},
      {
        createdAt: 1, // Use createdAt instead of timestamp
        donorName: 1,
        donorAvatar: 1,
        instructions: 1,
        _id: 0, // Exclude the _id field
      }
    )
      .sort({ createdAt: -1 }) // Sort by latest createdAt
      .limit(5); // Limit to the latest 5

    res.status(200).json(latestFoods);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

module.exports = {
  createDonation,
  getAllListedFood,
  getLatestFoodNotifications,
};
