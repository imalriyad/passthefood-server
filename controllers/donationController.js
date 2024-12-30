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



// Update a donation to mark it as distributed
const distribute = async (req, res) => {
  const donationId = req.params.id;

  try {
    const updatedDonation = await Donation.findByIdAndUpdate(
      donationId,
      { distributed: true }, 
      { new: true } 
    );

    if (!updatedDonation) {
      return res.status(404).json({ status: 404, message: 'Donation not found' });
    }

    res.status(200).json({ status: 200, message: 'Donation marked as distributed'});
  } catch (error) {
    res.status(500).json({ status: 500, message: 'Internal server error', error });
  }
}



// For only notifition
const getLatestFoodNotifications = async (req, res) => {
  try {
    const latestFoods = await Donation.find(
      {},
      {
        createdAt: 1, 
        donorName: 1,
        donorAvatar: 1,
        instructions: 1,
        _id: 0, 
      }
    )
      .sort({ createdAt: -1 }) 
      .limit(5); 

    res.status(200).json(latestFoods);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notifications." });
  }
};

module.exports = {
  createDonation,
  getAllListedFood,
  getLatestFoodNotifications,
  distribute
};
