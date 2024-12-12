const express = require('express');
const {
  createDonation,
  getAllListedFood,
  getLatestFoodNotifications,
} = require("../controllers/donationController");
const router = express.Router();

router.post("/create-donation", createDonation)
router.get("/get-all-listed-food", getAllListedFood)
router.get("/get-latest-food-notifications", getLatestFoodNotifications);



module.exports = router