const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  foodValue: {
    type: Number,
    required: true,
  },
  foodWeight: {
    type: Number,
    required: true,
  },
  foodImage: {
    type: String,
    required: true,
  },
  foodCategory: {
    type: String,
    required: true,
  },
  foodPickupAddress: {
    type: String,
    required: true,
  },
  foodExpiryDate: {
    type: Date,
    required: true,
  },
  foodRegion: {
    type: String,
    required: true,
  },
  donorId: {
    type: String,
    required: true,
  },
  donorName: {
    type: String,
    required: true,
  },
  donorType: {
    type: String,
    required: true,
  },
  instructions: {
    type: String,
    required: true,
  },
  
});

const Donation = mongoose.model("Donation", donationSchema);

module.exports = Donation;
