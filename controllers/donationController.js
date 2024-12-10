const Donation = require("../models/donation");


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
    });

    await newDonation.save();

    return res.status(201).json({
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

module.exports = { createDonation };
