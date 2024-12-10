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
      userId
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
      userId
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
const getAllDonations = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const donations = await Donation.find()
                                    .skip((page - 1) * limit) 
                                    .limit(limit); 

    res.status(200).json(donations);
  } catch (error) {
    console.error("Error getting donations:", error);
    res.status(500).json({ message: "Error getting donations", error: error.message });
  }
};



module.exports = { createDonation, getAllDonations };
