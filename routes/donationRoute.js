const express = require('express');
const {
  createDonation,
  getAllListedFood,
  getLatestFoodNotifications,
  distribute
} = require("../controllers/donationController");
const router = express.Router();

router.post("/create-donation", createDonation)
router.get("/get-all-listed-food", getAllListedFood)
router.get("/get-latest-food-notifications", getLatestFoodNotifications);
router.patch("/donations/:id/distribute", distribute);



module.exports = router